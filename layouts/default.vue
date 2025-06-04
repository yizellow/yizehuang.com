<template>
  <div>
    <nav class="fixed top-0 left-0 w-full z-40">
      <ClientOnly>
        <NavbarDesktop v-if="!isMobile" />
        <NavbarMobile v-else />
      </ClientOnly>
    </nav>

    <div
      :style="
        !noNavbarPadding ? { paddingTop: isMobile ? '56px' : '64px' } : {}
      "
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { BREAKPOINTS } from "@/utils/breakpoints";
import { useRoute } from "vue-router";

const isMobile = ref(false);
const route = useRoute();

function checkIsMobile() {
  const width = window.innerWidth;
  if (width <= BREAKPOINTS.mobile) {
    isMobile.value = true;
  } else if (width <= BREAKPOINTS.tablet) {
    isMobile.value = false;
  } else {
    isMobile.value = false;
  }
}

onMounted(() => {
  checkIsMobile();
  window.addEventListener("resize", checkIsMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkIsMobile);
});

// 這裡用 computed 取得 meta
const noNavbarPadding = computed(() => route.meta?.noNavbarPadding === true);
</script>
