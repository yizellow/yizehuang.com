<script setup lang="ts">
import { computed } from "vue";

type Work = {
  _id: string;
  title?: string;
  slug?: string;
  coverUrl?: string | null;
  imagesUrls?: { url?: string | null }[]; // 你單筆 API 才會有，這裡先容錯
};

const props = defineProps<{ slug: string; intro?: string }>();

// ✅ client-only fetch（避免 SSR 取不到 /api）
const { data } = await useFetch<Work[]>("/api/works", {
  server: false,
  default: () => [],
});

const w = computed(() => (data.value ?? []).find((x) => x.slug === props.slug));
const href = computed(() => `/projects/${props.slug}`);

// ✅ cover：優先 coverUrl，沒有就退到 imagesUrls[0].url
const cover = computed(
  () => w.value?.coverUrl || w.value?.imagesUrls?.[0]?.url || "",
);
</script>

<template>
  <NuxtLink
    v-if="w"
    :to="href"
    class="group my-10 block overflow-hidden rounded-2xl border-2 border-primary bg-white/80 backdrop-blur-sm shadow-lg hover:invert transition"
  >
    <div class="flex flex-col md:flex-row">
      <!-- 左：圖 40% -->
      <div
        class="md:basis-2/5 md:flex-none flex items-center justify-center px-3 md:p-3"
      >
        <div class="w-full overflow-hidden">
          <img
            v-if="cover"
            :src="cover"
            :alt="w.title"
            class="w-full h-full object-contain object-center rounded-2xl"
          />
        </div>
      </div>

      <!-- 右：文 60% -->
      <div
        class="md:basis-3/5 md:flex-none px-4 md:p-3 flex flex-col gap-3 md:justify-center"
      >
        <h3 class="silkscreen text-secondary text-lg lg:text-xl">
          {{ w.title }}
        </h3>
        <p
          v-if="props.intro"
          class="newsreader text-gray-900 leading-relaxed text-base underline decoration-primary"
        >
          {{ props.intro }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
