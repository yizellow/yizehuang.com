<script setup>
definePageMeta({
  layout: "default",
  noNavbarPadding: false,
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
        class="newsreader border-primary text-secondary text-md leading-relaxed p-4 border-2 rounded-b-sm"
      >
        Each theme is composed of textual narratives, artworks, and a virtual
        exhibition , and will be continuously updated and revised;all updates
        are shown in the last updated date. The virtual exhibition is accessible
        on desktop devices only and does not support mobile devices.
      </p>
    </section>
    <NuxtLink to="/context/single-in-cuffing-season" class="block">
      <section class="flex items-center gap-4 p-4 bg-amber-200/90">
        <!-- 圖片 -->
        <div class="w-16 h-20 flex-shrink-0 overflow-hidden rounded">
          <img
            src="https://cdna.artstation.com/p/assets/images/images/052/484/594/large/yize-huang-0019.jpg?1659929880"
            alt="cover"
            class="w-full h-full object-cover hover:invert"
          />
        </div>

        <!-- 文字區 -->
        <div class="flex flex-col gap-1 w-full">
          <p
            class="silkscreen text-xs lg:text-base font-medium hover:underline"
          >
            Single In Cuffing Season
          </p>

          <div class="flex items-center gap-2">
            <p class="newsreader text-sm text-gray-700 whitespace-nowrap">
              last updated date:
            </p>
            <p class="newsreader text-xs text-gray-700 whitespace-nowrap">
              Dec 20, 2025
            </p>
          </div>
        </div>

        <!-- 例外按鈕 -->
        <a
          href="https://yizellow.itch.io/single-in-cuffing-season"
          target="_blank"
          rel="noopener noreferrer"
          class="silkscreen bg-primary text-[10px] md:text-xs px-1 py-0.5 md:px-3 md:py-1 rounded-full hover:invert lg:whitespace-nowrap"
          @click.stop
        >
          Virtual Exhibition
        </a>
      </section>
    </NuxtLink>
  </main>
</template>
