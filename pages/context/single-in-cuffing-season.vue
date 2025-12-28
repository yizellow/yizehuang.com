<script setup lang="ts">
const { data: Seashell } = await useAsyncData(
  "a-seashell-and-a-copied-love",
  () =>
    queryCollection("content")
      .path("/single-in-cuffing-season/en/a-seashell-and-a-copied-love")
      .first()
);

const toc = computed(() => Seashell.value?.body?.toc?.links ?? []);
</script>

<template>
  <main class="prose mx-auto max-w-6xl px-6 py-10">
   
    <div class="grid grid-cols-1 gap-10 lg:grid-cols-12">
      <!-- 左：目錄 1/3 -->
      <aside class="lg:col-span-2">
        <div class="sticky top-24">
          <p class="mb-4 text-sm text-neutral-500">Contents</p>

          <ul class="space-y-2 text-sm">
            <li v-for="item in toc" :key="item.id">
              <a
                :href="`#${item.id}`"
                class="block text-neutral-700 hover:text-black"
              >
                {{ item.text }}
              </a>

              <!-- 子層 -->
              <ul
                v-if="item.children"
                class="mt-1 space-y-1 pl-4 text-xs text-neutral-500"
              >
                <li v-for="child in item.children" :key="child.id">
                  <a :href="`#${child.id}`">
                    {{ child.text }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>

      <!-- 右：文章 2/3 -->
      <article class="lg:col-span-10">
        <ContentRenderer
          :value="Seashell"
          class="prose max-w-none prose-h1:text-red-600 prose-h1:text-5xl prose-h2:text-blue-600 prose-h2:text-4xl prose-h3:text-green-600 prose-h3:text-3xl"
        />
      </article>
    </div>
  </main>
</template>

<style scoped>
prose h1 {
  color: green; /* Adjust based on your header height */
}
p {
  color: blue;
}
</style>
