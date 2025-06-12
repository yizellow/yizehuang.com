<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const props = defineProps({
  rotationY: {
    type: Number,
    default: 0,
  },
});

const container = ref(null);
let scene, camera, renderer, model, controls, animationId, pmremGenerator;

onMounted(() => {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000
  );
  camera.position.set(
    3.820715250497878,
    1.6506210944982715,
    -0.9911089870690157
  );

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.value.appendChild(renderer.domElement);
  renderer.setClearColor(0x000000, 0);

  pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  new RGBELoader()
    .setPath("/three.js/")
    .load("studio_small_09_1k.hdr", (texture) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      scene.environment = envMap;
      texture.dispose();
      pmremGenerator.dispose();
    });

  const loader = new GLTFLoader();
  loader.load("/three.js/model.glb", (gltf) => {
    model = gltf.scene;
    scene.add(model);

    model.position.set(0, 0, 0);
    model.scale.set(0.5, 0.5, 0.5);
  });

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.target.set(
    0.10790921714222715,
    1.0653948879334911,
    0.25094668382122526
  );

  const animate = () => {
    animationId = requestAnimationFrame(animate);

    if (model) {
      // 根據 props rotationY (度) 轉成弧度
      model.rotation.y = (props.rotationY * Math.PI) / 180;
    }

    controls.update();
    renderer.render(scene, camera);
  };

  animate();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
  renderer.dispose();
  pmremGenerator?.dispose();
  controls.dispose();
  // 移除畫布元素
  if (container.value) {
    container.value.removeChild(renderer.domElement);
  }
});
</script>

<template>
  <div ref="container" class="w-full h-full"></div>
</template>

<style scoped>
div {
  width: 100%;
  height: 100%;
}
</style>
