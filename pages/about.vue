<template>
  <main class="relative">
    <div
      class="fixed top-0 left-0 w-screen h-screen lg:w-1/3 z-0 pointer-events-none"
    >
      <Model :rotationY="modelRotationY" />
    </div>

    <div class="relative z-10 w-full lg:w-2/3 lg:ml-[33.3333%]">
      <section
        v-for="(content, idx) in sectionData"
        :key="idx"
        class="flex section items-center justify-center"
        ref="sections"
      >
        <div class="max-w-3xl p-4 w-4/5 lg:w-3/4">
          <h2
            class="text-xl lg:text-3xl text-primary font-bold mb-4 text-center lg:text-start"
          >
            {{ content.title }}
          </h2>
          <p
            class="text:sm lg:text-lg whitespace-pre-line text-center lg:text-start"
          >
            {{ content.body }}
          </p>
        </div>
      </section>
    </div>
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
    body: "Hi, my name is Yize Huang. I am from Hualien, Taiwan. I enjoy poetry and traveling the world. I believe engaging in different cultures gives a different perspective of the world and its people. Fun fact about myself is that I have a deep fear of boredom, thus the reason why I like to stay engaged in fun stuff.",
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
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.section {
  min-height: 100vh;
}
</style>
