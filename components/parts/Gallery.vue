<!-- BoxTickerScroll.vue -->
<template>
  <!-- 3D 盒子固定在視窗中央 -->
  <main
    class="w-screen h-screen fixed top-0 left-0 flex items-center justify-center"
  >
    <section
      ref="containerRef"
      class="w-11/12 h-11/12 relative overflow-hidden"
    ></section>
  </main>

  <!-- 製造捲動長度 -->
  <div class="h-[200vh]"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const containerRef = ref(null);
let renderer, cssRenderer, scene, camera, controls, animationId;

const boxSize = { x: 180, y: 100, z: 200 }; // 寬、高、深

function onResize() {
  if (!containerRef.value) return;
  const w = containerRef.value.clientWidth;
  const h = containerRef.value.clientHeight;
  renderer.setSize(w, h);
  cssRenderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

onMounted(() => {
  /* 1. 基本組裝 -------------------------------------------------- */
  const container = containerRef.value;
  const W = container.clientWidth;
  const H = container.clientHeight;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(W, H);
  renderer.domElement.style.position = "absolute";
  container.appendChild(renderer.domElement);

  cssRenderer = new CSS3DRenderer();
  cssRenderer.setSize(W, H);
  cssRenderer.domElement.style.position = "absolute";
  container.appendChild(cssRenderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 1000);
  camera.position.set(0, 0, -40);

  controls = new OrbitControls(camera, cssRenderer.domElement);
  controls.enableDamping = true;

  /* 2. 透明立方體 + 邊框 ---------------------------------------- */
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(boxSize.x, boxSize.y, boxSize.z),
    new Array(6).fill(
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide, // 看得到內壁
      })
    )
  );
  scene.add(cube);

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

  /* 3. 文字範本 -------------------------------------------------- */
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

  /* 4. 四個面 ---------------------------------------------------- */
  const panels = [];

  // 後面 −Z
  const back = new CSS3DObject(templateDiv.cloneNode(true));
  back.position.set(0, -boxSize.y / 2 + 10, -boxSize.z / 2);
  scene.add(back);
  panels.push(back);

  // 前面 +Z（翻 180°）
  const front = new CSS3DObject(templateDiv.cloneNode(true));
  front.position.set(0, -boxSize.y / 2 + 10, boxSize.z / 2);
  front.rotation.y = Math.PI;
  scene.add(front);
  panels.push(front);

  // 上面 +Y（先 -90° 讓面朝下，再 +180° 讓文字正向）★
  const top = new CSS3DObject(templateDiv.cloneNode(true));
  top.position.set(0, boxSize.y / 2 - 10, 0);
  top.rotation.set(-Math.PI / 2, Math.PI, 0); // ★ 多轉 Y = π
  scene.add(top);
  panels.push(top);

  // 下面 −Y（先 +90° 讓面朝上，再 +180° 讓文字正向）★
  const bottom = new CSS3DObject(templateDiv.cloneNode(true));
  bottom.position.set(0, -boxSize.y / 2 + 10, 0);
  bottom.rotation.set(Math.PI / 2, Math.PI, 0); // ★ 多轉 Y = π
  scene.add(bottom);
  panels.push(bottom);

  /* 5. ScrollTrigger：四面一起 scrub ----------------------------- */
  panels.forEach((obj) => {
    const pEl = obj.element.querySelector("p");
    gsap.fromTo(
      pEl,
      { yPercent: 0 },
      {
        yPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });

  /* 6. render loop ---------------------------------------------- */
  const animate = () => {
    animationId = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    cssRenderer.render(scene, camera);
  };
  animate();

  window.addEventListener("resize", onResize);
});

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
