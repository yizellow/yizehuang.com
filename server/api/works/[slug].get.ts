import { createClient } from "@sanity/client";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { slug } = getRouterParams(event) as { slug: string };

  const client = createClient({
    projectId: config.public.SANITY_PROJECT_ID,
    dataset: config.public.SANITY_DATASET,
    apiVersion: config.public.SANITY_API_VERSION,
    useCdn: false,
    token: config.SANITY_TOKEN,
  });

  const query = `*[_type=="works" && slug.current==$slug][0]{
    _id,
    title,
    "slug": slug.current,
    year,
    medium,
    group,
    stage,
    video,
    clips,
    links,
    desc,

    "coverUrl": select(
      cover.source=="url" => cover.url,
      cover.source=="upload" => cover.image.asset->url
    ),

    "imagesUrls": images[]{
      "url": select(
        source=="url" => url,
        source=="upload" => image.asset->url
      )
    }
  }`;

  return await client.fetch(query, { slug });
});
