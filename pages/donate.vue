<template>
  <div class="wrapper">
    <button @click="initMaze" class="control">生成迷宮</button>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const canvas = ref(null);
// 增加格數提高複雜度
const cols = 20,
  rows = 20;
let maze = [];
let cellSize = 0;
const player = ref({ x: 0, y: 0 });
const end = ref({ x: cols - 1, y: rows - 1 });
const path = ref([]);
let currentStep = 0;
let scrollAccumulator = 0;
const scrollThreshold = 100; // 滾動累積超過此值才移動一步，可調整速度，數值越大移動越慢

// 深度優先隨機迷宮生成
function generateMaze(cols, rows) {
  const grid = [];
  for (let y = 0; y < rows; y++) {
    grid[y] = [];
    for (let x = 0; x < cols; x++) {
      grid[y][x] = { n: true, s: true, e: true, w: true, visited: false };
    }
  }
  const stack = [];
  let cx = 0,
    cy = 0;
  grid[cy][cx].visited = true;
  const directions = [
    { dx: 0, dy: -1, wall: "n", back: "s" },
    { dx: 1, dy: 0, wall: "e", back: "w" },
    { dx: 0, dy: 1, wall: "s", back: "n" },
    { dx: -1, dy: 0, wall: "w", back: "e" },
  ];
  while (true) {
    const neighbors = [];
    for (const d of directions) {
      const nx = cx + d.dx,
        ny = cy + d.dy;
      if (
        nx >= 0 &&
        nx < cols &&
        ny >= 0 &&
        ny < rows &&
        !grid[ny][nx].visited
      ) {
        neighbors.push({ x: nx, y: ny, ...d });
      }
    }
    if (neighbors.length) {
      const n = neighbors[Math.floor(Math.random() * neighbors.length)];
      grid[cy][cx][n.wall] = false;
      grid[n.y][n.x][n.back] = false;
      stack.push({ x: cx, y: cy });
      cx = n.x;
      cy = n.y;
      grid[cy][cx].visited = true;
    } else if (stack.length) {
      const cell = stack.pop();
      cx = cell.x;
      cy = cell.y;
    } else break;
  }
  return grid;
}

// 廣度優先計算最短路徑
function computePath() {
  const dirs = [
    { dx: 0, dy: -1, wall: "n" },
    { dx: 1, dy: 0, wall: "e" },
    { dx: 0, dy: 1, wall: "s" },
    { dx: -1, dy: 0, wall: "w" },
  ];
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const prev = Array.from({ length: rows }, () => Array(cols).fill(null));
  const queue = [{ x: player.value.x, y: player.value.y }];
  visited[player.value.y][player.value.x] = true;

  while (queue.length) {
    const { x, y } = queue.shift();
    if (x === end.value.x && y === end.value.y) break;
    for (const d of dirs) {
      const nx = x + d.dx,
        ny = y + d.dy;
      if (
        nx >= 0 &&
        nx < cols &&
        ny >= 0 &&
        ny < rows &&
        !visited[ny][nx] &&
        !maze[y][x][d.wall]
      ) {
        visited[ny][nx] = true;
        prev[ny][nx] = { x, y };
        queue.push({ x: nx, y: ny });
      }
    }
  }
  // 回溯路徑
  const rev = [];
  let cx = end.value.x,
    cy = end.value.y;
  while (!(cx === player.value.x && cy === player.value.y)) {
    rev.push({ x: cx, y: cy });
    const p = prev[cy][cx];
    if (!p) break;
    cx = p.x;
    cy = p.y;
  }
  rev.push({ x: player.value.x, y: player.value.y });
  path.value = rev.reverse();
}

// 滾動控制移動，累積 deltaY 再判斷
function onWheel(e) {
  e.preventDefault();
  if (!path.value.length) return;
  scrollAccumulator += e.deltaY;
  if (Math.abs(scrollAccumulator) < scrollThreshold) return;

  // 根據累積方向移動一步
  if (scrollAccumulator > 0 && currentStep < path.value.length - 1) {
    currentStep++;
  } else if (scrollAccumulator < 0 && currentStep > 0) {
    currentStep--;
  }
  scrollAccumulator = 0; // 重置累積

  player.value = { ...path.value[currentStep] };
  render();
  if (currentStep === path.value.length - 1) {
    setTimeout(() => alert("恭喜你到達終點！"), 10);
  }
}

// 初始化
function initMaze() {
  // 使用視窗 80% 作為畫布尺寸，保持正方形
  const size = Math.min(window.innerWidth * 0.8, window.innerHeight * 0.8);
  canvas.value.width = size;
  canvas.value.height = size;
  cellSize = size / cols;

  maze = generateMaze(cols, rows);
  player.value = { x: 0, y: 0 };
  end.value = { x: cols - 1, y: rows - 1 };
  currentStep = 0;
  scrollAccumulator = 0;
  computePath();
  render();
}

// 繪製
function render() {
  const ctx = canvas.value.getContext("2d");
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  // 牆壁
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cell = maze[y][x];
      const px = x * cellSize,
        py = y * cellSize;
      if (cell.n) {
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + cellSize, py);
        ctx.stroke();
      }
      if (cell.s) {
        ctx.beginPath();
        ctx.moveTo(px, py + cellSize);
        ctx.lineTo(px + cellSize, py + cellSize);
        ctx.stroke();
      }
      if (cell.e) {
        ctx.beginPath();
        ctx.moveTo(px + cellSize, py);
        ctx.lineTo(px + cellSize, py + cellSize);
        ctx.stroke();
      }
      if (cell.w) {
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px, py + cellSize);
        ctx.stroke();
      }
    }
  }
  // 路徑
  if (path.value.length) {
    ctx.fillStyle = "rgba(0,0,255,0.3)";
    path.value.forEach((p) =>
      ctx.fillRect(p.x * cellSize, p.y * cellSize, cellSize, cellSize)
    );
  }
  // 終點
  const endOx = cellSize * 0.2,
    endSize = cellSize * 0.6;
  ctx.fillStyle = "green";
  ctx.fillRect(
    end.value.x * cellSize + endOx,
    end.value.y * cellSize + endOx,
    endSize,
    endSize
  );
  // 玩家
  const ox = cellSize * 0.2,
    sizeRect = cellSize * 0.6;
  ctx.fillStyle = "red";
  ctx.fillRect(
    player.value.x * cellSize + ox,
    player.value.y * cellSize + ox,
    sizeRect,
    sizeRect
  );
}

onMounted(() => {
  initMaze();
  window.addEventListener("wheel", onWheel, { passive: false });
});

onBeforeUnmount(() => {
  window.removeEventListener("wheel", onWheel);
});
</script>

<style scoped>
.wrapper {
  height: 200vh;
}
canvas {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #333;
}
.control {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  padding: 8px 16px;
  background: #38a169;
  color: #fff;
  border: none;
  border-radius: 4px;
}
html,
body {
  margin: 0;
}
</style>
