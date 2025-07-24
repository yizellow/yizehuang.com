<!-- BoxTicker.vue -->
<template>
  <main
    class="w-screen h-screen fixed top-0 left-0 flex items-center justify-center"
  >
    <section
      ref="containerRef"
      class="w-11/12 h-11/12 relative overflow-hidden"
    ></section>
  </main>
</template>

<script setup>
// ──────────────────────────────────────
// Imports
// ──────────────────────────────────────
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { gsap } from "gsap";

// ──────────────────────────────────────
// Refs & Globals
// ──────────────────────────────────────
const containerRef = ref(null);
let renderer, cssRenderer, scene, camera, controls, animationId;

const boxSize = { x: 180, y: 100, z: 200 };

// ──────────────────────────────────────
// Resize Helper
// ──────────────────────────────────────
function onResize() {
  if (!containerRef.value) return;
  const w = containerRef.value.clientWidth;
  const h = containerRef.value.clientHeight;
  renderer.setSize(w, h);
  cssRenderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

// ──────────────────────────────────────
// Lifecycle—mount
// ──────────────────────────────────────
onMounted(() => {
  const container = containerRef.value;
  const W = container.clientWidth;
  const H = container.clientHeight;

  /* 1️⃣ WebGLRenderer：畫 Box + 邊框（先 append） */
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(W, H);
  renderer.domElement.style.position = "absolute";
  container.appendChild(renderer.domElement);

  /* 2️⃣ CSS3DRenderer：畫 DOM（後 append，確保在最上層） */
  cssRenderer = new CSS3DRenderer();
  cssRenderer.setSize(W, H);
  cssRenderer.domElement.style.position = "absolute";
  container.appendChild(cssRenderer.domElement);

  /* 3️⃣ Scene / Camera / Controls */
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 1000);
  camera.position.set(0, 0, 40); // 位於盒子內
  controls = new OrbitControls(camera, cssRenderer.domElement);
  controls.enableDamping = true;

  /* 4️⃣ 半透明立方體（用 BackSide 才看得到內壁） */
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(boxSize.x, boxSize.y, boxSize.z),
    new Array(6).fill(
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        opacity: 0.1,
        transparent: true,
        side: THREE.BackSide,
      })
    )
  );
  scene.add(cube);

  /*   邊框線 */
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(cube.geometry),
    new THREE.LineBasicMaterial({
      color: 0x00ff00,
      depthTest: false,
      depthWrite: false,
    })
  );
  edges.scale.set(1.001, 1.001, 1.001);
  scene.add(edges);

  /* 5️⃣ 範本 div */
  const templateDiv = document.createElement("div");
  templateDiv.className = "slide";
  templateDiv.style.width = `${boxSize.x}px`;
  templateDiv.style.height = `${boxSize.y}px`;
  templateDiv.innerHTML = `
    <h2>測試</h2>
    <p>
      As the U.S. population ages, many families are facing the same challenges...
      As the U.S. population ages, many families are facing the same challenges...
      As the U.S. population ages, many families are facing the same challenges...
      As the U.S. population ages, many families are facing the same challenges...
      As the U.S. population ages, many families are facing the same challenges...
    </p>
  `;

  /* 6️⃣ 貼在「背面內側」（-Z） */
  const insideBack = new CSS3DObject(templateDiv.cloneNode(true));
  insideBack.position.set(0, 0, -boxSize.z / 2);
  scene.add(insideBack);

  /* 🟢 GSAP—方案一：整塊文字上下飄 */
  gsap.to(insideBack.position, {
    y: boxSize.y / 2 - 10, // 上界（留 10px 安全距）
    duration: 5,
    ease: "power1.inOut",
    yoyo: true,
    repeat: -1,
  });

  /* 🟢 GSAP—方案二：段落內容當跑馬燈（可選） */
  const pEl = insideBack.element.querySelector("p");
  gsap.fromTo(
    pEl,
    { yPercent: 0 },
    {
      yPercent: -100,
      duration: 10,
      ease: "none",
      repeat: -1,
    }
  );

  /* 7️⃣ render loop */
  const animate = () => {
    animationId = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    cssRenderer.render(scene, camera);
  };
  animate();

  /* resize 監聽 */
  window.addEventListener("resize", onResize);
});

// ──────────────────────────────────────
// Lifecycle—unmount
// ──────────────────────────────────────
onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", onResize);
  controls.dispose();
  renderer.dispose();
  cssRenderer.dispose();
});
</script>

<style scoped>
.slide {
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  box-sizing: border-box;
  padding: 8px;
  text-align: center;
}
</style>
