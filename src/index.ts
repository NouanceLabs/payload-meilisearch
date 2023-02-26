import { Config as PayloadcConfig, Plugin } from "payload/config";
import { MeiliSearch } from "meilisearch";
import { SanitizedMeilisearchConfig } from "./types";
import { MeilisearchConfig } from "./types";
import { createOrUpdateCollection } from "./hooks/createOrUpdateCollection";
import { deleteCollection } from "./hooks/deleteCollection";

const payloadMeilisearch =
  (incomingConfig: MeilisearchConfig) =>
  (config: PayloadcConfig): PayloadcConfig => {
    const { collections } = config;

    const pluginConfig: SanitizedMeilisearchConfig = {
      ...incomingConfig,
      sync: incomingConfig?.sync || [],
    };

    if (!collections) return config;

    const processedConfig: PayloadcConfig = {
      ...config,
      collections: collections.map((collection) => {
        const sync = pluginConfig.sync?.find(
          (sync) => sync.collection === collection.slug
        );

        const { hooks: existingHooks } = collection;

        if (sync) {
          return {
            ...collection,
            hooks: {
              ...collection.hooks,
              afterChange: [
                ...(existingHooks?.afterChange || []),
                async (args) =>
                  createOrUpdateCollection({
                    ...args,
                    collection,
                    meilisearchConfig: pluginConfig,
                  }),
              ],
              afterDelete: [
                ...(existingHooks?.afterDelete || []),
                async (args) =>
                  deleteCollection({
                    ...args,
                    collection,
                    meilisearchConfig: pluginConfig,
                  }),
              ],
            },
          };
        }

        return collection;
      }),
    };

    return processedConfig;
  };

export default payloadMeilisearch;
