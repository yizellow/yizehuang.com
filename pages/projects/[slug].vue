<script setup lang="ts">
definePageMeta({
  layout: "default",
  noNavbarPadding: true,
});
import { computed } from "vue";
import { useRoute, createError } from "#imports";
import { works } from "~/data/works";

const route = useRoute();
const slug = computed(() => String(route.params.slug));
const work = computed(() => works.find((w) => w.slug === slug.value));
const ytId = computed(() => work.value?.video?.split("/embed/")[1] ?? "");
const videoSrc = computed(() =>
  work.value?.video
    ? `${work.value.video}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ytId.value}&modestbranding=1&rel=0&playsinline=1`
    : ""
);
if (!work.value) {
  throw createError({ statusCode: 404, statusMessage: "Not Found" });
}
const getYoutubeThumb = (url: string) => {
  const id = url.includes("youtu.be/")
    ? url.split("youtu.be/")[1]?.split("?")[0]
    : url.includes("watch?v=")
      ? url.split("watch?v=")[1]?.split("&")[0]
      : url.includes("/embed/")
        ? url.split("/embed/")[1]?.split("?")[0]
        : "";

  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
};
const clipWrap = ref<HTMLElement | null>(null);

const heroImage = computed(() => work.value?.images?.[0] || work.value?.cover);
const images = computed(() =>
  work.value?.images?.length
    ? work.value.images
    : heroImage.value
      ? [heroImage.value]
      : []
);

const currentIndex = ref(0);

const prevImage = () => {
  if (!images.value.length) return;
  currentIndex.value =
    (currentIndex.value - 1 + images.value.length) % images.value.length;
};

const nextImage = () => {
  if (!images.value.length) return;
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
};
</script>
<template>
  <!-- 1) 影片固定在最上層（背景） -->
  <section
    v-if="videoSrc"
    class="fixed top-0 left-0 w-full h-[100vh] z-0 overflow-hidden"
  >
    <iframe
      :src="videoSrc"
      class="absolute inset-0 w-full h-full pointer-events-none"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen
    ></iframe>
  </section>

  <!-- 下面內容往上滑，會遮住影片 -->
  <main class="relative w-full z-10" :class="videoSrc ? 'pt-[100vh]' : 'pt-0'">
    <!-- 這一層做成卡片感（可選） -->

    <div
      class="bg-white rounded-t-3xl shadow-2xl px-6 py-12"
      :class="videoSrc ? ' border-t-2 border-primary ' : 'mt-10'"
    >
      <!-- 2) 圖片 -->
      <section class="mb-10">
        <h1 class="text-4xl silkscreen mb-2 px-3">{{ work!.title }}</h1>

        <!-- 圖片 -->
        <div
          class="relative w-full h-[50vh] bg-black/5 overflow-hidden rounded-2xl"
        >
          <img
            v-if="images.length"
            :src="images[currentIndex]"
            :alt="work!.title"
            class="absolute inset-0 w-full h-full object-contain"
          />
        </div>

        <!-- 箭頭控制列（圖片下方） -->
        <div
          v-if="images.length > 1"
          class="silkscreen mt-1 md:mt-4 flex items-center justify-center px-4"
        >
          <button
            @click="prevImage"
            class="silkscreen bg-white text-secondary hover:invert w-15 h-12 flex items-center justify-center rounded-full"
          >
            ←
          </button>

          <button
            @click="nextImage"
            class="bg-white text-secondary hover:invert w-15 h-12 flex items-center justify-center rounded-full"
          >
            →
          </button>
        </div>
      </section>

      <!-- 3) 文字 -->
      <section class="w-full min-h-[40vh]">
        <div class="flex items-end justify-between gap-4">
          <div class="silkscreen text-primary">{{ work!.year }}</div>
        </div>

        <div v-if="work!.medium" class="mt-3 text-secondary/70">
          {{ work!.medium }}
        </div>

        <p v-if="work!.desc" class="mt-5 text-secondary/70 leading-relaxed">
          {{ work!.desc }}
        </p>
      </section>

      <!-- clips 區塊照你原本的放這裡 -->
      <section
        v-if="work!.clips?.length"
        class="mt-10 p-3 rounded-2xl bg-primary/90 shadow-lg shadow-secondary/80"
      >
        <h2
          class="silkscreen text-primary mb-4 bg-secondary rounded-lg text-center border"
        >
          Video Clips
        </h2>
        <div class="relative">
          <div ref="clipWrap" class="overflow-x-auto">
            <div class="flex gap-4 w-max bg-secondary p-2 rounded-2xl">
              <a
                v-for="(c, i) in work!.clips"
                :key="c.url + i"
                :href="c.url"
                target="_blank"
                class="block w-56 flex-none rounded-2xl border border-primary/80 p-3"
              >
                <div class="aspect-video w-full overflow-hidde">
                  <img
                    :src="getYoutubeThumb(c.url)"
                    class="w-full h-full object-cover rounded-t-md"
                  />
                </div>
                <div
                  class="text-sm text-secondary newsreader text-center bg-white rounded-b-md p-1"
                >
                  {{ c.title ?? "Video" }}
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
