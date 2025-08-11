<!-- 有時候沒顯現是因為他依照外面容器去拉開。 -->

<script setup>
definePageMeta({
  layout: "default",
  noNavbarPadding: true,
});

import { ref, onMounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Test from "~/components/pages/Test.vue";
import Carousel3D from "~/components/global/Carousel3D.vue";
import Gallery from "~/components/parts/Gallery.vue";

gsap.registerPlugin(ScrollTrigger);

const container = ref(null);
const card = ref(null);
const video = ref(null);

onMounted(() => {
  // 初始 scale 5%
  gsap.set(card.value, {
    scale: 0.05,
    xPercent: -50,
    yPercent: -50,
    left: "50vw",
    top: "50vh",
    position: "absolute",
    transformOrigin: "center center",
  });

  // scroll 時放大到 100%
  gsap.to(card.value, {
    scale: 0.95,
    ease: "power4.in",
    scrollTrigger: {
      trigger: container.value,
      start: "top bottom",
      end: "bottom bottom",
      scrub: true,
      markers: true,
    },
  });

  // 影片 scrub 同步
  const vid = video.value;
  const setupVideoScrub = () => {
    vid.play().then(() => vid.pause());
    let lastTime = 0;
    ScrollTrigger.create({
      trigger: container.value,
      start: "top top",
      end: "center center-=30%",
      onUpdate: (self) => {
        const t = (vid.duration || 1) * self.progress;
        if (Math.abs(t - lastTime) > 0.05) {
          vid.currentTime = t;
          lastTime = t;
        }
      },
    });
  };
  if (vid.readyState >= 1) {
    setupVideoScrub();
  } else {
    vid.addEventListener("loadedmetadata", setupVideoScrub);
  }
});
</script>

<template>
  <div ref="container" class="relative w-screen h-[280vh]">
    <section class="sticky top-0 h-screen">
      <video
        ref="video"
        class="w-screen h-screen z-5 mix-blend-darken"
        src="/videos/yizetitle_fast2.mp4"
        muted
        playsinline
        preload="auto"
      ></video>

      <div
        ref="card"
        class="absolute w-screen h-screen origin-center border-primary border-2 rounded-xl z-10 overflow-hidden"
      >
        <Carousel3D />
      </div>
    </section>
  </div>
  <section class="relative h-[100vh] bg-red-500">
    <div class="sticky top-0 h-screen">
      <client-only>
        <Gallery />
      </client-only>
    </div>
  </section>
  <!-- <section class="h-[100vh] w-full bg-amber-500"></section> -->
</template>
