<script setup>
import { gsap } from "gsap";
import { Icon } from "@iconify/vue";
import { ref, nextTick } from "vue";
import { useRouter } from "vue-router";

// DOM 參照
const menuRef = ref(null);
const navListRef = ref(null);

const navTitles = ref([]);
const menuIconSwitch = ref(true);

// 狀態與鎖
const listShow = ref(false);
const animating = ref(false);

const menuItems = [
  { label: "HOME", to: "/" },
  { label: "PROJECTS", to: "/projects" },
  { label: "ABOUT", to: "/about" },
  // { label: "MEMBER", to: "/member" },
  { label: "DONATE", to: "/donate" },
  { label: "CONTACT", to: "/contact" },
];

const router = useRouter();

function toggleMenuIcon() {
  menuIconSwitch.value = !menuIconSwitch.value;
}

function toggleAnimation() {
  gsap.to(".icon-navbar", {
    rotate: "-=360",
    duration: 0.5,
    ease: "power2.inOut",
  });
  gsap.to(".home", {
    rotationY: "+=360",
    duration: 0.7,
    ease: "power2.inOut",
  });
}

// 切換動畫
async function expandNav() {
  toggleAnimation();
  toggleMenuIcon();

  if (animating.value) return;
  animating.value = true;

  await nextTick();

  // 清除之前的動畫
  gsap.killTweensOf(navListRef.value);
  gsap.killTweensOf(navTitles.value);

  if (!listShow.value) {
    listShow.value = true;

    const tl = gsap.timeline();
    // nav 外框展開動畫
    tl.fromTo(
      navListRef.value,
      {
        transformOrigin: "top center",
        scaleY: 0,
        opacity: 0,
      },
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

    // 項目淡入 + stagger
    if (navTitles.value && navTitles.value.length > 0) {
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
    } else {
      animating.value = false;
    }
  } else {
    // 收起動畫
    const tl = gsap.timeline();
    if (navTitles.value && navTitles.value.length > 0) {
      tl.fromTo(
        navTitles.value,
        { opacity: 1 },
        {
          opacity: 0,
          duration: 0.4,
          stagger: {
            each: 0.01,
            from: "end",
          },
          ease: "power3.out",
        }
      );
      tl.to(
        navListRef.value,
        {
          scaleY: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power3.out",
          onComplete: () => {
            listShow.value = false;
            animating.value = false;
          },
        },
        "<"
      );
    } else {
      listShow.value = false;
      animating.value = false;
    }
  }
}

onMounted(() => {
  gsap.fromTo(
    [".topNav", ".home"],
    {
      opacity: 0,
      y: -60,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.3,
    }
  );
  gsap.to(".icon-navbar", {
    rotate: 360,
    duration: 0.5,
  });
});

router.afterEach(() => {
  if (listShow.value) {
    expandNav();
  }
});
</script>

<template>
  <div class="topNav flex justify-center items-center flex-col opacity-0">
    <!-- 上方主選單 -->
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

    <!-- 下拉選單 -->
    <nav
      v-show="listShow"
      ref="navListRef"
      class="nav-list flex flex-col justify-around items-center w-4/5 mt-2 rounded-2xl border border-[var(--color-secondary)] shadow-md overflow-hidden"
    >
      <NuxtLink
        v-for="(item, index) in menuItems"
        :key="item.label"
        :to="item.to"
        class="flex flex-row w-full justify-around items-center min-h-12 border-b last:border-b-0 cursor-pointer"
      >
        <div
          :ref="
            (el) => {
              if (el) navTitles[index] = el;
            }
          "
          class="flex flex-row w-full justify-around items-center min-h-12 border-b last:border-b-0 cursor-pointer"
        >
          <p class="text-sm newsreader">{{ item.label }}</p>
        </div>
      </NuxtLink>
    </nav>
  </div>
</template>
