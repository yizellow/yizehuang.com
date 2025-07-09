<script setup>
// definePageMeta({
//   layout: "default",
//   noNavbarPadding: true,
// });

import { ref, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const card = ref(null);

onMounted(() => {
  // 初始位置與 transform 設定，確保一開始置中
  gsap.set(card.value, {
    xPercent: -50,
    yPercent: -50,
    left: "50vw",
    top: "50vh",
    transformOrigin: "center center",
    position: "absolute",
  });

  // 滑動時放大為 fullscreen
  gsap.to(card.value, {
    width: "100vw",
    height: "100vh",
    ease: "power2.out",
    scrollTrigger: {
      trigger: card.value,
      start: "top center",
      end: "bottom top",
      scrub: true,
    },
  });
});
</script>

<template>
  <div class="relative w-screen h-[200vh] bg-black">
    <!-- Sticky 區域 -->
    <section class="sticky h-screen top-0 bg-green-200">
      <!-- 中間的卡片 -->
      <div
        ref="card"
        class="bg-red-500 h-[50vh] w-[20vw] z-10 rounded-xl"
      ></div>
    </section>
  </div>
</template>
