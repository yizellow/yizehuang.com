// server/api/works.get.ts
import { createClient } from "@sanity/client";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  // === Debug: 確認 handler 有被打到 + runtimeConfig 有沒有值 ===
  console.log("[/api/works] Loaded works.get.ts");
  console.log("[/api/works] runtimeConfig", {
    sanityProjectId: config.public?.sanityProjectId ?? null,
    sanityDataset: config.public?.sanityDataset ?? null,
    sanityApiVersion: config.public?.sanityApiVersion ?? null,
    hasToken: !!config.sanityToken,
  });

  const projectId = config.public?.sanityProjectId;
  const dataset = config.public?.sanityDataset;
  const apiVersion = config.public?.sanityApiVersion;
  const token = config.sanityToken;

  // === 個別檢查缺哪些 ===
  const missing: string[] = [];
  if (!projectId) missing.push("public.sanityProjectId");
  if (!dataset) missing.push("public.sanityDataset");
  if (!apiVersion) missing.push("public.sanityApiVersion");

  if (missing.length) {
    console.log("[/api/works] Missing runtimeConfig keys:", missing);
    throw createError({
      statusCode: 500,
      statusMessage: `Missing SANITY public runtimeConfig: ${missing.join(", ")}`,
    });
  }

  // === 建 client（server 端可用 token；若 dataset 公開可讀可不放 token）===
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token, // 若你要完全不帶 token：刪掉這行或改成 token: undefined
  });

  // === GROQ ===
  const query = /* groq */ `*[_type=="works"]|order(year desc){
    _id,
    title,
    "slug": slug.current,
    year,
    medium,
    group,
    stage,
    "coverUrl": select(
      cover.source == "url" => cover.url,
      cover.source == "upload" => cover.image.asset->url
    )
  }`;

  try {
    const data = await client.fetch(query);
    console.log(
      "[/api/works] fetched:",
      Array.isArray(data) ? data.length : data,
    );
    return data;
  } catch (err: any) {
    console.error("[/api/works] fetch error:", {
      message: err?.message,
      statusCode: err?.statusCode,
      details: err?.details,
    });
    throw createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.message || "Sanity fetch failed",
    });
  }
});
