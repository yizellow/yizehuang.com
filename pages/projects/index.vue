<script setup>
import Carousel3D from "~/components/global/Carousel3DCarousel3D.vue";

definePageMeta({
  layout: "default",
  noNavbarPadding: false,
});
</script>

<template>
  <Carousel3D
    :items="[
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.doggy-lab.com%2Fblog%2Fpuppy-socialization&psig=AOvVaw1srM3vwrAZCNcgZpj8_9-T&ust=1751448349088000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPj5_tarm44DFQAAAAAdAAAAABAE',
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.doggy-lab.com%2Fblog%2Fpuppy-socialization&psig=AOvVaw1srM3vwrAZCNcgZpj8_9-T&ust=1751448349088000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPj5_tarm44DFQAAAAAdAAAAABAE',
    ]"
  />
</template>
