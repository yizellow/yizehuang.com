<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const props = defineProps({
  rotationY: { type: Number, default: 0 },

  cameraPosition: {
    type: Object,
    default: () => ({
      x: 0.546911,
      y: 4.044661,
      z: -0.513629,
    }),
  },

  controlsTarget: {
    type: Object,
    default: () => ({
      x: 0.107909,
      y: 1.065395,
      z: 0.250947,
    }),
  },

  modelPosition: {
    type: Object,
    default: () => ({ x: 0, y: -0.5, z: 0.21 }),
  },

  modelScale: {
    type: [Number, Object],
    default: 0.8,
  },

  modelUrl: {
    type: String,
    default: "/three.js/me.glb",
  },

  envHdr: {
    type: String,
    default: "studio_small_09_1k.hdr",
  },

  envPath: {
    type: String,
    default: "/three.js/",
  },

  enableOrbit: { type: Boolean, default: true },
});

const container = ref(null);
let scene, camera, renderer, model, controls, animationId, pmremGenerator;

function applyCameraFromProps() {
  camera.position.set(
    props.cameraPosition.x,
    props.cameraPosition.y,
    props.cameraPosition.z,
  );
  if (controls) {
    controls.target.set(
      props.controlsTarget.x,
      props.controlsTarget.y,
      props.controlsTarget.z,
    );
    controls.update();
  }
}

function applyModelTransformFromProps() {
  if (!model) return;
  model.position.set(
    props.modelPosition.x,
    props.modelPosition.y,
    props.modelPosition.z,
  );
  if (typeof props.modelScale === "number") {
    model.scale.set(props.modelScale, props.modelScale, props.modelScale);
  } else {
    model.scale.set(
      props.modelScale.x ?? 1,
      props.modelScale.y ?? 1,
      props.modelScale.z ?? 1,
    );
  }
  model.rotation.y = (props.rotationY * Math.PI) / 180;
}

function onResize() {
  if (!container?.value || !renderer || !camera) return;
  const w = container.value.clientWidth;
  const h = container.value.clientHeight || 1;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
}

function logTransforms() {
  if (!camera) return;
  const to3 = (v) => ({
    x: +v.x.toFixed(6),
    y: +v.y.toFixed(6),
    z: +v.z.toFixed(6),
  });
  const camEuler = new THREE.Euler().setFromQuaternion(
    camera.quaternion,
    "XYZ",
  );
  const payload = {
    cameraPosition: to3(camera.position),
    cameraRotationEulerDeg: {
      x: +THREE.MathUtils.radToDeg(camEuler.x).toFixed(3),
      y: +THREE.MathUtils.radToDeg(camEuler.y).toFixed(3),
      z: +THREE.MathUtils.radToDeg(camEuler.z).toFixed(3),
    },
    controlsTarget: controls ? to3(controls.target) : null,
    model: model && {
      position: to3(model.position),
      rotationEulerDeg: {
        x: +THREE.MathUtils.radToDeg(model.rotation.x).toFixed(3),
        y: +THREE.MathUtils.radToDeg(model.rotation.y).toFixed(3),
        z: +THREE.MathUtils.radToDeg(model.rotation.z).toFixed(3),
      },
      scale: to3(model.scale),
    },
  };
  console.table(payload);
  console.log("Copy-ready JSON:", JSON.stringify(payload, null, 2));
}

function onKeydown(e) {
  if (e.key.toLowerCase() === "l") logTransforms();
}

onMounted(() => {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    (container.value.clientWidth || 1) / (container.value.clientHeight || 1),
    0.1,
    1000,
  );

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(
    container.value.clientWidth,
    container.value.clientHeight || 1,
  );
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.setClearColor(0x000000, 0);
  container.value.appendChild(renderer.domElement);

  pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  new RGBELoader().setPath(props.envPath).load(props.envHdr, (texture) => {
    const envMap = pmremGenerator.fromEquirectangular(texture).texture;
    scene.environment = envMap;
    texture.dispose();
    pmremGenerator.dispose();
  });

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);

  const loader = new GLTFLoader();
  loader.load(
    props.modelUrl,
    (gltf) => {
      model = gltf.scene;
      scene.add(model);
      applyModelTransformFromProps();
    },
    undefined,
    (err) => console.error("GLB 載入失敗：", err),
  );

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enabled = props.enableOrbit;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = false;

  applyCameraFromProps();

  window.addEventListener("resize", onResize);
  window.addEventListener("keydown", onKeydown);

  const animate = () => {
    animationId = requestAnimationFrame(animate);
    if (model) model.rotation.y = (props.rotationY * Math.PI) / 180;
    controls.update();
    renderer.render(scene, camera);
  };
  animate();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", onResize);
  window.removeEventListener("keydown", onKeydown);
  controls?.dispose();
  renderer?.dispose();

  if (container.value && renderer?.domElement?.parentNode === container.value) {
    container.value.removeChild(renderer.domElement);
  }

  scene?.traverse((obj) => {
    if (obj.isMesh) {
      obj.geometry?.dispose?.();
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      mats.forEach((m) => {
        m.map?.dispose?.();
        m.normalMap?.dispose?.();
        m.roughnessMap?.dispose?.();
        m.metalnessMap?.dispose?.();
        m.envMap?.dispose?.();
        m.emissiveMap?.dispose?.();
        m.dispose?.();
      });
    }
  });
  scene = null;
});
</script>

<template>
  <div ref="container" class="w-screen h-screen"></div>
</template>

<style scoped>
/* div {
  width: 100%;
  height: 100%;
} */
</style>
