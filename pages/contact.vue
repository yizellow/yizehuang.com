<script setup>
definePageMeta({
  layout: "default",
  noNavbarPadding: true,
});

import { ref, onMounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const container = ref(null);
const card = ref(null);
const video = ref(null);

onMounted(() => {
  // 初始大小定位
  gsap.set(card.value, {
    width: "5vw",
    height: "10vw",
    xPercent: -50,
    yPercent: -50,
    left: "50vw",
    top: "50vh",
    position: "absolute",
    transformOrigin: "center center",
  });

  // 用 container 當 trigger
  gsap.to(card.value, {
    width: "100vw",
    height: "100vh",
    ease: "power4.in",
    scrollTrigger: {
      trigger: container.value,
      start: "top bottom", // 容器頂部到達畫面底部往上 50% 時啟動
      end: "bottom bottom", // 容器底部到達畫面底部時結束
      scrub: true,
      marker: true,
    },
  });

  // 影片 scrub 同步（不動）
  const vid = video.value;
  const setupVideoScrub = () => {
    vid.play().then(() => vid.pause());
    let lastTime = 0;
    ScrollTrigger.create({
      trigger: container.value,
      start: "top top ",
      end: "center center-=30%",
      // markers: true,
      onUpdate: (self) => {
        const t = (vid.duration || 1) * self.progress;
        if (Math.abs(t - lastTime) > 0.05) {
          vid.currentTime = t;
          lastTime = t;
        }
      },
    });
  };
  vid.readyState >= 1
    ? setupVideoScrub()
    : vid.addEventListener("loadedmetadata", setupVideoScrub);
});
</script>

<template>
  <div ref="container" class="relative w-screen h-[300vh]">
    <section class="sticky top-0 h-[100vh] bg-white">
      <video
        ref="video"
        class="w-screen h-screen z-5"
        src="/videos/yizetitle_fast2.mp4"
        muted
        playsinline
        preload="auto"
      ></video>
      <div ref="card" class="absolute bg-primary rounded-xl z-10"></div>
    </section>
  </div>
</template>
