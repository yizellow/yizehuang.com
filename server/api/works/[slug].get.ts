import { createClient } from "@sanity/client";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { slug } = getRouterParams(event) as { slug: string };

  const projectId = config.public.sanityProjectId;
  const dataset = config.public.sanityDataset;
  const apiVersion = config.public.sanityApiVersion;
  const token = config.sanityToken;

  if (!projectId || !dataset || !apiVersion) {
    throw createError({
      statusCode: 500,
      statusMessage: "Missing SANITY public runtimeConfig",
    });
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
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
