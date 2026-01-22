<script setup lang="ts">
definePageMeta({
  layout: "default",
  noNavbarPadding: false,
});

import {
  ref,
  computed,
  onMounted,
  watch,
  onBeforeUnmount,
  nextTick,
} from "vue";
import gsap from "gsap";
import TopBanner from "~/components/parts/TopBanner.vue";

type Work = {
  _id: string;
  title?: string;
  slug?: string;
  year?: string;
  medium?: string;
  group?: "sics" | "before2025" | "uncategorized" | string;
  stage?: "in-progress";
  coverUrl?: string | null;
};

const { data: worksData } = await useFetch<Work[]>("/api/works", {
  default: () => [],
});

const worksList = computed<Work[]>(() => worksData.value ?? []);
const isClient = typeof window !== "undefined";

const container = ref<HTMLElement | null>(null);
const spacer = ref<HTMLElement | null>(null);

const active = ref<"all" | "sics" | "before2025" | "uncategorized">("all");

/** All 專用 endless list */
const allSlides = ref<Work[]>([]);
const loadingMore = ref(false);

/** ===== smooth scroll（只在 ALL 啟用）===== */
let rafId = 0;
let scrollY = 0;
let currentY = 0;
const ease = 0.1;

let ro: ResizeObserver | null = null;
const TOP_PAD = 96;

let smoothEnabled = false;

/** ===== init gate（避免首次高度未穩）===== */
let viewReady = false;
const afterPaint = () =>
  new Promise<void>((r) =>
    requestAnimationFrame(() => requestAnimationFrame(() => r())),
  );

const syncSpacer = () => {
  if (!isClient) return;
  if (active.value !== "all") return;
  if (!container.value || !spacer.value) return;

  spacer.value.style.paddingTop = `${TOP_PAD}px`;
  spacer.value.style.height = `${container.value.scrollHeight}px`;
};

const update = () => {
  currentY += (scrollY - currentY) * ease;
  if (container.value) gsap.set(container.value, { y: -currentY });
  rafId = requestAnimationFrame(update);
};

const onScrollSmooth = () => {
  scrollY = window.scrollY || 0;
};

const enableAllSmooth = async () => {
  if (!isClient) return;
  if (smoothEnabled) return;
  if (active.value !== "all") return;

  await nextTick();
  if (!container.value) return;

  smoothEnabled = true;

  container.value.style.position = "fixed";
  container.value.style.top = `${TOP_PAD}px`;
  container.value.style.left = "0";
  container.value.style.width = "calc(100vw - (100vw - 100%))";
  container.value.style.willChange = "transform";

  syncSpacer();

  ro?.disconnect();
  ro = new ResizeObserver(() => syncSpacer());
  ro.observe(container.value);

  scrollY = window.scrollY || 0;
  currentY = scrollY;

  window.addEventListener("scroll", onScrollSmooth, { passive: true });

  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(update);
};

const disableAllSmooth = () => {
  if (!isClient) return;

  smoothEnabled = false;

  window.removeEventListener("scroll", onScrollSmooth);
  cancelAnimationFrame(rafId);

  ro?.disconnect();
  ro = null;

  if (container.value) {
    gsap.set(container.value, { y: 0 });
    container.value.style.position = "";
    container.value.style.top = "";
    container.value.style.left = "";
    container.value.style.width = "";
    container.value.style.willChange = "";
  }

  if (spacer.value) {
    spacer.value.style.height = "0px";
    spacer.value.style.paddingTop = "0px";
  }
};

/** load more（記得同步 spacer） */
const loadMoreAll = async () => {
  if (loadingMore.value) return;
  if (!worksList.value.length) return;

  loadingMore.value = true;

  allSlides.value = [...allSlides.value, ...worksList.value];

  await nextTick();
  await afterPaint();
  syncSpacer();

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
  worksList.value.map((w) => ({
    ...w,
    group: (w.group ?? "uncategorized") as Work["group"],
    stage: w.stage as "in-progress" | undefined,
  })),
);

/** ===== stage 拆分 ===== */
const splitStage = (list: Work[]) => {
  const main = list.filter((w) => w.stage !== "in-progress");
  const prog = list.filter((w) => w.stage === "in-progress");
  return { main, prog };
};

/** ===== stream item ===== */
type StreamItem =
  | { type: "header"; key: string; label: string; kind: "group" | "progress" }
  | { type: "work"; key: string; work: Work };

const groupLabel = (g: string) => {
  if (g === "sics") return "Single in Cuffing Season";
  if (g === "before2025") return "Before 2025";
  if (g === "uncategorized") return "Uncategorized";
  return g;
};

/** ===== ALL：每個主題都支援 IN PROGRESS ===== */
const toSegmentStream = (list: Work[], roundKey: string): StreamItem[] => {
  const byGroup = (g: string) =>
    list.filter((w) => (w.group ?? "uncategorized") === g);

  const groups: Array<{ g: string; sort?: (a: Work, b: Work) => number }> = [
    { g: "sics" },
    { g: "before2025", sort: (a, b) => Number(b.year) - Number(a.year) },
    { g: "uncategorized" },
  ];

  const out: StreamItem[] = [];

  groups.forEach(({ g, sort }) => {
    let items = byGroup(g);
    if (sort) items = [...items].sort(sort);

    const { main, prog } = splitStage(items);
    if (!main.length && !prog.length) return;

    out.push({
      type: "header",
      key: `h-${g}-${roundKey}`,
      label: groupLabel(g),
      kind: "group",
    });

    main.forEach((w, i) =>
      out.push({
        type: "work",
        key: `w-${roundKey}-${g}-m-${w._id ?? w.slug ?? i}`,
        work: w,
      }),
    );

    if (prog.length) {
      out.push({
        type: "header",
        key: `h-${g}-prog-${roundKey}`,
        label: "IN PROGRESS",
        kind: "progress",
      });

      prog.forEach((w, i) =>
        out.push({
          type: "work",
          key: `w-${roundKey}-${g}-p-${w._id ?? w.slug ?? i}`,
          work: w,
        }),
      );
    }
  });

  return out;
};

const allRenderStream = computed<StreamItem[]>(() => {
  const baseLen = worksList.value.length || 1;
  const out: StreamItem[] = [];

  for (let start = 0; start < allSlides.value.length; start += baseLen) {
    const chunk = allSlides.value.slice(start, start + baseLen);
    const roundIndex = Math.floor(start / baseLen);
    out.push(...toSegmentStream(chunk, `r${roundIndex}`));
  }

  return out;
});

/** ===== 非 ALL：同樣支援 IN PROGRESS ===== */
const tabRenderStream = computed<StreamItem[]>(() => {
  if (active.value === "all") return [];

  let list = normalizedWorks.value.filter((w) => w.group === active.value);

  if (active.value === "before2025") {
    list = [...list].sort((a, b) => Number(b.year) - Number(a.year));
  }

  const { main, prog } = splitStage(list as Work[]);
  const out: StreamItem[] = [];

  main.forEach((w, i) =>
    out.push({ type: "work", key: `t-m-${w._id ?? w.slug ?? i}`, work: w }),
  );

  if (prog.length) {
    out.push({
      type: "header",
      key: "t-prog",
      label: "IN PROGRESS",
      kind: "progress",
    });

    prog.forEach((w, i) =>
      out.push({ type: "work", key: `t-p-${w._id ?? w.slug ?? i}`, work: w }),
    );
  }

  return out;
});

/** ===== endless：接近底部就 loadMore ===== */
let ticking = false;

const checkNearBottom = () => {
  if (!isClient) return;
  if (!viewReady) return;
  if (active.value !== "all") return;

  const doc = document.documentElement;
  const scrollTop = window.scrollY || doc.scrollTop;
  const viewport = window.innerHeight;
  const full = doc.scrollHeight;

  if (full - (scrollTop + viewport) < 800) loadMoreAll();
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

/** ===== ALL 初始化（等高度穩再開 smooth / endless）===== */
const initAll = async () => {
  if (!isClient) return;
  if (!worksList.value.length) return;

  viewReady = false;

  disableAllSmooth();

  allSlides.value = [...worksList.value];

  await nextTick();
  await afterPaint();
  syncSpacer();

  await nextTick();
  await enableAllSmooth();

  viewReady = true;
  window.requestAnimationFrame(() => checkNearBottom());
};

/** 初始化：資料到齊後，若在 ALL 就 initAll */
watch(
  worksList,
  async (list) => {
    if (!list.length) return;
    if (active.value === "all") await initAll();
  },
  { immediate: true, flush: "post" },
);

/** tab 切換：先關閉 smooth，再決定是否 initAll */
watch(
  active,
  async (v) => {
    if (!isClient) return;

    viewReady = false;
    disableAllSmooth();
    await nextTick();

    if (v === "all") {
      await initAll();
    }
  },
  { immediate: true, flush: "post" },
);

onMounted(() => {
  if (!isClient) return;
  window.addEventListener("scroll", onScrollEndless, { passive: true });
  window.requestAnimationFrame(() => checkNearBottom());
});

onBeforeUnmount(() => {
  if (!isClient) return;
  window.removeEventListener("scroll", onScrollEndless);
  disableAllSmooth();
});
</script>

<template>
  <TopBanner />
  <!-- ✅ spacer 只在 ALL 存在，避免其他分頁巨大空格 -->
  <div v-if="active === 'all'" ref="spacer" aria-hidden="true"></div>

  <!-- Bottom Tabbar -->
  <div
    class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur px-3 py-2 flex justify-center rounded-full shadow-lg"
  >
    <div
      class="inline-flex rounded-full border border-neutral-200 overflow-hidden"
    >
      <button
        class="px-4 py-2 text-xs silkscreen"
        :class="active === 'all' ? 'bg-primary text-white' : 'text-neutral-700'"
        @click="active = 'all'"
      >
        All
      </button>
      <button
        class="px-4 py-2 text-xs silkscreen"
        :class="
          active === 'sics' ? 'bg-primary text-white' : 'text-neutral-700'
        "
        @click="active = 'sics'"
      >
        Single in Cuffing Season
      </button>
      <button
        class="px-4 py-2 text-xs silkscreen"
        :class="
          active === 'before2025' ? 'bg-primary text-white' : 'text-neutral-700'
        "
        @click="active = 'before2025'"
      >
        Before 2025
      </button>
      <!-- <button
        class="px-4 py-2 text-xs silkscreen"
        :class="
          active === 'uncategorized'
            ? 'bg-primary text-white'
            : 'text-neutral-700'
        "
        @click="active = 'uncategorized'"
      >
        Uncategorized
      </button> -->
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
        <!-- ===== ALL ===== -->
        <template v-if="active === 'all'">
          <template v-for="item in allRenderStream" :key="item.key">
            <div v-if="item.type === 'header'" class="col-span-full pt-6">
              <div v-if="item.kind === 'group'" class="flex items-center gap-3">
                <div class="h-px flex-1 bg-primary"></div>
                <h2
                  class="silkscreen text-secondary/80 text-sm tracking-widest"
                >
                  {{ item.label }}
                </h2>
                <div class="h-px flex-1 bg-primary"></div>
              </div>

              <div v-else class="flex items-center gap-2">
                <div class="h-1 w-6 bg-primary"></div>
                <h3 class="silkscreen text-primary text-xs tracking-[1em]">
                  {{ item.label }}
                </h3>
              </div>
            </div>

            <NuxtLink
              v-else
              :to="`/projects/${item.work.slug}`"
              class="flex flex-col justify-center items-center overflow-hidden transition cursor-pointer"
            >
              <div class="relative w-full">
                <img
                  v-if="item.work.coverUrl"
                  :src="item.work.coverUrl"
                  :alt="item.work.title"
                  class="w-full h-auto object-cover hover:rounded-4xl transition-all duration-150"
                  loading="lazy"
                  @load="syncSpacer()"
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

        <!-- ===== 非 ALL ===== -->
        <template v-else>
          <template v-for="item in tabRenderStream" :key="item.key">
            <div v-if="item.type === 'header'" class="col-span-full pt-6">
              <div class="flex items-center gap-2">
                <div class="h-1 w-6 bg-primary"></div>
                <h3 class="silkscreen text-primary text-xs tracking-[1em]">
                  {{ item.label }}
                </h3>
              </div>
            </div>

            <NuxtLink
              v-else
              :to="`/projects/${item.work.slug}`"
              class="flex flex-col justify-center items-center overflow-hidden transition cursor-pointer"
            >
              <div class="relative w-full">
                <img
                  v-if="item.work.coverUrl"
                  :src="item.work.coverUrl"
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
      </section>

      <div
        v-if="active === 'all' && loadingMore"
        class="text-center text-xs text-neutral-400"
      >
        loading...
      </div>
    </div>
  </main>
</template>
