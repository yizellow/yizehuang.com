<script setup lang="ts">
const { locale } = useI18n();

/**
 * 要在同一頁顯示的文章 slug（順序即顯示順序）
 */
const slugs = [
  "a-seashell-and-a-copied-love",
  "the-one-who-loves-me-and-the-one-i-love-are-not-the-same",
];

/**
 * content 實際 path 前綴
 * 必須對應 content/en/... 與 content/zh/...
 */
const base = computed(() => `/${locale.value}/single-in-cuffing-season`);

/**
 * 組出完整 content paths
 */
const paths = computed(() => slugs.map((s) => `${base.value}/${s}`));

/**
 * 一次抓多篇文章（Nuxt Content v3 正確寫法）
 */
const { data: articles } = await useAsyncData(
  () => `cuffing-exhibit-${locale.value}`,
  () => queryCollection("content").where("path", "IN", paths.value).all(),
  { watch: [locale] }
);

/**
 * 合併所有文章的 TOC（共用目錄）
 */
const toc = computed(
  () => articles.value?.flatMap((a) => a.body?.toc?.links ?? []) ?? []
);
</script>

<template>
  <!-- 右下角語言切換 -->
  <LangFab />

  <main class="mx-auto max-w-6xl px-6 py-10">
    <div class="grid grid-cols-1 gap-10 lg:grid-cols-12">
      <!-- 左：共用目錄 -->
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

              <ul
                v-if="item.children"
                class="mt-1 space-y-1 pl-4 text-xs text-neutral-500"
              >
                <li v-for="child in item.children" :key="child.id">
                  <a :href="`#${child.id}`">{{ child.text }}</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>

      <!-- 右：多篇文章 -->
      <article class="lg:col-span-10 space-y-24">
        <ContentRenderer
          v-for="a in articles"
          :key="a.path"
          :value="a"
          class="max-w-none prose prose-neutral [&_h1]:[font-family:var(--font-silkscreen)] [&_h1]:text-gray-900 [&_h2_a]:text-gray-700 [&_h2_a]:decoration-primary [&_h2]:[font-family:var(--font-newsreader)] [&_h3_a]:text-gray-600 [&_h3_a]:no-underline [&_h3]:[font-family:var(--font-newsreader)] [&_p]:text-gray-700 [&_p]:[font-family:var(--font-newsreader)]"
        />
      </article>
    </div>
  </main>
</template>
