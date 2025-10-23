<script setup lang="ts">
import { gsap } from "gsap";
import { Icon } from "@iconify/vue";
import { ref, nextTick, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useHashScroll } from "~/composables/useHashScroll";

const router = useRouter();
const route = useRoute();
const { scrollToHash } = useHashScroll();

const menuRef = ref<HTMLElement | null>(null);
const navListRef = ref<HTMLElement | null>(null);
const navTitles = ref<HTMLElement[]>([]);
const menuIconSwitch = ref(true);
const listShow = ref(false);
const animating = ref(false);

const menuItems = [
  { label: "HOME", to: "/", action: "push" },
  { label: "PROJECTS", to: "/projects", action: "push" },
  { label: "ABOUT", to: "/about", action: "push" },
  { label: "CV", to: { path: "/", hash: "#cv" }, action: "scrollCv" },
  {
    label: "CONTACT",
    to: { path: "/", hash: "#contact" },
    action: "scrollContact",
  },
];

async function onItemClick(item: (typeof menuItems)[number]) {
  if (listShow.value) await expandNav();
  await nextTick();

  if (item.action === "scrollCv") {
    if (route.path === "/") scrollToHash("#cv");
    else router.push(item.to as any);
    return;
  }
  if (item.action === "scrollContact") {
    if (route.path === "/") scrollToHash("#contact");
    else router.push(item.to as any);
    return;
  }
  router.push(item.to as any);
}

function toggleMenuIcon() {
  menuIconSwitch.value = !menuIconSwitch.value;
}

// 不累加旋轉：用 timeline 的 to().set()，結束清 transform
function toggleAnimation() {
  const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
  tl.to(".icon-navbar", { rotation: 360, duration: 0.45 }).set(".icon-navbar", {
    clearProps: "transform",
  });
  tl.to(".home", { rotationY: 360, duration: 0.6 }, 0).set(
    ".home",
    { clearProps: "transform" },
    ">"
  ); // 同步開始
}

async function expandNav() {
  toggleAnimation();
  toggleMenuIcon();
  if (animating.value) return;
  animating.value = true;

  await nextTick();
  gsap.killTweensOf(navListRef.value);
  gsap.killTweensOf(navTitles.value);

  if (!listShow.value) {
    listShow.value = true;
    const tl = gsap.timeline();
    tl.fromTo(
      navListRef.value,
      { transformOrigin: "top center", scaleY: 0, opacity: 0 },
      {
        scaleY: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power3.inOut",
        onComplete: () => {
          animating.value = false;
        },
      }
    );
    if (navTitles.value.length) {
      tl.fromTo(
        navTitles.value,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.1,
          stagger: 0.03,
          ease: "power4.in",
          onComplete: () => {
            animating.value = false;
          },
        },
        "-=0.07"
      );
    }
  } else {
    const tl = gsap.timeline();
    if (navTitles.value.length) {
      tl.fromTo(
        navTitles.value,
        { opacity: 1 },
        {
          opacity: 0,
          duration: 0.4,
          stagger: { each: 0.01, from: "end" },
          ease: "power3.out",
        }
      )
        .to(
          navListRef.value,
          { scaleY: 0, opacity: 0, duration: 0.4, ease: "power3.out" },
          "<"
        )
        .add(() => {
          listShow.value = false;
          animating.value = false;
          gsap.set(navListRef.value, { clearProps: "transform" });
        });
    } else {
      listShow.value = false;
      animating.value = false;
      gsap.set(navListRef.value, { clearProps: "transform" });
    }
  }
}

onMounted(() => {
  gsap.fromTo(
    [".topNav", ".home"],
    { opacity: 0, y: -60 },
    { opacity: 1, y: 0, duration: 0.3 }
  );
  gsap
    .to(".icon-navbar", { rotation: 360, duration: 0.5 })
    .then(() => gsap.set(".icon-navbar", { clearProps: "transform" }));
});

router.afterEach(() => {
  if (listShow.value) expandNav();
});
</script>

<template>
  <div class="topNav flex justify-center items-center flex-col opacity-0">
    <!-- 上方主選單（icon 區塊保持原樣） -->
    <nav
      class="flex flex-row justify-between items-center w-4/5 px-6 mt-2 min-h-12 rounded-full border border-[var(--color-secondary)] shadow-md"
    >
      <div>
        <NuxtLink to="/">
          <Icon icon="material-symbols:other-houses" class="home text-2xl" />
        </NuxtLink>
      </div>

      <div
        ref="menuRef"
        @click="expandNav"
        class="flex flex-row items-center cursor-pointer"
      >
        <p class="mr-2 silkscreen text-xl">MENU</p>
        <Icon
          v-show="menuIconSwitch"
          icon="material-symbols:menu-rounded"
          class="icon-navbar text-2xl"
        />
        <Icon
          v-show="!menuIconSwitch"
          icon="gridicons:cross"
          class="icon-navbar text-2xl"
        />
      </div>
    </nav>

    <!-- 下拉選單：同頁 CV/CONTACT 用 button（避免瞬跳），其餘維持 NuxtLink -->
    <nav
      v-show="listShow"
      ref="navListRef"
      class="nav-list flex flex-col justify-around items-center w-4/5 mt-2 rounded-2xl border border-[var(--color-secondary)] shadow-md overflow-hidden"
    >
      <template v-for="(item, index) in menuItems" :key="item.label">
        <button
          v-if="
            route.path === '/' &&
            (item.action === 'scrollCv' || item.action === 'scrollContact')
          "
          type="button"
          class="flex flex-row w-full justify-around items-center min-h-12 border-b last:border-b-0 cursor-pointer"
          @click.prevent="onItemClick(item)"
        >
          <div
            :ref="(el:any) => { if (el) navTitles[index] = el }"
            class="flex flex-row w-full justify-around items-center min-h-12"
          >
            <p class="text-sm newsreader">{{ item.label }}</p>
          </div>
        </button>

        <NuxtLink
          v-else
          :to="item.to"
          class="flex flex-row w-full justify-around items-center min-h-12 border-b last:border-b-0 cursor-pointer"
          @click.prevent="onItemClick(item)"
        >
          <div
            :ref="(el:any) => { if (el) navTitles[index] = el }"
            class="flex flex-row w-full justify-around items-center min-h-12"
          >
            <p class="text-sm newsreader">{{ item.label }}</p>
          </div>
        </NuxtLink>
      </template>
    </nav>
  </div>
</template>

<style scoped>
.topNav {
  perspective: 1000px;
}
.icon-navbar,
.home {
  backface-visibility: hidden;
  will-change: transform;
}
</style>
