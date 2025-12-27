<script setup lang="ts">
const { data: blog } = await useAsyncData("blog", () =>
  queryCollection("content").path("/blog").first()
);

const { data: Seashell } = await useAsyncData(
  "single-in-cuffing-season_en",
  () =>
    queryCollection("content")
      .path("/single-in-cuffing-season/en/a-seashell-and-a-copied-love")
      .first()
);

useSeoMeta({
  title: blog.value?.title,
  description: blog.value?.description,
});
</script>

<template>
  <template>
    <ContentRenderer v-if="blog" :value="blog" />
    <hr />
    <ContentRenderer v-if="Seashell" :value="Seashell" />
  </template>
</template>
