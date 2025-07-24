<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const containerRef = ref(null);
let renderer, scene, camera, controls, animationId;

// resize handler
const onResize = () => {
  if (!containerRef.value) return;
  const w = containerRef.value.clientWidth;
  const h = containerRef.value.clientHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
};

onMounted(() => {
  const container = containerRef.value;
  const width = container.clientWidth;
  const height = container.clientHeight;

  // 建立 renderer 並設白背景
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0xffffff);
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  // 建立 scene
  scene = new THREE.Scene();

  // 建立 camera（內部視角）
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(0, 0, 40);

  // OrbitControls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.addEventListener("end", () => {
    console.log("Camera Position:", camera.position);
    console.log("Camera Rotation:", camera.rotation);
  });

  // 建立 180×100×100 的 BoxGeometry
  const geometry = new THREE.BoxGeometry(180, 100, 100);

  // 準備 6 個 Material：其中 +Z（第 5 個）用藍色，其餘白色
  const whiteMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.BackSide,
  });
  const blueMat = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    side: THREE.BackSide,
  });
  const redMat = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.BackSide,
  });
   const yellowMat = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    side: THREE.BackSide,
  });
  const materials = [
    whiteMat, // +X
    whiteMat, // -X
    redMat, // +Y
    yellowMat, // -Y
    whiteMat,
    blueMat, // +Z ← 前方面內側變藍 // -Z
  ];

  // 建立 Mesh，傳入 materials 陣列
  const cube = new THREE.Mesh(geometry, materials);
  scene.add(cube);

  // 綠色邊框，關閉 depthTest & depthWrite，避免 Z-fighting
  const edgeGeo = new THREE.EdgesGeometry(geometry);
  const edgeMat = new THREE.LineBasicMaterial({
    color: 0x00ff00,
    depthTest: false,
    depthWrite: false,
  });
  const edges = new THREE.LineSegments(edgeGeo, edgeMat);
  edges.scale.set(1.001, 1.001, 1.001);
  scene.add(edges);

  // 動畫 loop
  const animate = () => {
    animationId = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  // 監聽視窗 resize
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", onResize);
  controls.dispose();
  renderer.dispose();
});
</script>

<template>
  <main
    class="w-screen h-screen fixed top-0 left-0 z-20 flex items-center justify-center"
  >
    <section
      ref="containerRef"
      class="w-11/12 h-11/12 relative overflow-hidden"
    ></section>
  </main>
</template>
