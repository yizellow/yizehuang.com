<script setup>
import Model from "~/components/three.js/Model.vue";

definePageMeta({
  layout: "default",
  noNavbarPadding: false,
});

</script>

<template>
  <div class="relative w-screen h-screen">
    <!-- 背景底層 -->
    <div class="absolute inset-0 z-0 bg-green-900"></div>

    <!-- Model 疊在上面 -->
    <div class="absolute inset-0 z-10">
      <ClientOnly>
        <Model />
      </ClientOnly>
    </div>

    
  </div>
</template>
