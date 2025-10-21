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
    date: "2023",
    title: "Painting Comfort Zone",
    location: "North and South Gallery",
  },
  {
    date: "2023",
    title: "If the World Had No Maps",
    location: "Underground Experimental Field",
  },
  {
    date: "2021",
    title: "2021GenieLab TNUA (Third Place)",
    location: "online exhibition",
  },
  {
    date: "2020",
    title: "Picking up Color Project: Pocket book for Autumn",
    location: "North and South Gallery",
  },
  { date: "2019", title: "Myself", location: "8 and one-half Gallery" },
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
      // end: "bottom bottom",
      end: "bottom bottom-=90%",
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
      <section
        class="w-full h-auto flex flex-col justify-start items-center p-4"
      >
        <div class="w-1/2 h-full mb-5">
          <p class="silkscreen text-left text-3xl">CV</p>
        </div>

        <div class="w-1/2 h-full p-4 border-2 border-primary text-xs">
          <div class="mb-2">
            <p class="mb-2 text-sm silkscreen">
              2027 MFA, Frank Mohr Institute
            </p>
            <p class="text-right mb-5 newsreader">
              Media, Art, Design & Technology (MADtech)
            </p>
            <p class="mb-2 silkscreen text-sm">
              2024 BA, Taipei National University of the Arts
            </p>
            <p class="mb-4 text-right newsreader">
              Art History and Visual Culture
            </p>
          </div>
          <hr class="h-px mb-5 border-0 bg-primary" />

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
        class="w-full h-[10vh] flex boreder text-secondary justify-center items-center mt-10"
      >
        <div
          class="p-2 newsreader flex flex-row items-center mb-2 justify-between gap-4 w-1/2 h-full"
        >
          <p>Email: yize0926@gmail.com</p>
          <p>whatsApp: +886 (0) 981488850</p>
          <p>Instagram: yizellow</p>
        </div>
      </footer>
    </div>
  </section>
</template>

<style scoped></style>
