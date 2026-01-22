import { createClient } from "@sanity/client";

export function getSanityClient() {
  const config = useRuntimeConfig();

  return createClient({
    projectId: config.public.sanityProjectId,
    dataset: config.public.sanityDataset,
    apiVersion: config.public.sanityApiVersion,
    useCdn: false,
    token: config.sanityToken || undefined,
  });
}
