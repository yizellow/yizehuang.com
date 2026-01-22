<script setup lang="ts">
type Work = {
  _id: string;
  title?: string;
  slug?: string;
  year?: string;
  medium?: string;
  group?: string;
  stage?: string;
  coverUrl?: string;
};

const { data: works } = await useFetch<Work[]>("/api/works");
</script>

<template>
  <main class="wrap">
    <h1>Works</h1>

    <div class="grid">
      <NuxtLink
        v-for="w in works || []"
        :key="w._id"
        class="card"
        :to="w.slug ? `/works/${w.slug}` : '#'"
      >
        <div class="thumb" v-if="w.coverUrl">
          <img :src="w.coverUrl" :alt="w.title || ''" />
        </div>

        <div class="meta">
          <div class="title">{{ w.title || "(untitled)" }}</div>
          <div class="sub">
            <span>{{ w.year }}</span>
            <span v-if="w.medium"> · {{ w.medium }}</span>
            <span v-if="w.group"> · {{ w.group }}</span>
            <span v-if="w.stage"> · {{ w.stage }}</span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </main>
</template>

<style scoped>
.wrap {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 14px;
}
.card {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  overflow: hidden;
  text-decoration: none;
}
.thumb {
  aspect-ratio: 4/3;
  background: rgba(255, 255, 255, 0.04);
}
.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.meta {
  padding: 12px;
}
.title {
  font-weight: 700;
}
.sub {
  opacity: 0.7;
  font-size: 12px;
  margin-top: 4px;
}
</style>
