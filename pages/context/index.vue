<script setup>
definePageMeta({
  layout: "default",
  noNavbarPadding: true,
});
</script>

<template>
  <main class="w-full bg-primary p-2 pt-12 min-h-screen">
    <main class="w-5/6 md:max-w-2/5 mx-auto px-4">
      <section class="w-full my-6 rounded-2xl">
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
          are shown in the last updated date. The virtual exhibition is
          accessible on desktop devices only and does not support mobile
          devices.
        </p>
      </section>

      <section class="flex items-center gap-4 p-4 bg-white">
        <!-- 圖片（永遠在左） -->
        <div class="w-16 h-20 bg-gray-300 flex-shrink-0"></div>

        <!-- 文字區 -->
        <div
          class="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-6 w-full"
        >
          <!-- 書名 -->
          <a
            href="/text/single-in-cuffing-season"
            class="silkscreen lg:flex-1 text-md font-medium hover:underline"
          >
            Single In Cuffing Season
          </a>

          <!-- 上次修改 -->
          <p class="text-xs text-gray-500 whitespace-nowrap">上次修改日期</p>

          <!-- 日期 -->
          <p class="text-xs text-gray-700 whitespace-nowrap">
            2024 年 6 月 20 日
          </p>
        </div>
      </section>
    </main>
  </main>
</template>
