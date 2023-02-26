import MeiliSearch from "meilisearch";
import type {
  CollectionAfterDeleteHook,
  CollectionConfig,
} from "payload/types";
import { SanitizedMeilisearchConfig } from "../types";

export type CollectionAfterDeleteHookWithArgs = (
  args: Parameters<CollectionAfterDeleteHook>[0] & {
    collection: CollectionConfig;
    meilisearchConfig: SanitizedMeilisearchConfig;
  }
) => void;

export const deleteCollection: CollectionAfterDeleteHookWithArgs = async (
  args
) => {
  const { req, doc, collection, meilisearchConfig } = args;

  const payload = req?.payload;

  const dataRef = doc || {};

  const { host, apiKey, sync, logs } = meilisearchConfig || {};

  if (!host || !apiKey) {
    return dataRef;
  }

  const client = new MeiliSearch({
    host: host,
    apiKey: apiKey,
  });

  if (logs) payload.logger.info(`Deleting collection: ${dataRef.id}`);

  if (payload) {
    if (dataRef.id) {
      const syncConfig = meilisearchConfig.sync.find(
        (item) => item.collection === collection.slug
      );

      if (!syncConfig) return dataRef;

      const targetFields = syncConfig.fields;

      const aliasedId = targetFields.find((field) => field.alias === "id");

      const index = client.index(collection.slug);

      const id = aliasedId?.alias
        ? aliasedId.transformer
          ? aliasedId.transformer(dataRef[aliasedId.name], doc)
          : dataRef[aliasedId.name]
        : dataRef.id;

      let response = await index.deleteDocument(id);

      if (logs && response.taskUid)
        payload.logger.info(`Successfully deleted!`);
    }
  }

  return dataRef;
};
