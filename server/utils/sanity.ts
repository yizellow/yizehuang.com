import { createClient } from "@sanity/client";

export function getSanityClient() {
  const config = useRuntimeConfig();

  return createClient({
    projectId: config.sanityProjectId,
    dataset: config.sanityDataset,
    apiVersion: config.sanityApiVersion,
    useCdn: false,
    token: config.sanityToken || undefined,
  });
}
