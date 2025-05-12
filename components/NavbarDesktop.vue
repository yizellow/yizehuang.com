<script setup>
import { gsap } from "gsap";
import { Icon } from "@iconify/vue";
import { ref, onMounted, watch } from "vue";

const frameRef = ref(null);
const showText = ref(false);
const icons = [
  "material-symbols:other-houses",
  "material-symbols:background-grid-small-sharp",
  "material-symbols:ar-stickers-sharp",
  "material-symbols:person",
  "material-symbols:coffee-sharp",
];
const menuItems = ["HOME", "PROJECTS", "ABOUT", "MEMBER", "DONATE"];

watch(showText, (val) => {
  if (val) {
    // icon 淡出
    gsap.to(".navbar-icon", {
      opacity: 0,
      y: -10,
      scale: 0.8,
      duration: 0.3,
      stagger: 0.05,
    });
    // text 淡入
    gsap.fromTo(
      ".navbar-text",
      { opacity: 0, scale: 1.2 },
      { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, delay: 0.2 }
    );
  } else {
    // text 淡出
    gsap.to(".navbar-text", {
      opacity: 0,
      scale: 1.2,
      duration: 0.3,
      stagger: 0.05,
    });
    // icon 淡入
    gsap.fromTo(
      ".navbar-icon",
      { opacity: 0, y: -10, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.3, stagger: 0.05, delay: 0.2 }
    );
  }
});
onMounted(() => {
  const frame = frameRef.value;

  gsap.fromTo(
    ".navbar-icon",
    { rotation: 0 },
    { ease: "steps(10)", rotation: 360, x: 0, duration: 0.4, stagger: 0.3 }
  );
  gsap.fromTo(
    ".navbar-frame",
    { opacity: 0 },
    { opacity: 1, ease: "steps(10)", duration: 0.8 }
  );
  gsap.set(frame, { borderRadius: "40px", width: "40%" });
});
function onEnter() {
  showText.value = true;
  gsap.to(frameRef.value, {
    borderRadius: "0px",
    width: "80%",
    ease: "back.out(1.7)",
    duration: 0.5,
  });
}
function onLeave() {
  showText.value = false;
  gsap.to(frameRef.value, {
    borderRadius: "40px",
    width: "40%",
    ease: "back.out(1.7)",
    duration: 0.5,
  });
}
function onBtnEnter(idx) {
  gsap.to(`.navbar-text-btn-${idx}`, {
    backgroundColor:
      "color-mix(in srgb, var(--color-secondary) 80%, transparent)",
    color: "var( --color-base-100)",
    scale: 1.08,
    boxShadow: "0 2px 8px 0 rgba(0,0,0,0.12)",
    duration: 0,
  });
}
function onBtnLeave(idx) {
  gsap.to(`.navbar-text-btn-${idx}`, {
    backgroundColor: "transparent",
    color: "var( --color-secondary)",
    scale: 1,
    boxShadow: "0 0px 0px 0 rgba(0,0,0,0)",
    duration: 0,
  });
}
</script>

<template>
  <div class="flex justify-center items-center">
    <div
      ref="frameRef"
      class="navbar-frame flex flex-col justify-center items-center w-2/5 rounded-full opacity-0 p-2 mt-2 min-h-14 border-1 border-[var(--color-primary)] shadow-md"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
    >
      <div class="flex w-full items-center justify-center">
        <div v-show="showText" class="w-full flex items-center justify-center">
          <a
            v-for="(item, idx) in menuItems"
            :key="item"
            :class="[
              'navbar-text',
              'geo',
              `navbar-text-btn-${idx}`,
              'flex-1',
              'mx-2',
              'py-1',
              'text-center',
              'text-2xl',
              'rounded-lg',
              'cursor-pointer',
            ]"
            href="#"
            @mouseenter="onBtnEnter(idx)"
            @mouseleave="onBtnLeave(idx)"
            >{{ item }}</a
          >
        </div>
        <div v-show="!showText" class="w-full flex items-center justify-center">
          <Icon
            v-for="icon in icons"
            :key="icon"
            :icon="icon"
            class="navbar-icon flex-1 px-2 text-center text-2xl"
          />
        </div>
      </div>
    </div>
  </div>
</template>
