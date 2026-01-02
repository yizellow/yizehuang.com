<!-- BoxTickerScroll.vue -->

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
import Gallery from "~/components/parts/Gallery.vue";
import { useRouter } from "#imports";
import { works } from "~/data/works";
const displaySlides = computed(() =>
  works
    .filter((w) => featuredSlugs.includes(w.slug))
    .map((w) => ({
      slug: w.slug,
      title: w.title,
      year: w.year,
      cover: w.cover,
    }))
);
const featuredSlugs = [
  "chips",
  "yizellow",
  "me-2019",
  "plastic_wrap_protection_Laocoon_and_his_sons",
  "film_camera_before_2025",
  "the_men_with_a_flower",
];
const slides = computed(() =>
  displaySlides.value.map((item) => ({
    img: item.cover,
    caption: item.title,
    slug: item.slug,
  }))
);
const router = useRouter();

import picUrl from "@/assets/images/pic.jpg";
const exhibitions = [
  {
    date: "12.2023",
    title: "Painting Comfort Zone",
    location: "North and South Gallery",
  },
  {
    date: "05.2023",
    title: "If the World Had No Maps",
    location: "Underground Experimental Field",
  },
  {
    date: "08.2021",
    title: "2021GenieLab TNUA (Third Place)",
    location: "online exhibition",
  },
  {
    date: "12.2020",
    title: "Picking up Color Project: Pocket book for Autumn",
    location: "North and South Gallery",
  },
  { date: "12.2019", title: "Myself", location: "8 and one-half Gallery" },
];
// GSAP 插件已在 plugins/gsap.client.ts 中註冊

const containerRef = ref(null);
let renderer, cssRenderer, scene, camera, controls, animationId;
// 提供滾動距離的 spacer 高度（px）
const spacerHeight = ref(0);
// 視窗高度（px）
const viewportHeight = ref(0);
// 當捲動到區塊底部時顯示置中元素
const showBottomBadge = ref(false);
let bottomBadgeST;

const boxSize = { x: 200, y: 100, z: 100 }; // 寬、高、深

function onResize() {
  if (!containerRef.value) return;
  const w = containerRef.value.clientWidth;
  const h = containerRef.value.clientHeight;
  renderer.setSize(w, h);
  cssRenderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  // 同步更新視窗高度
  if (typeof window !== "undefined") {
    viewportHeight.value = window.innerHeight;
  }
}

onMounted(() => {
  // 初始化視窗高度
  if (typeof window !== "undefined") {
    viewportHeight.value = window.innerHeight;
  }
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

  controls = new OrbitControls(camera, renderer.domElement);
  renderer.domElement.style.pointerEvents = "none";
  cssRenderer.domElement.style.pointerEvents = "auto";
  controls.enableDamping = false;
  controls.enableRotate = false; // 禁用旋轉
  controls.enableZoom = false; // 禁用縮放
  controls.enablePan = false; // 禁用平移
  const onCssClick = (e) => {
    console.log("clicked", e.target);
  };
  cssRenderer.domElement.addEventListener("click", onCssClick, true);
  /* 2. 透明立方體 + 邊框 ---------------------------------------- */
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(boxSize.x, boxSize.y, boxSize.z),
    new Array(6).fill(
      new THREE.MeshBasicMaterial({
        color: 0xf7f8fa,
        transparent: false,
        side: THREE.DoubleSide, // 看得到內壁
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

  const itemsHtml = slides.value
    .map(
      ({ img, caption, slug }) => `
    <div class="container p-2 m-2 bg-white/80"
         data-link="/projects/${slug}">
      <div class="pic"><img src="${img}" /></div>
      <p class="opacity-90">${caption}</p>
    </div>
  `
    )
    .join("");

  /* 3. 文字範本 -------------------------------------------------- */
  const templateDiv = document.createElement("div");
  templateDiv.className = "slide";
  templateDiv.style.width = `${boxSize.x}px`;
  templateDiv.style.height = `${boxSize.y}px`;

  templateDiv.innerHTML = `
  <main class="container bg-white/30 justify-center">
    <div class="w-full h-[100px] "></div>
    <section class="w-3/5 silkscreen text-[6px] mt-2">
      ${itemsHtml}
    </section>

    <div
      data-link="/context"
      role="button"
      tabindex="0"
      class="bg-secondary/60 silkscreen w-3/4 h-[5vh] border-2 rounded-4xl
             text-primary flex justify-center items-center mb-2 p-2 seemore cursor-pointer"
    >
      MORE...
    </div>
  </main>
`;

  cssRenderer.domElement.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;

    const btn = target.closest("[data-link]");
    if (!btn) return;

    const to = btn.getAttribute("data-link");
    if (!to) return;

    e.preventDefault();
    router.push(to);
  });
  templateDiv.style.pointerEvents = "auto";
  templateDiv.style.cursor = "auto";

  // 讓按鈕一定能吃到事件
  templateDiv.querySelectorAll("button,[data-link]").forEach((el) => {
    el.style.pointerEvents = "auto";
    el.style.cursor = "pointer";
  });
  /* 4. 四個面 ---------------------------------------------------- */
  const panels = [];

  // 前面 +Z（翻 180°）
  const front = new CSS3DObject(templateDiv.cloneNode(true));
  front.position.set(0, boxSize.z, boxSize.z / 2);
  front.rotation.y = Math.PI;
  scene.add(front);
  panels.push(front);

  // 上面 +Y（先 -90° 讓面朝下，再 +180° 讓文字正向）★
  const top = new CSS3DObject(templateDiv.cloneNode(true));
  top.position.set(0, boxSize.y / 2, 0);
  top.rotation.set(-Math.PI / 2, Math.PI, 0); // ★ 多轉 Y = π

  scene.add(top);
  panels.push(top);

  // 下面 −Y（先 +90° 讓面朝上，再 +180° 讓文字正向）★
  const bottom = new CSS3DObject(templateDiv.cloneNode(true));
  bottom.position.set(0, -boxSize.y / 2, 2 * boxSize.z);

  // bottom.position.set(0, -boxSize.y / 2, boxSize.z + 4);
  bottom.rotation.set(Math.PI / 2, Math.PI, 0); // ★ 多轉 Y = π
  const bottomEl = templateDiv.cloneNode(true);
  bottomEl.style.height = `${boxSize.z}px`;
  scene.add(bottom);
  panels.push(bottom);

  /* 5. ScrollTrigger：四面一起 scrub ----------------------------- */
  let frontScrollTween;
  let otherScrollTweens = [];

  // 等待圖片載入，避免量測高度不準
  const waitForImages = async (rootEl) => {
    const imgs = Array.from(rootEl.querySelectorAll("img"));
    if (imgs.length === 0) return;
    await Promise.all(
      imgs.map((img) =>
        img.complete && img.naturalHeight !== 0
          ? Promise.resolve()
          : new Promise((resolve) =>
              img.addEventListener("load", resolve, { once: true })
            )
      )
    );
  };

  const setupScrolling = () => {
    // 先清掉舊的 tween
    if (frontScrollTween) frontScrollTween.kill();
    otherScrollTweens.forEach((t) => t.kill());
    otherScrollTweens = [];

    // 取得 front 面 main（與其他面一致）
    const frontMain = front.element.querySelector("main");
    const faceHeight = boxSize.y;

    // 動態量測內容高度與需要滑動的距離
    const contentHeight =
      frontMain.scrollHeight || frontMain.getBoundingClientRect().height;
    const scrollDistance = Math.max(0, contentHeight - faceHeight); //TODO:要讓面少一個

    // 以 spacer 製造可滾動距離，避免使用 pin
    // 精準以內容高度決定可滾距離（不再額外加尾端距離）
    spacerHeight.value = scrollDistance;

    // front 面：用 px 精準滑動到內容剛好全部滑出
    frontScrollTween = gsap.fromTo(
      frontMain,
      { y: 0 },
      {
        y: () =>
          -Math.max(
            0,
            (frontMain.scrollHeight ||
              frontMain.getBoundingClientRect().height) - faceHeight
          ),
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: containerRef.value,
          start: "top top",
          end: () =>
            `+=${Math.max(
              0,
              (frontMain.scrollHeight ||
                frontMain.getBoundingClientRect().height) - faceHeight
            )}`,
          scrub: true,
          markers: false,
          invalidateOnRefresh: true,
        },
      }
    );

    // 其他面：與 front 同步距離，改用 px 位移確保可滑完整內容
    panels
      .filter((obj) => obj !== front)
      .forEach((obj) => {
        const pEl = obj.element.querySelector("main");
        const tween = gsap.fromTo(
          pEl,
          { y: 0 },
          {
            y: () =>
              -Math.max(
                0,
                (frontMain.scrollHeight ||
                  frontMain.getBoundingClientRect().height) - faceHeight
              ),
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: containerRef.value,
              start: "top top",
              end: () =>
                `+=${Math.max(
                  0,
                  (frontMain.scrollHeight ||
                    frontMain.getBoundingClientRect().height) - faceHeight
                )}`,
              scrub: true,
              markers: false,
              invalidateOnRefresh: true,
            },
          }
        );
        otherScrollTweens.push(tween);
      });
  };

  // 等待一幀與圖片載入後再量測，避免初始高度計算錯誤
  requestAnimationFrame(async () => {
    const frontMain = front.element.querySelector("main");
    await waitForImages(frontMain);
    setupScrolling();
    ScrollTrigger.refresh();
  });

  /* 6. render loop ---------------------------------------------- */
  const animate = () => {
    animationId = requestAnimationFrame(animate);
    // controls.update();
    renderer.render(scene, camera);
    cssRenderer.render(scene, camera);
  };
  animate();

  window.addEventListener("resize", onResize);

  // 於本區塊捲到最底時顯示置中元素
  bottomBadgeST = ScrollTrigger.create({
    trigger: containerRef.value,
    start: "bottom bottom",
    onEnter: () => (showBottomBadge.value = true),
    onLeaveBack: () => (showBottomBadge.value = false),
    invalidateOnRefresh: true,
  });
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", onResize);
  // controls.dispose();
  renderer.dispose();

  // 把 CSS3D 的 DOM 元素移除
  if (cssRenderer?.domElement?.parentNode) {
    cssRenderer.domElement.parentNode.removeChild(cssRenderer.domElement);
  }

  // 不要再呼叫 cssRenderer.dispose()
  if (bottomBadgeST) bottomBadgeST.kill();
});
</script>
<template>
  <!-- sticky 區塊 + spacer 提供可滾動距離 -->
  <section
    class="w-full relative"
    :style="{ height: `${spacerHeight + viewportHeight}px` }"
  >
    <div class="sticky top-0 h-screen z-10" ref="containerRef"></div>
  </section>
</template>

<style>
.container {
  width: 100%;
  display: flex; /* 啟動 Flex */
  flex-direction: column; /* 一列列往下排 */
  align-items: center; /* 主軸垂直時，這是水平置中 */
  justify-content: start;

  border: 0.5px solid var(--color-primary);
}
.buffer {
  width: 100%;
  height: 100px;
}
.pic {
  width: 100%;
  border: 0.5px solid var(--color-primary);
}
.pic:hover img {
  filter: invert(100%);
}
.seemore:hover {
  filter: invert(100%);
}
</style>
