<script setup lang="ts">
const { data: home } = await useAsyncData(() =>
  queryCollection("content").path("/").first()
);

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description,
});
</script>
<template>
  <main>
    <p>ssword</p>
    <ContentDoc path="/text/home" />
  </main>
</template>
