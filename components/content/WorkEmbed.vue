<script setup lang="ts">
import { computed } from "vue";
import { works } from "~/data/works";

const props = defineProps<{ slug: string; intro?: string }>();

const w = computed(() => works.find((x) => x.slug === props.slug));
const href = computed(() => `/projects/${props.slug}`);
const cover = computed(() => w.value?.cover || w.value?.images?.[0] || "");
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
        class="md:basis-3/5 md:flex-none px-2 md:p-3 flex flex-col gap-3 md:justify-center"
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
