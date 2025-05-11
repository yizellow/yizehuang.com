<script setup>
import { gsap } from "gsap";
import { Icon } from "@iconify/vue";
import { ref, onMounted } from "vue";

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
</script>

<template>
  <div class="flex justify-center items-center">
    <div
      ref="frameRef"
      class="navbar-frame flex flex-col justify-center items-center p-2 mt-2 min-h-14 border-1 border-secondary shadow-md"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
    >
      <div class="flex w-full items-center justify-center">
        <template v-if="showText">
          <a
            v-for="item in menuItems"
            :key="item"
            class="hover:underline flex-1 px-1 text-center text-xs sm:text-base md:text-lg"
            href="#"
            >{{ item }}</a
          >
        </template>
        <template v-else>
          <Icon
            v-for="icon in icons"
            :key="icon"
            :icon="icon"
            class="navbar-icon flex-1 px-2 text-center text-xl sm:text-2xl"
          />
        </template>
      </div>
    </div>
  </div>

  <!-- <div class="flex justify-center items-center">
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
  </div> -->

  <!-- <div class="flex justify-center items-center">
    <div
      ref="frameRef"
      class="navbar-frame w-10/12 md:w-6/10 rounded-full flex flex-col justify-center items-center p-2 mt-2 min-h-8 sm:min-h-14 border-1 border-secondary shadow-md"
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
  </div> -->
</template>
<style scoped></style>
