<template>
  <div
    ref="carouselContainer"
    :class="cn('fixed inset-0 w-screen h-screen z-20', '')"
    @mousedown="onDragStart"
    @touchstart="onDragStart"
  ></div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import * as THREE from "three";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/addons/renderers/CSS3DRenderer.js";
import { animate, type AnimationPlaybackControls } from "motion-v";
import { cn } from "@/lib/utils";

// 圖片列表
const items = [
  "https://picsum.photos/450/600?random=1",
  "https://picsum.photos/450/600?random=2",
  "https://picsum.photos/450/600?random=3",
  "https://picsum.photos/450/600?random=4",
  "https://picsum.photos/450/600?random=5",
  "https://picsum.photos/450/600?random=1",
  "https://picsum.photos/450/600?random=2",
  "https://picsum.photos/450/600?random=3",
  "https://picsum.photos/450/600?random=4",
];

// 卡片大小與拖曳靈敏度
const width = 600;
const height = 450;
const sensitivity = 0.006;

const carouselContainer = ref<HTMLDivElement>();
const isDragging = ref(false);
const startX = ref(0);
const currentX = ref(0);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 1, 1, 5000);
let renderer: CSS3DRenderer;
const radius = ref(1000);
let carousel: THREE.Object3D;
let continuousAnimation = ref<AnimationPlaybackControls | null>(null);

onMounted(() => {
  if (!carouselContainer.value) return;

  // 1. 初始化 CSS3DRenderer 並 append 到容器
  renderer = new CSS3DRenderer();
  Object.assign(renderer.domElement.style, {
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: "20",
  });
  const w = carouselContainer.value.clientWidth;
  const h = carouselContainer.value.clientHeight;
  renderer.setSize(w, h);
  carouselContainer.value.appendChild(renderer.domElement);

  // 2. 設定相機
  camera.position.set(0, 0, 550);

  // 3. 建立 carousel 物件並加入場景
  carousel = new THREE.Object3D();
  scene.add(carousel);

  // 4. 加入卡片並綁定最簡單的 hover 事件
  items.forEach((img, idx) => {
    const el = document.createElement("div");
    Object.assign(el.style, {
      width: `${width}px`,
      height: `${height}px`,
      backgroundImage: `url(${img})`,
      backgroundSize: "cover",
      transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s",
    });

    // 滑鼠進入放大 & 慢速轉
    el.addEventListener("mouseenter", () => {
      if (isDragging.value) return;
      el.style.transform = "scale(1.15)";
      el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.38)";
      startContinuousRotation(120);
    });

    // 滑鼠離開還原
    el.addEventListener("mouseleave", () => {
      if (isDragging.value) return;
      el.style.transform = "scale(1)";
      el.style.boxShadow = "none";
      startContinuousRotation(40);
    });

    const obj = new CSS3DObject(el);
    const angle = (idx / items.length) * Math.PI * 2;
    obj.position.setFromSphericalCoords(radius.value, Math.PI / 2, angle);
    obj.lookAt(carousel.position);
    carousel.add(obj);
  });

  // 5. 初始自動旋轉 & 監聽視窗事件
  carousel.rotation.x = 0;
  startContinuousRotation();
  window.addEventListener("resize", onWindowResize);

  // 拖曳相關全域事件
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onDragEnd);
  window.addEventListener("touchmove", onTouchMove, { passive: false });
  window.addEventListener("touchend", onDragEnd);
});

onBeforeUnmount(() => {
  // 清除所有事件與動畫
  window.removeEventListener("resize", onWindowResize);
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onDragEnd);
  window.removeEventListener("touchmove", onTouchMove);
  window.removeEventListener("touchend", onDragEnd);
  continuousAnimation.value?.stop();
  carouselContainer.value?.removeChild(renderer.domElement);
});

// 啟動或更新自動旋轉動畫
function startContinuousRotation(duration = 40) {
  continuousAnimation.value?.stop();
  const from = carousel.rotation.y;
  const to = from + Math.PI * 2;
  continuousAnimation.value = animate(from, to, {
    duration,
    ease: "linear",
    repeat: Infinity,
    onUpdate: (y) => {
      carousel.rotation.y = y;
      renderer.render(scene, camera);
    },
  });
}

// 拖曳開始
function onDragStart(e: MouseEvent | TouchEvent) {
  isDragging.value = true;
  startX.value = "touches" in e ? e.touches[0].clientX : e.clientX;
  currentX.value = startX.value;
  continuousAnimation.value?.stop();
}

// 滑鼠移動（拖曳中）
function onMouseMove(e: MouseEvent) {
  if (!isDragging.value) return;
  handleDrag(e.clientX);
}

// 觸控移動（拖曳中）
function onTouchMove(e: TouchEvent) {
  if (!isDragging.value) return;
  e.preventDefault();
  handleDrag(e.touches[0].clientX);
}

// 拖曳結束
function onDragEnd() {
  if (!isDragging.value) return;
  isDragging.value = false;
  startContinuousRotation();
}

// 根據滑動差值調整旋轉
function handleDrag(x: number) {
  const dx = x - currentX.value;
  currentX.value = x;
  carousel.rotation.y += -dx * sensitivity;
  renderer.render(scene, camera);
}

// 視窗縮放時重設畫面尺寸與相機
function onWindowResize() {
  if (!carouselContainer.value) return;
  const w = carouselContainer.value.clientWidth;
  const h = carouselContainer.value.clientHeight;
  radius.value = w / 3;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
</script>
