<script setup>
import { ref, onMounted, nextTick } from "vue";
import gsap from "gsap";
import { works } from "~/data/works";
import TopBanner from "~/components/parts/TopBanner.vue";

const container = ref(null);

// 用於展示的列表，初始為 works
const displaySlides = ref([...works]);

const observer = ref(null);
const sentinel = ref(null);
const card = ref(null);

const loadMore = () => {
  // 將原 works append 到 displaySlides
  displaySlides.value = [...displaySlides.value, ...works];
};

onMounted(() => {
  gsap.fromTo(card.value, { ease: "power4.in", opacity: 0 }, { opacity: 1 });

  nextTick(() => {
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && loadMore());
      },
      { root: null, rootMargin: "0px", threshold: 1.0 }
    );

    if (sentinel.value) observer.value.observe(sentinel.value);
  });

  let scrollY = 0;
  let currentY = 0;
  const ease = 0.1;

  const update = () => {
    currentY += (scrollY - currentY) * ease;
    gsap.set(container.value, { y: -currentY });
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", () => (scrollY = window.scrollY));
  update();
});
</script>

<template>
  <TopBanner />
  <main
    ref="container"
    class="w-full h-auto flex justify-center items-start p-4"
  >
    <section
      class="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-12 sm:mb-5"
    >
      <NuxtLink
        v-for="(item, index) in displaySlides"
        :key="item.slug + '-' + index"
        :to="`/projects/${item.slug}`"
        class="flex flex-col justify-center items-center overflow-hidden transition cursor-pointer"
      >
        <div class="relative w-full">
          <img
            :src="item.cover"
            :alt="item.title"
            class="w-full h-auto object-cover hover:rounded-4xl transition-all duration-150"
          />
        </div>

        <div
          class="flex justify-between items-center w-full px-1 pt-2 sm:text-base md:text-xs"
        >
          <h3 class="newsreader text-secondary/70">{{ item.title }}</h3>
          <div class="text-primary silkscreen">{{ item.year }}</div>
        </div>
      </NuxtLink>

      <!-- Sentinel 用於觸發無限滾動 -->
      <div ref="sentinel" class="h-1 w-full"></div>
    </section>
  </main>
</template>
