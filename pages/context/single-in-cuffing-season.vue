<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath();
const { locale } = useI18n();

const slug = "a-seashell-and-a-copied-love";

const contentPath = computed(
  () => `/${locale.value}/single-in-cuffing-season/${slug}`
);

const { data: Seashell } = await useAsyncData(
  () => `seashell-${locale.value}-${slug}`,
  () => queryCollection("content").path(contentPath.value).first(),
  { watch: [locale] }
);

const toc = computed(() => Seashell.value?.body?.toc?.links ?? []);
</script>
<template>
  <LangFab />

  <main class="mx-auto max-w-6xl px-6 py-10">
    <div class="grid grid-cols-1 gap-10 lg:grid-cols-12">
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

      <article class="lg:col-span-10">
        <ContentRenderer
          v-if="Seashell"
          :value="Seashell"
          class="max-w-none prose prose-neutral [&_h1]:[font-family:var(--font-silkscreen)] [&_h1]:text-gray-900 [&_h2_a]:text-gray-700 [&_h2_a]:decoration-primary [&_h2]:[font-family:var(--font-newsreader)] [&_h3_a]:text-gray-600 [&_h3_a]:no-underline [&_h3]:[font-family:var(--font-newsreader)] [&_p]:text-gray-700 [&_p]:[font-family:var(--font-newsreader)]"
        />
      </article>
    </div>
  </main>
</template>
