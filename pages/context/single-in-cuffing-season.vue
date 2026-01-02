<script setup lang="ts">
type TocItem = {
  id: string;
  text: string;
  children?: TocItem[];
};

type Article = {
  path: string;
  title?: string;
  body?: { toc?: { links?: TocItem[] } };
};

const { locale } = useI18n();

/** content 實際 path 前綴 */
const base = computed(() => `/${locale.value}/single-in-cuffing-season`);

/** 文章順序 */
const articleList = [
  { slug: "marriage-as-a-matter-of-course" },
  { slug: "the-one-who-loves-me-and-the-one-i-love-are-not-the-same" },
  { slug: "a-seashell-and-a-copied-love" },
] as const;

const slugs = computed(() => articleList.map((a) => a.slug));
const paths = computed(() => slugs.value.map((s) => `${base.value}/${s}`));

/** 抓文章 */
const { data: articles } = await useAsyncData<Article[]>(
  () => `cuffing-exhibit-${locale.value}`,
  () => queryCollection("content").where("path", "IN", paths.value).all(),
  { watch: [locale] }
);

/** 依 articleList 排回來 */
const orderedArticles = computed<Article[]>(() => {
  const map = new Map((articles.value ?? []).map((a) => [a.path, a]));
  return paths.value
    .map((p) => map.get(p))
    .filter((a): a is Article => Boolean(a));
});

/** TOC 只顯示 h2/h3 */
const toc = computed<TocItem[]>(() =>
  orderedArticles.value.flatMap((a) => a.body?.toc?.links ?? [])
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
        <section v-for="a in orderedArticles" :key="a.path">
          <ContentRenderer
            :value="a"
            class="max-w-none prose prose-neutral [&_h1]:font-silkscreen [&_h1]:text-gray-900 [&_h2_a]:text-gray-700 [&_h2_a]:decoration-primary [&_h2]:font-newsreader [&_h3_a]:text-gray-600 [&_h3_a]:no-underline [&_h3]:font-newsreader [&_p]:text-gray-700 [&_p]:font-newsreader"
          />
        </section>
      </article>
    </div>
  </main>
</template>
