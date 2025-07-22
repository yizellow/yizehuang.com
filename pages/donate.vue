<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const horizontalWrapper = ref(null);

onMounted(() => {
  // —— 1. 橫向滑動 ——
  const hSections = horizontalWrapper.value.querySelectorAll("section");
  gsap.to(hSections, {
    xPercent: -100 * (hSections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: horizontalWrapper.value,
      pin: true,
      scrub: 1,
      end: () => `+=${horizontalWrapper.value.offsetWidth}`,
      invalidateOnRefresh: true,
    },
  });

  // —— 2. 卡片 pin + 垂直偏移（堆疊效果） ——
  const cards = gsap.utils.toArray(".card");
});
</script>

<template>
  <main class="overflow-x-hidden">
    <!-- Landing -->
    <section
      class="w-screen min-h-screen bg-blue-300 flex items-center justify-center text-4xl"
    >
      landing
    </section>

    <!-- 橫向滑動區 -->
    <div class="overflow-x-hidden">
      <div class="flex" ref="horizontalWrapper">
        <section
          class="min-w-full min-h-screen bg-amber-600 flex-shrink-0 flex items-center justify-center text-4xl"
        >
          works
        </section>
        <section
          class="min-w-full min-h-screen bg-amber-700 flex-shrink-0 flex items-center justify-center text-4xl"
        >
          doing now
        </section>
      </div>
    </div>

    <!-- 卡片堆疊區： introduction、exhibition、contact -->
    <div class="relative w-full bg-black">
      <section
        class="card w-screen min-h-screen bg-red-400 border-[10px] border-gray-300 text-white flex items-center justify-center text-3xl"
      >
        introduction
      </section>
      <section
        class="card w-screen min-h-screen bg-red-500 border-[10px] border-gray-300 text-white flex items-center justify-center text-3xl top-100px"
      >
        exhibition
      </section>
      <section
        class="card w-screen min-h-screen bg-red-600 border-[10px] border-gray-300 text-white flex items-center justify-center text-3xl top-100px"
      >
        contact
      </section>
    </div>
  </main>
</template>
