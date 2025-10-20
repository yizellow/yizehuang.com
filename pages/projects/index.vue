<script setup>
import Gallery from "~/components/parts/Gallery.vue";

definePageMeta({
  layout: "default",
  noNavbarPadding: false,
});
</script>

<template>
  <client-only>
    <Gallery />
  </client-only>
</template>
