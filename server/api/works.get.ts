import { createClient } from "@sanity/client";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  // 排查：缺任何一個就直接回 500 + 明確訊息
  const projectId = config.public.SANITY_PROJECT_ID;
  const dataset = config.public.SANITY_DATASET;
  const apiVersion = config.public.SANITY_API_VERSION;
  const token = config.SANITY_TOKEN;

  if (!projectId || !dataset || !apiVersion) {
    throw createError({
      statusCode: 500,
      statusMessage:
        "Missing SANITY_PUBLIC env (PROJECT_ID/DATASET/API_VERSION)",
    });
  }
  if (!token) {
    throw createError({
      statusCode: 500,
      statusMessage: "Missing SANITY_TOKEN (dataset is private)",
    });
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  });

  try {
    // 先用最簡單 query，確認能連上
    const query = `*[_type=="works"]|order(year desc){
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
    return await client.fetch(query);
  } catch (e: any) {
    console.error(e);
    throw createError({
      statusCode: 500,
      statusMessage: e?.message || "Sanity fetch failed",
    });
  }
});
