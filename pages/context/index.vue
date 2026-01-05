<script setup>
definePageMeta({
  layout: "default",
  noNavbarPadding: false,
});

import { ref, onMounted } from "vue";
import gsap from "gsap";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

const introP = ref(null);

onMounted(() => {
  gsap.to(introP.value, {
    duration: 1.2,
    scrambleText: {
      text: "Each theme is composed of textual narratives, artworks, and a virtual exhibition, and will be continuously updated and revised; all updates are shown in the last updated date. The virtual exhibition is accessible on desktop devices only and does not support mobile devices.",
    },
  });
});
</script>

<template>
  <main class="w-5/6 md:max-w-3/5 mx-auto px-4">
    <section class="w-full my-6 md:mt-10 mb-6 rounded-2xl">
      <p
        class="silkscreen w-full text-primary bg-secondary/70 rounded-t-sm flex items-start justify-start px-4 py-2 text-lg"
      >
        Introduction
      </p>

      <p
        ref="introP"
        class="newsreader border-primary text-secondary text-md leading-relaxed p-4 border-2 rounded-b-sm"
      >
        Each theme is composed of textual narratives, artworks, and a virtual
        exhibition, and will be continuously updated and revised; all updates
        are shown in the last updated date.
      </p>
    </section>
    <NuxtLink to="/context/single-in-cuffing-season" class="block">
      <section
        class="flex flex-col lg:flex-row items-center gap-4 p-4 border-b-2 border-primary"
      >
        <!-- 圖片 -->
        <div
          class="w-50 h-30 md:w-80 md:h-60 lg:w-16 lg:h-20 shrink-0 overflow-hidden rounded hover:invert"
        >
          <img
            src="https://cdna.artstation.com/p/assets/images/images/052/484/594/large/yize-huang-0019.jpg?1659929880"
            alt="cover"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- 文字 -->
        <div class="flex flex-col gap-1">
          <p class="silkscreen text-xs lg:text-base font-medium hover:invert">
            Single In Cuffing Season
          </p>

          <div class="flex gap-2 flex-col lg:flex-col">
            <p class="newsreader text-sm text-gray-700 whitespace-nowrap">
              last updated date:
            </p>
            <p class="newsreader text-xs text-gray-700 whitespace-nowrap">
              JAN 06, 2026
            </p>
          </div>
        </div>

        <!-- 按鈕 -->
        <a
          href="https://yizellow.itch.io/single-in-cuffing-season"
          target="_blank"
          rel="noopener noreferrer"
          @click.stop
          class="silkscreen hover:invert bg-secondary/80 text-white text-[10px] md:text-xs px-3 py-1 rounded-full self-center lg:self-auto lg:ml-auto lg:whitespace-nowrap"
        >
          Virtual Exhibition
        </a>
      </section>
    </NuxtLink>
  </main>
</template>
