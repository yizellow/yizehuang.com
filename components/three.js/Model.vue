<script setup>
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const container = ref(null);
let model;

onMounted(() => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.value.appendChild(renderer.domElement);
  renderer.setClearColor(0x000000, 0); // 第二個參數 0 表示完全透明

  // PMREM 轉換器，用於把 HDRI 處理成環境貼圖
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  new RGBELoader()
    .setPath("/three.js/") // 這會對應 public/three.js/
    .load("studio_small_09_1k.hdr", (texture) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      scene.environment = envMap;
      texture.dispose();
      pmremGenerator.dispose();
    });

  // 物件
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

  const loader = new GLTFLoader();
  loader.load("/three.js/model.glb", (gltf) => {
    model = gltf.scene;
    scene.add(model);

    model.rotation.set(0, 340, 0);
    model.position.set(0, 0, 0); // 你可以微調位置
    model.scale.set(0.5, 0.5, 0.5); // 或調整大小
  });

  // const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);

  // 燈光
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);

  camera.position.set(
    3.820715250497878,
    1.6506210944982715,
    -0.9911089870690157
  );

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // 啟用阻尼效果，讓控制更平滑
  controls.dampingFactor = 0.05; // 阻尼系數
  controls.target.set(
    0.10790921714222715,
    1.0653948879334911,
    0.25094668382122526
  );

  // 動畫
  const animate = () => {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // if (model) {
    //   model.rotation.x += 0.005;
    //   model.rotation.y += 0.005;
    // }

    controls.update(); // 更新控制器
    renderer.render(scene, camera);
  };
  console.log("camera position", camera.position);
  console.log("camera rotation", camera.rotation);
  console.log("controls target", controls.target);

  animate();
});
</script>

<template>
  <div ref="container" class="w-screen h-screen"></div>
</template>
<style scoped>
canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
