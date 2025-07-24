<script setup>
const exhibitions = [
  {
    date: "12.2023",
    title: "Painting Comfort Zone",
    location: "North and South Gallery",
  },
  {
    date: "05.2023",
    title: "If the World Had No Maps",
    location: "Underground Experimental Field",
  },
  {
    date: "08.2021",
    title: "2021GenieLab TNUA (Third Place)",
    location: "online exhibition",
  },
  {
    date: "12.2020",
    title: "Picking up Color Project: Pocket book for Autumn",
    location: "North and South Gallery",
  },
  { date: "12.2019", title: "Myself", location: "8 and one-half Gallery" },
];
</script>

<template>
  <section class="w-screen h-screen flex justify-center items-center">
    <div class="w-1/2 h-auto p-4 border-2 border-primary">
      <div v-for="(exhibit, index) in exhibitions" :key="index" class="mb-5">
        <p class="flex justify-between items-center m-0 text-secondary text-xs">
          <!-- 左邊：時間 + 名稱 -->
          <span class="flex gap-2 items-center">
            <span class="newsreader text-xs">{{ exhibit.date }}</span>
            <h1 class="silkscreen text-base">{{ exhibit.title }}</h1>
          </span>

          <!-- 右邊：地點 -->
          <span class="newsreader text-xs text-right">{{
            exhibit.location
          }}</span>
        </p>
      </div>
    </div>
  </section>

  <footer class="w-screen h-screen flex flex-col">
    <div class="w-full md:w-1/3 m-5">
      <h1 class="silkscreen mb-2 text-2xl text-primary">About</h1>
      <p class="newsreader text-base">
        Andrés Briganti is an independent designer specializing in visual
        identity, with expertise in bespoke logotypes, custom typography, and
        conceptual frameworks. His design practice is characterized by a
        refined, intentional approach that distills complex ideas into
        distinctive visual forms.
      </p>
    </div>
  </footer>
</template>
<!-- <section class="w-1/3 h-[56px] note bg-primary border-2 border-secondary">
      <p>whatsApp: (+886) 981488850</p>
    </section>
    <section class="w-1/3 h-1/4 bg-primary border-2 border-secondary"></section>
    <section class="w-1/3 h-1/4 bg-primary border-2 border-secondary"></section> -->
