<template>
  <main class="relative">
    <!-- 疊加你的 Three.js 模型組件 -->
    <div class="fixed top-0 left-0 w-full h-screen pointer-events-none z-10">
      <Model :rotationY="modelRotationY" />
    </div>

    <!-- 你原本的內容 -->
    <section
      v-for="(content, idx) in sectionData"
      :key="idx"
      class="section flex items-center justify-center px-6 py-20"
      ref="sections"
    >
      <div class="max-w-3xl text-center">
        <h2 class="text-3xl font-bold mb-4">{{ content.title }}</h2>
        <p class="text-lg whitespace-pre-line">{{ content.body }}</p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Model from "~/components/three.js/Model.vue";

// ——— 四個 Section 的內容 ———
const sectionData = [
  {
    title: "HELLO!",
    body: "This is Yi-Ze Huang.",
  },
  {
    title: "INTRODUCTION",
    body:
      "Hi, my name is Yize Huang. I am from Hualien, Taiwan.\n\n" +
      "I enjoy poetry and traveling the world. I believe engaging in different cultures gives a different perspective of the world and its people.\n\n" +
      "Fun fact about myself is that I have a deep fear of boredom, thus the reason why I like to stay engaged in fun stuff.",
  },
  {
    title: "EXHIBITION",
    body:
      "12.2023 Painting Comfort Zone, North and South Gallery\n" +
      "04-05.2023 If the World Had No Maps, Underground Experimental Field\n" +
      "08.2021 2021 GenieLab TNUA, online exhibition (Third Place)\n" +
      "12.2020 Picking up Color Project: Pocket book for Autumn, North and South Gallery\n" +
      "07.2020 ALIA (workshop), KdMoFA\n" +
      "12.2019 Myself, 8 and one-half Gallery",
  },
  {
    title: "CONTACT",
    body: "Email: alan0981488850@gmail.com\nPhone: 0981488850",
  },
];

const sections = ref([]);
let lastScrollY = 0;
let scrollDirection = "down";
const modelRotationY = ref(0);

// 監聽滾動方向
const onScroll = () => {
  const current = window.scrollY;
  scrollDirection = current > lastScrollY ? "down" : "up";
  lastScrollY = current;

  modelRotationY.value = current * 0.2;
};

onMounted(() => {
  // 初始化
  lastScrollY = window.scrollY;
  window.addEventListener("scroll", onScroll);

  // 只在進入畫面時觸發進場動畫
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 根據滾動方向決定進場動畫
          const el = entry.target;
          el.classList.remove("slide-in-left", "slide-in-right");
          if (scrollDirection === "down") {
            el.classList.add("slide-in-right");
          } else {
            el.classList.add("slide-in-left");
          }
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.value.forEach((el) => observer.observe(el));

  onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
    observer.disconnect();
  });
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<style scoped>
.section {
  min-height: 100vh;
  opacity: 0; /* 初始隱藏 */
}

/* 進場動畫 keyframes */
@keyframes slideInRight {
  from {
    transform: translateX(100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slideInLeft {
  from {
    transform: translateX(-100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 套用進場動畫 */
.slide-in-right {
  animation: slideInRight 0.8s forwards ease-out;
}
.slide-in-left {
  animation: slideInLeft 0.8s forwards ease-out;
}
</style>
