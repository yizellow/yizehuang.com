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
    <div class="w-full h-full border-amber-100 border-2">
      <client-only>
        <Gallery />
      </client-only>
      <div
        class="w-full h-[70px] z-20 flex justify-center items-start bg-amber-100"
      >
        <div
          class="bg-secondary w-[100px] h-4/5 border-2 border-secondary text-white"
        >
          ssss
        </div>
      </div>

      <section
        class="w-full h-[50vh] flex justify-center items-start border-2 border-amber-300"
      >
        <div class="w-1/2 h-auto p-4 border-2 border-primary">
          <div
            v-for="(exhibit, index) in exhibitions"
            :key="index"
            class="mb-5"
          >
            <p
              class="flex justify-between items-center m-0 text-primary text-xs"
            >
              <!-- 左邊：時間 + 名稱 -->
              <span class="flex gap-2 items-center">
                <span class="newsreader text-xs text-secondary">{{
                  exhibit.date
                }}</span>
                <h1 class="silkscreen text-base text-secondary">
                  {{ exhibit.title }}
                </h1>
              </span>

              <!-- 右邊：地點 -->
              <span class="newsreader text-xs text-right text-secondary">{{
                exhibit.location
              }}</span>
            </p>
          </div>
        </div>
      </section>

      <footer
        class="w-full h-[7vh] flex boreder text-secondary justify-center items-center border-2 border-dashed"
      >
        <div
          class="newsreader flex flex-row items-center justify-center gap-4 w-7/8 h-full"
        >
          <p>Email: yize0926@gmail.com</p>
          <p>whatapp: 886+981488850</p>
          <p>instagram: _yi_ze_</p>
        </div>
      </footer>
    </div>
  </section>
</template>

<style scoped></style>
