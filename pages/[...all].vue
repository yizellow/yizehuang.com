<template>
  <NuxtLink to="/">
    <main
      class="py-22 w-full h-screen bg-primary flex flex-col items-center justify-center"
    >
      <p
        class="text-[30vw] font-bold rounded-4xl bg-white mb-2 silkscreen hover:invert"
      >
        404
      </p>
      <p class="mb-4 silkscreen text-3xl text-white hover:invert">
        Page not found
      </p>

      <NuxtLink
        to="/"
        class="px-10 bg-secondary silkscreen w-3/4 h-[5vh] border-2 rounded-4xl hover:invert text-white flex justify-center items-center"
      >
        Back to home
      </NuxtLink>
    </main>
  </NuxtLink>
</template>
<script setup>
definePageMeta({
  layout: "default",
  noNavbarPadding: true,
});
</script>
