import { nextTick } from "vue";

export function useHashScroll() {
  const scrollToHash = async (hash: string) => {
    if (!hash) return;
    await nextTick();

    // 最長重試 2 秒，等元素掛載完
    let tries = 0;
    const max = 40;
    while (tries < max) {
      const el = document.querySelector<HTMLElement>(hash);
      if (el) {
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.pageYOffset;
        window.scrollTo({ top, behavior: "smooth" });
        return;
      }
      tries++;
      await new Promise((r) => setTimeout(r, 50));
    }
  };

  return { scrollToHash };
}
