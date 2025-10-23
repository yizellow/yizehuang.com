// plugins/hash-scroll.client.ts
import { nextTick } from "vue";
import { defineNuxtPlugin } from "#app";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default defineNuxtPlugin((nuxtApp) => {
  // GSAP 插件已在 plugins/gsap.client.ts 中註冊

  const router = useRouter();

  const scrollToHash = async (hash: string) => {
    if (!hash) return;
    await nextTick();

    // 先 refresh，確保 Sticky/高度由 GSAP 計算完成
    try {
      ScrollTrigger.refresh();
    } catch {}

    // 最長重試 2 秒，等元素掛載完成再捲
    let tries = 0;
    const maxTries = 40;
    const raf2 = () =>
      new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    while (tries < maxTries) {
      const el = document.querySelector(hash) as HTMLElement | null;
      if (el) {
        await raf2();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      tries++;
      await new Promise((r) => setTimeout(r, 50));
    }
  };

  // 首次進站（例如直接打 /#contact）
  nuxtApp.hook("app:mounted", () => {
    if (location.hash) scrollToHash(location.hash);
  });

  // 路由完成（跨頁點 CONTACT）
  router.afterEach((to) => {
    if (to.hash) scrollToHash(to.hash);
  });
});
