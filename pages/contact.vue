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
// import Carousel3D from "~/components/global/Carousel3D.vue";
import Gallery from "~/components/parts/Gallery.vue";
import Model from "~/components/three.js/Model.vue";

gsap.registerPlugin(ScrollTrigger);

const container = ref(null);
const card = ref(null);
const video = ref(null);
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
    scale: 0.7,
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
      end: "bottom bottom",
      // end: "bottom bottom-=30%",
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
        class="[w-100vw] h-screen z-5 mix-blend-darken"
        src="/videos/yizetitle_fast2.mp4"
        muted
        playsinline
        preload="auto"
      ></video>

      <div
        ref="card"
        class="absolute w-screen h-screen bg-secondary/50 origin-center border-primary rounded-xl z-10 overflow-hidden"
      >
        <Model />
      </div>
    </section>
  </div>

  <section class="relative w-screen h-[100vh] bg-red-500">
    <div class="w-full h-full">
      <client-only>
        <Gallery />
      </client-only>
      <div class="w-full h-[10vh] bg-secondary z-20">ssss</div>

      <section class="w-full h-full flex justify-center items-center">
        <div class="w-1/2 h-auto p-4 border-2 border-primary">
          <div
            v-for="(exhibit, index) in exhibitions"
            :key="index"
            class="mb-5"
          >
            <p
              class="flex justify-between items-center m-0 text-primary text-xs bg-secondary"
            >
              <!-- 左邊：時間 + 名稱 -->
              <span class="flex gap-2 items-center">
                <span class="newsreader text-xs text-white">{{
                  exhibit.date
                }}</span>
                <h1 class="silkscreen text-base text-white">
                  {{ exhibit.title }}
                </h1>
              </span>

              <!-- 右邊：地點 -->
              <span class="newsreader text-xs text-right text-white">{{
                exhibit.location
              }}</span>
            </p>
          </div>
        </div>
      </section>

      <footer class="w-full h-[20vh] flex flex-col bg-primary"></footer>
    </div>
  </section>
</template>
