<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from "vue";

/* props / emits */
const props = defineProps<{
  open: boolean;
  images: string[];
  index: number;
  alt?: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "update:index", value: number): void;
}>();

/* state */
const hasMany = computed(() => (props.images?.length ?? 0) > 1);

const safeIndex = computed(() => {
  const len = props.images?.length ?? 0;
  if (!len) return 0;
  return Math.min(Math.max(props.index, 0), len - 1);
});

const currentSrc = computed(() => props.images?.[safeIndex.value] ?? "");

/* navigation */
const prev = () => {
  const len = props.images.length;
  if (!len) return;
  emit("update:index", (safeIndex.value - 1 + len) % len);
};

const next = () => {
  const len = props.images.length;
  if (!len) return;
  emit("update:index", (safeIndex.value + 1) % len);
};

const close = () => emit("close");

/* keyboard */
const onKeydown = (e: KeyboardEvent) => {
  if (!props.open) return;
  if (e.key === "Escape") close();
  if (e.key === "ArrowLeft") prev();
  if (e.key === "ArrowRight") next();
};

/* scroll lock (client only) */
const prevOverflow = ref("");

const lockScroll = () => {
  if (!import.meta.client || !document?.body) return;
  prevOverflow.value = document.body.style.overflow || "";
  document.body.style.overflow = "hidden";
};

const unlockScroll = () => {
  if (!import.meta.client || !document?.body) return;
  document.body.style.overflow = prevOverflow.value || "";
};

/* lifecycle */
onMounted(() => {
  window.addEventListener("keydown", onKeydown);

  watch(
    () => props.open,
    (v) => {
      if (v) lockScroll();
      else unlockScroll();
    },
    { immediate: true }
  );
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  unlockScroll();
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm"
      @click.self="close"
    >
      <!-- close -->
      <button
        class="absolute top-4 right-4 w-12 h-12 rounded-full bg-white text-secondary hover:invert flex items-center justify-center silkscreen"
        @click="close"
      >
        ✕
      </button>

      <!-- image -->
      <div class="w-full h-full flex items-center justify-center p-4">
        <img
          v-if="currentSrc"
          :src="currentSrc"
          :alt="alt ?? 'image'"
          class="max-w-[92vw] max-h-[88vh] object-contain select-none"
          draggable="false"
        />
      </div>

      <!-- nav -->
      <div
        v-if="hasMany"
        class="absolute inset-x-0 bottom-6 flex items-center justify-center gap-4 silkscreen"
      >
        <button
          class="bg-white text-secondary hover:invert w-12 h-12 rounded-full"
          @click="prev"
        >
          ←
        </button>

        <div class="text-white text-sm">
          {{ safeIndex + 1 }} / {{ images.length }}
        </div>

        <button
          class="bg-white text-secondary hover:invert w-12 h-12 rounded-full"
          @click="next"
        >
          →
        </button>
      </div>
    </div>
  </Teleport>
</template>
