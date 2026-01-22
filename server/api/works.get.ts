import { createClient } from "@sanity/client";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  const projectId = config.sanityProjectId;
  const dataset = config.sanityDataset;
  const apiVersion = config.sanityApiVersion;
  const token = config.sanityToken;

  if (!projectId || !dataset || !apiVersion) {
    throw createError({
      statusCode: 500,
      statusMessage: "Missing SANITY runtimeConfig",
    });
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  });

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
});
