<script setup lang="ts">
definePageMeta({
  layout: "default",
  noNavbarPadding: true,
});
import { computed } from "vue";
import { useRoute, createError } from "#imports";
import { works } from "~/data/works";
import GalleryLightbox from "~/components/parts/GalleryLightbox.vue";
import { watch } from "vue";

const lightboxOpen = ref(false);
const openLightbox = () => (lightboxOpen.value = true);
const closeLightbox = () => (lightboxOpen.value = false);
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
      class="rounded-t-3xl shadow-2xl px-6 py-12 backdrop-blur-sm max-w-8xl mx-auto"
      :class="videoSrc ? ' border-t-4 border-primary ' : 'mt-10'"
    >
      <!-- 2+3) 圖片(3/4) + 基本資訊(1/4) -->
      <section class="mb-10">
        <div
          @click="openLightbox"
          class="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:items-stretch"
        >
          <!-- 右：文字（桌機等高） -->
          <aside class="lg:col-span-1 order-1 lg:order-2 flex">
            <div
              class="bg-primary/90 shadow-lg shadow-black/10 backdrop-blur-md hover:invert rounded-2xl flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-center gap-2 w-full h-full py-3 px-3"
            >
              <p class="text-lg lg:text-2xl text-secondary/80 silkscreen">
                {{ work!.title }}
              </p>

              <div class="silkscreen text-white">
                {{ work!.year }}
              </div>

              <div
                v-if="work!.medium"
                class="text-gray-900/80 text-sm silkscreen"
              >
                {{ work!.medium }}
              </div>
            </div>
          </aside>

          <!-- 左：圖片（桌機等高） -->
          <div class="lg:col-span-3 order-2 lg:order-1 flex">
            <!-- column 容器 -->
            <div class="flex flex-col w-full h-full">
              <!-- 圖片 -->
              <div class="relative w-full h-[50vh] overflow-hidden rounded-2xl">
                <img
                  v-if="images.length"
                  :src="images[currentIndex]"
                  :alt="work!.title"
                  class="absolute inset-0 w-full h-full object-contain cursor-zoom-in"
                  @click="openLightbox"
                />

                <!-- 放大 -->
                <GalleryLightbox
                  :open="lightboxOpen"
                  :images="images"
                  :index="currentIndex"
                  :alt="work?.title"
                  @close="closeLightbox"
                  @update:index="(v) => (currentIndex = v)"
                />
              </div>

              <!-- 箭頭（固定在圖片下方，不疊） -->
              <div
                v-if="images.length > 1"
                class="silkscreen mt-2 flex items-center justify-center gap-4"
              >
                <button
                  @click="prevImage"
                  class="bg-white text-secondary hover:invert w-12 h-12 flex items-center justify-center rounded-full"
                >
                  ←
                </button>
                <!-- dots 指示 -->
                <div class="flex items-center gap-2">
                  <span
                    v-for="(_, i) in images"
                    :key="i"
                    class="w-2 h-2 rounded-full transition-all"
                    :class="
                      i === currentIndex
                        ? 'bg-secondary scale-125'
                        : 'bg-secondary/40'
                    "
                  />
                </div>
                <button
                  @click="nextImage"
                  class="bg-white text-secondary hover:invert w-12 h-12 flex items-center justify-center rounded-full"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 4) 詳細作品介紹（放在下面） -->
      <section v-if="work!.desc" class="mt-6">
        <hr class="border-0 border-t-2 border-dashed border-pro/80 my-6" />

        <h1 class="text-2xl silkscreen text-secondary text-center mb-4">
          Description
        </h1>
        <p
          class="whitespace-pre-line text-gray-900 border border-primary leading-relaxed min-h-[40vh] backdrop-blur-sm bg-white/85 p-6 rounded-2xl shadow-lg shadow-black/20 newsreader"
        >
          {{ work!.desc }}
        </p>
      </section>

      <!-- clips 區塊照你原本的放這裡 -->
      <section v-if="work!.clips?.length" class="mt-10 p-3 rounded-2xl">
        <h2
          class="silkscreen text-primary mb-4 bg-secondary/75 rounded-lg text-center"
        >
          Video Clips
        </h2>
        <div class="relative">
          <div ref="clipWrap" class="overflow-x-auto">
            <div class="flex gap-4 w-max p-2 rounded-2xl">
              <a
                v-for="(c, i) in work!.clips"
                :key="c.url + i"
                :href="c.url"
                target="_blank"
                class="block w-56 flex-none rounded-2xl"
              >
                <div class="aspect-video w-full overflow-hidde">
                  <img
                    :src="getYoutubeThumb(c.url)"
                    class="w-full h-full object-cover rounded-t-md"
                  />
                </div>
                <div
                  class="text-sm text-secondary/80 newsreader text-center bg-primary rounded-b-md p-1"
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
