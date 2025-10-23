<script setup>
import Gallery from "~/components/parts/Gallery.vue";
import { ref, onMounted } from "vue";

definePageMeta({
  layout: "default",
  noNavbarPadding: false,
});

// ✅ 你的圖片資料
const slides = [
  {
    img: "https://cdna.artstation.com/p/assets/images/images/082/633/124/large/yize-huang-2024-12-06-9-01-23.jpg?1733490357",
    caption: "CHIPS",
  },
  {
    img: "https://cdnb.artstation.com/p/assets/images/images/052/116/789/large/yize-huang-plastic-wrap-protection-laocoon-and-his-sons.jpg?1658985491",
    caption: "3D modeling",
  },
  {
    img: "https://cdnb.artstation.com/p/assets/images/images/082/626/611/large/yize-huang-j4.jpg?1733473161",
    caption: "Yizellow",
  },
  {
    img: "https://cdna.artstation.com/p/assets/images/images/082/332/470/large/yize-huang-2024-11-27-5-48-00.jpg?1732701058",
    caption: "Travel and my film camera",
  },
  {
    img: "https://cdna.artstation.com/p/assets/images/images/082/499/478/large/yize-huang-2024-12-03-12-39-17.jpg?1733157609",
    caption: "Light Installation",
  },
];

// （可選）如果你要拿容器寬高：
const container = ref(null);
const W = ref(0);
const H = ref(0);

onMounted(() => {
  if (container.value) {
    W.value = container.value.clientWidth;
    H.value = container.value.clientHeight;
    console.log("Container size:", W.value, H.value);
  }
});
</script>

<template>
  <main
    ref="container"
    class="w-screen h-auto flex justify-center items-start p-4"
  >
    <section
      class="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8"
    >
      <!-- 這裡用 slides 取代 v-for 數字 -->
      <div
        v-for="(item, index) in slides"
        :key="index"
        class="flex flex-col justify-center items-center overflow-hidden transition"
      >
        <!-- 圖片區 -->
        <div class="relative w-full">
          <img
            :src="item.img"
            :alt="item.caption"
            class="w-full h-auto object-cover"
          />
        </div>

        <!-- 文字區 -->
        <div class="flex justify-between items-center w-full px-1 pt-2">
          <h3 class="text-sm newsreader text-secondary/80">
            {{ item.caption }}
          </h3>
          <div class="text-primary text-xs silkscreen">2025</div>
        </div>
      </div>
    </section>
  </main>
</template>
