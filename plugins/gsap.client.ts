// plugins/gsap.client.ts
import { defineNuxtPlugin } from "#app";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default defineNuxtPlugin(() => {
  // 只在客戶端執行，安全地註冊 GSAP 插件
  if (process.client) {
    gsap.registerPlugin(ScrollTrigger);
  }
});
