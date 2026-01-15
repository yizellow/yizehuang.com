<script setup lang="ts">
import { ref, computed, onMounted, watch, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { works } from "~/data/works";
import TopBanner from "~/components/parts/TopBanner.vue";

const isClient = typeof window !== "undefined";

const container = ref<HTMLElement | null>(null);
const active = ref<"all" | "sics" | "before2025" | "uncategorized">("all");

/** All 專用 endless list */
const allSlides = ref([...works]);
const loadingMore = ref(false);

const loadMoreAll = () => {
  if (loadingMore.value) return;
  loadingMore.value = true;

  allSlides.value = [...allSlides.value, ...works];

  if (isClient) {
    window.requestAnimationFrame(() => {
      loadingMore.value = false;
    });
  } else {
    loadingMore.value = false;
  }
};

/** ===== 分類資料 ===== */
const normalizedWorks = computed(() =>
  works.map((w: any) => ({
    ...w,
    group: w.group ?? "uncategorized", // sics | before2025 | uncategorized
    stage: w.stage, // in-progress | undefined
  }))
);

const sicsMain = computed(() =>
  normalizedWorks.value.filter(
    (w) => w.group === "sics" && w.stage !== "in-progress"
  )
);

const sicsInProgress = computed(() =>
  normalizedWorks.value.filter(
    (w) => w.group === "sics" && w.stage === "in-progress"
  )
);

const before2025Works = computed(() =>
  normalizedWorks.value
    .filter((w) => w.group === "before2025")
    .sort((a, b) => Number(b.year) - Number(a.year))
);

const uncategorizedWorks = computed(() =>
  normalizedWorks.value.filter((w) => w.group === "uncategorized")
);

const filteredWorks = computed(() => {
  if (active.value === "sics") return sicsMain.value;
  if (active.value === "before2025") return before2025Works.value;
  return uncategorizedWorks.value;
});

/** ===== All：分段 stream（每輪都重複標題） ===== */
type StreamItem =
  | { type: "header"; key: string; label: string }
  | { type: "work"; key: string; work: any };

const groupLabel = (g: string) => {
  if (g === "sics") return "sics";
  if (g === "before2025") return "Before 2025";
  if (g === "uncategorized") return "Uncategorized";
  return g;
};

const toSegmentStream = (list: any[], roundKey: string): StreamItem[] => {
  const sicsMainList = list.filter(
    (w) => w.group === "sics" && w.stage !== "in-progress"
  );
  const sicsProgList = list.filter(
    (w) => w.group === "sics" && w.stage === "in-progress"
  );
  const beforeList = list
    .filter((w) => w.group === "before2025")
    .sort((a, b) => Number(b.year) - Number(a.year));
  const uncList = list.filter((w) => w.group === "uncategorized");

  const out: StreamItem[] = [];

  if (sicsMainList.length) {
    out.push({
      type: "header",
      key: `h-sics-${roundKey}`,
      label: groupLabel("sics"),
    });
    sicsMainList.forEach((w, i) =>
      out.push({
        type: "work",
        key: `w-${roundKey}-s-${w.slug}-${i}`,
        work: w,
      })
    );
  }

  if (sicsProgList.length) {
    out.push({
      type: "header",
      key: `h-prog-${roundKey}`,
      label: "IN PROGRESS",
    });
    sicsProgList.forEach((w, i) =>
      out.push({
        type: "work",
        key: `w-${roundKey}-p-${w.slug}-${i}`,
        work: w,
      })
    );
  }

  if (beforeList.length) {
    out.push({
      type: "header",
      key: `h-before-${roundKey}`,
      label: groupLabel("before2025"),
    });
    beforeList.forEach((w, i) =>
      out.push({
        type: "work",
        key: `w-${roundKey}-b-${w.slug}-${i}`,
        work: w,
      })
    );
  }

  if (uncList.length) {
    out.push({
      type: "header",
      key: `h-unc-${roundKey}`,
      label: groupLabel("uncategorized"),
    });
    uncList.forEach((w, i) =>
      out.push({
        type: "work",
        key: `w-${roundKey}-u-${w.slug}-${i}`,
        work: w,
      })
    );
  }

  return out;
};

const allRenderStream = computed<StreamItem[]>(() => {
  const baseLen = works.length || 1;
  const out: StreamItem[] = [];

  for (let start = 0; start < allSlides.value.length; start += baseLen) {
    const chunk = allSlides.value.slice(start, start + baseLen);

    const normalizedChunk = chunk.map((w: any) => ({
      ...w,
      group: w.group ?? "uncategorized",
      stage: w.stage,
    }));

    const roundIndex = Math.floor(start / baseLen);
    out.push(...toSegmentStream(normalizedChunk, `r${roundIndex}`));
  }

  return out;
});

/** ===== endless：scroll 距離底部觸發（比 IntersectionObserver 穩） ===== */
let ticking = false;

const checkNearBottom = () => {
  if (!isClient) return;
  if (active.value !== "all") return;

  const doc = document.documentElement;
  const scrollTop = window.scrollY || doc.scrollTop;
  const viewport = window.innerHeight;
  const full = doc.scrollHeight;

  if (full - (scrollTop + viewport) < 800) {
    loadMoreAll();
  }
};

const onScrollEndless = () => {
  if (!isClient) return;
  if (ticking) return;

  ticking = true;
  window.requestAnimationFrame(() => {
    ticking = false;
    checkNearBottom();
  });
};

/** 切回 All：重置 + 立刻補載一次（頁面不夠高也能自動加） */
watch(
  active,
  (v) => {
    if (v === "all") {
      gsap.set(container.value, { y: 0 });
      allSlides.value = [...works];
      if (isClient) window.requestAnimationFrame(() => checkNearBottom());
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (!isClient) return;

  window.addEventListener("scroll", onScrollEndless, { passive: true });

  // 初始：如果內容太短，先補到可滾
  window.requestAnimationFrame(() => checkNearBottom());
});

onBeforeUnmount(() => {
  if (!isClient) return;

  window.removeEventListener("scroll", onScrollEndless);
});
</script>

<template>
  <TopBanner />

  <!-- Bottom Tabbar -->
  <div
    class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur px-3 py-2 flex justify-center rounded-full shadow-lg"
  >
    <div
      class="inline-flex rounded-full border border-neutral-200 overflow-hidden"
    >
      <button
        class="px-4 py-2 text-sm"
        :class="active === 'all' ? 'bg-primary text-white' : 'text-neutral-700'"
        @click="active = 'all'"
      >
        All
      </button>
      <button
        class="px-4 py-2 text-sm"
        :class="
          active === 'sics' ? 'bg-primary text-white' : 'text-neutral-700'
        "
        @click="active = 'sics'"
      >
        sics
      </button>
      <button
        class="px-4 py-2 text-sm"
        :class="
          active === 'before2025' ? 'bg-primary text-white' : 'text-neutral-700'
        "
        @click="active = 'before2025'"
      >
        Before 2025
      </button>
      <button
        class="px-4 py-2 text-sm"
        :class="
          active === 'uncategorized'
            ? 'bg-primary text-white'
            : 'text-neutral-700'
        "
        @click="active = 'uncategorized'"
      >
        Uncategorized
      </button>
    </div>
  </div>

  <!-- Main -->
  <main
    ref="container"
    class="w-full h-auto flex flex-col items-center p-4 pb-24"
  >
    <div class="w-full max-w-7xl space-y-10 sm:mb-5">
      <section
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-12"
      >
        <!-- ===== ALL（分類標題 + endless）===== -->
        <template v-if="active === 'all'">
          <template v-for="item in allRenderStream" :key="item.key">
            <div v-if="item.type === 'header'" class="col-span-full pt-6">
              <div class="flex items-center gap-3">
                <div class="h-px flex-1 bg-neutral-200"></div>
                <h2
                  class="silkscreen text-secondary/80 text-sm tracking-widest"
                >
                  {{ item.label }}
                </h2>
                <div class="h-px flex-1 bg-neutral-200"></div>
              </div>
            </div>

            <NuxtLink
              v-else
              :to="`/projects/${item.work.slug}`"
              class="flex flex-col justify-center items-center overflow-hidden transition cursor-pointer"
            >
              <div class="relative w-full">
                <img
                  :src="item.work.cover"
                  :alt="item.work.title"
                  class="w-full h-auto object-cover hover:rounded-4xl transition-all duration-150"
                  loading="lazy"
                />
              </div>

              <div
                class="flex justify-between items-center w-full px-1 pt-2 sm:text-base md:text-xs"
              >
                <h3 class="newsreader text-secondary/70">
                  {{ item.work.title }}
                </h3>
                <div class="text-primary silkscreen">{{ item.work.year }}</div>
              </div>
            </NuxtLink>
          </template>
        </template>

        <!-- ===== 非 ALL（單純 grid）===== -->
        <template v-else>
          <NuxtLink
            v-for="(item, index) in filteredWorks"
            :key="item.slug + '-' + index"
            :to="`/projects/${item.slug}`"
            class="flex flex-col justify-center items-center overflow-hidden transition cursor-pointer"
          >
            <div class="relative w-full">
              <img
                :src="item.cover"
                :alt="item.title"
                class="w-full h-auto object-cover hover:rounded-4xl transition-all duration-150"
                loading="lazy"
              />
            </div>

            <div
              class="flex justify-between items-center w-full px-1 pt-2 sm:text-base md:text-xs"
            >
              <h3 class="newsreader text-secondary/70">{{ item.title }}</h3>
              <div class="text-primary silkscreen">{{ item.year }}</div>
            </div>
          </NuxtLink>
        </template>
      </section>

      <!-- loading（可留） -->
      <div
        v-if="active === 'all' && loadingMore"
        class="text-center text-xs text-neutral-400"
      >
        loading...
      </div>
    </div>
  </main>
</template>
