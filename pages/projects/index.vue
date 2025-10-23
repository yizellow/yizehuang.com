<script setup>
import { ref, onMounted, nextTick } from "vue";
import gsap from "gsap";

const slides = [
  {
    img: "https://cdna.artstation.com/p/assets/images/images/082/633/124/large/yize-huang-2024-12-06-9-01-23.jpg?1733490357",
    caption: "CHIPS",
  },
  {
    img: "https://cdnb.artstation.com/p/assets/images/images/052/116/789/large/yize-huang-plastic-wrap-protection-laocoon-and-his-sons.jpg?1658985491",
    caption: "3D modeling",
  },
  {
    img: "https://cdnb.artstation.com/p/assets/images/images/082/626/611/large/yize-huang-j4.jpg?1733473161",
    caption: "Yizellow",
  },
  {
    img: "https://cdna.artstation.com/p/assets/images/images/082/332/470/large/yize-huang-2024-11-27-5-48-00.jpg?1732701058",
    caption: "Travel and my film camera",
  },
  {
    img: "https://cdna.artstation.com/p/assets/images/images/082/499/478/large/yize-huang-2024-12-03-12-39-17.jpg?1733157609",
    caption: "Light Installation",
  },
];

const container = ref(null);

// 用於展示的列表，初始為 slides
const displaySlides = ref([...slides]);

// Intersection Observer
const observer = ref(null);
const sentinel = ref(null);

const loadMore = () => {
  // 將原 slides append 到 displaySlides
  displaySlides.value = [...displaySlides.value, ...slides];
};

onMounted(() => {
  nextTick(() => {
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMore();
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 1.0 }
    );

    if (sentinel.value) {
      observer.value.observe(sentinel.value);
    }
  });
  let scrollY = 0; // 真實滾動
  let currentY = 0; // 實際移動值
  const ease = 0.1; // 慣性強度，越小延遲越明顯

  const update = () => {
    // 緩動差值
    currentY += (scrollY - currentY) * ease;

    // 應用到 container
    gsap.set(container.value, {
      y: -currentY,
    });

    requestAnimationFrame(update);
  };
  window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
  });

  update();
});
</script>
<template>
  <main
    ref="container"
    class="w-screen h-auto flex justify-center items-start p-4"
  >
    <section
      class="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-12"
    >
      <div
        v-for="(item, index) in displaySlides"
        :key="index"
        class="flex flex-col justify-center items-center overflow-hidden transition"
      >
        <div class="relative w-full">
          <img
            :src="item.img"
            :alt="item.caption"
            class="w-full h-auto object-cover"
          />
        </div>
        <div class="flex justify-between items-center w-full px-1 pt-2">
          <h3 class="text-xs newsreader text-secondary/70">
            {{ item.caption }}
          </h3>
          <div class="text-primary text-xs silkscreen">2025</div>
        </div>
      </div>

      <!-- Sentinel 用於觸發無限滾動 -->
      <div ref="sentinel" class="h-1 w-full"></div>
    </section>
  </main>
</template>
