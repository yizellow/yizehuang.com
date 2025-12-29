<script setup lang="ts">
import { gsap } from "gsap";
import { Icon } from "@iconify/vue";
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useHashScroll } from "~/composables/useHashScroll";

const router = useRouter();
const route = useRoute();
const { scrollToHash } = useHashScroll();

const frameRef = ref<HTMLElement | null>(null);
const showText = ref(false);

const icons = [
  "material-symbols:other-houses",
  "material-symbols:person",
  "material-symbols:background-grid-small-sharp",
  "material-symbols:article",
  "material-symbols:call-sharp",
];

function goContact() {
  if (route.path === "/") scrollToHash("#contact");
  else router.push({ path: "/", hash: "#contact" });
}

function goCv() {
  if (route.path === "/") scrollToHash("#cv");
  else router.push({ path: "/", hash: "#cv" });
}

watch(showText, (val) => {
  if (val) {
    gsap.to(".navbar-icon", {
      opacity: 0,
      y: -10,
      scale: 0.8,
      duration: 0.3,
      stagger: 0.05,
    });
    gsap.fromTo(
      ".navbar-text",
      { opacity: 0, scale: 1.2 },
      { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, delay: 0.2 }
    );
  } else {
    gsap.to(".navbar-text", {
      opacity: 0,
      scale: 1.2,
      duration: 0.3,
      stagger: 0.05,
    });
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
    { ease: "steps(10)", rotation: 360, duration: 0.4, stagger: 0.3 }
  );
  gsap.fromTo(
    ".navbar-frame",
    { y: -96, opacity: 0 },
    { y: 0, opacity: 1, ease: "power1.out", duration: 0.5 }
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

const onBtnEnter = (el: HTMLElement) => {
  gsap.to(el, {
    backgroundColor:
      "color-mix(in srgb, var(--color-secondary) 80%, transparent)",
    color: "var(--color-base-100)",
    scale: 1.08,
    boxShadow: "0 2px 8px 0 rgba(0,0,0,0.12)",
    duration: 0,
  });
};

const onBtnLeave = (el: HTMLElement) => {
  gsap.to(el, {
    backgroundColor: "transparent",
    color: "var(--color-secondary)",
    scale: 1,
    boxShadow: "0 0px 0px 0 rgba(0,0,0,0)",
    duration: 0,
  });
};

// 解決 TS any 警告 — 型別安全的 hover handlers
const hoverEnter = (evt: MouseEvent) =>
  onBtnEnter(evt.currentTarget as HTMLElement);
const hoverLeave = (evt: MouseEvent) =>
  onBtnLeave(evt.currentTarget as HTMLElement);
</script>

<template>
  <div class="flex justify-center items-center">
    <div
      ref="frameRef"
      class="navbar-frame flex flex-col justify-center items-center w-2/5 rounded-full opacity-0 p-2 mt-2 min-h-14 border-1 border-[var(--color-secondary)] shadow-md"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
    >
      <div class="flex w-full items-center justify-center">
        <div v-show="showText" class="w-full flex items-center justify-center">
          <!-- HOME / ABOUT / PROJECTS -->
          <NuxtLink
            v-for="(item, idx) in [
              { label: 'HOME', to: '/' },
              { label: 'CONTEXT', to: '/context' },
              { label: 'PROJECTS', to: '/projects' },
            ]"
            :key="item.label"
            :to="item.to"
            class="navbar-text silkscreen flex-1 mx-2 py-1 text-center text-lg rounded-lg cursor-pointer"
            @mouseenter="hoverEnter"
            @mouseleave="hoverLeave"
          >
            {{ item.label }}
          </NuxtLink>

          <!-- CV -->
          <template v-if="route.path === '/'">
            <button
              type="button"
              class="navbar-text silkscreen flex-1 mx-2 py-1 text-center text-lg rounded-lg cursor-pointer"
              @mouseenter="hoverEnter"
              @mouseleave="hoverLeave"
              @click="goCv"
            >
              CV
            </button>
          </template>
          <template v-else>
            <NuxtLink
              :to="{ path: '/', hash: '#cv' }"
              class="navbar-text silkscreen flex-1 mx-2 py-1 text-center text-lg rounded-lg cursor-pointer"
              @mouseenter="hoverEnter"
              @mouseleave="hoverLeave"
            >
              CV
            </NuxtLink>
          </template>

          <!-- CONTACT -->
          <template v-if="route.path === '/'">
            <button
              type="button"
              class="navbar-text silkscreen flex-1 mx-2 py-1 text-center text-lg rounded-lg cursor-pointer"
              @mouseenter="hoverEnter"
              @mouseleave="hoverLeave"
              @click="goContact"
            >
              CONTACT
            </button>
          </template>
          <template v-else>
            <NuxtLink
              :to="{ path: '/', hash: '#contact' }"
              class="navbar-text silkscreen flex-1 mx-2 py-1 text-center text-lg rounded-lg cursor-pointer"
              @mouseenter="hoverEnter"
              @mouseleave="hoverLeave"
            >
              CONTACT
            </NuxtLink>
          </template>
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
