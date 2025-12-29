<!-- components/LangFab.vue -->
<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath();
const { locale } = useI18n();
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50 flex items-center gap-2">
    <NuxtLink
      :to="switchLocalePath('en')"
      class="rounded-full border px-3 py-2 text-xs backdrop-blur"
      :class="
        locale === 'en'
          ? 'bg-secondary/40 text-primary'
          : 'bg-white text-primary'
      "
    >
      EN
    </NuxtLink>

    <NuxtLink
      :to="switchLocalePath('zh')"
      class="rounded-full border px-3 py-2 text-xs backdrop-blur"
      :class="
        locale === 'zh'
          ? 'bg-secondary/40 text-primary'
          : 'bg-white text-primary'
      "
    >
      中文
    </NuxtLink>
  </div>
</template>
