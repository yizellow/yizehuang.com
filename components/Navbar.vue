<script setup>
import { gsap } from "gsap";
import { Icon } from "@iconify/vue";

onMounted(() => {
  gsap.fromTo(
    ".navbar-icon",
    { rotation: 0 },
    { ease: "steps(10)", rotation: 360, x: 0, duration: 0.5, stagger: 0.4 }
  );
});
</script>
<template>
  <div class="flex justify-center items-center">
    <div
      class="w-11/12 rounded-sm flex flex-col justify-center items-center p-2 mt-2 min-h-10 md:min-h-14 border-1 border-secondary shadow-md"
    >
      <div class="flex w-full items-center justify-center">
        <a
          class="hover:underline flex-1 px-1 text-center text-xs sm:text-base md:text-lg"
          href="#"
          >HOME</a
        >
        <a
          class="hover:underline flex-1 px-1 text-center text-xs sm:text-base md:text-lg"
          href="#"
          >PROJECTS</a
        >
        <a
          class="hover:underline flex-1 px-1 text-center text-xs sm:text-base md:text-lg"
          href="#"
          >ABOUT</a
        >
        <a
          class="hover:underline flex-1 px-1 text-center text-xs sm:text-base md:text-lg"
          href="#"
          >MEMBER</a
        >
        <a
          class="hover:underline flex-1 px-1 text-center text-xs sm:text-base md:text-lg"
          href="#"
          >DONATE</a
        >
      </div>
    </div>
  </div>

  <div class="flex justify-center items-center">
    <div
      class="w-10/12 md:w-6/10 rounded-full flex flex-col justify-center items-center p-2 mt-2 min-h-8 sm:min-h-14 border-1 border-secondary shadow-md"
    >
      <div class="flex w-full items-center justify-center">
        <Icon
          icon="material-symbols:other-houses"
          class="navbar-icon flex-1 px-2 text-center text-large sm:text-xl"
        />

        <Icon
          icon="material-symbols:background-grid-small-sharp"
          class="navbar-icon flex-1 px-2 text-center text-xl sm:text-2xl"
        />

        <Icon
          icon="material-symbols:ar-stickers-sharp"
          class="navbar-icon flex-1 px-2 text-center text-xl sm:text-2xl"
        />
        <Icon
          icon="material-symbols:person"
          class="navbar-icon flex-1 px-2 text-center text-xl sm:text-2xl"
        />
        <Icon
          icon="material-symbols:coffee-sharp"
          class="navbar-icon flex-1 px-2 text-center text-xl sm:text-2xl"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
