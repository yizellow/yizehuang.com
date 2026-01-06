<script setup lang="ts">
const props = defineProps<{
  src: string;
  alt?: string;
  caption?: string;
  maxWidthClass?: string; // 可選：例如 "max-w-md" / "max-w-2xl"
  underline?: boolean; // caption 是否底線
}>();
</script>

<template>
  <figure class="my-10 p-10 flex flex-col items-center text-center">
    <img
      :src="props.src"
      :alt="props.alt ?? ''"
      class="w-3/5"
      :class="props.maxWidthClass ?? ''"
    />

    <figcaption
      v-if="props.caption"
      class="mt-3 text-sm text-gray-700"
      :class="props.underline ? 'underline decoration-gray-700' : ''"
    >
      {{ props.caption }}
    </figcaption>
  </figure>
</template>
