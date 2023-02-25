import MeiliSearch from "meilisearch";
import type {
  CollectionAfterChangeHook,
  CollectionConfig,
} from "payload/types";
import { SanitizedMeilisearchConfig } from "../types";

export type CollectionAfterChangeHookWithArgs = (
  args: Parameters<CollectionAfterChangeHook>[0] & {
    collection: CollectionConfig;
    meilisearchConfig: SanitizedMeilisearchConfig;
  }
) => void;

export const createOrUpdateCollection: CollectionAfterChangeHookWithArgs =
  async (args) => {
    const { req, operation, doc, collection, meilisearchConfig } = args;

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

    if (logs) payload.logger.info(`Syncing collection: ${dataRef.id}`);

    if (payload) {
      if (dataRef.id) {
        const syncConfig = meilisearchConfig.sync.find(
          (item) => item.collection === collection.slug
        );

        if (!syncConfig) return dataRef;

        const targetFields = syncConfig.fields;

        const aliasedId = targetFields.find((field) => field.alias === "id");

        const syncedFields = {};

        targetFields.forEach((field) => {
          const callback = field.transformer;
          const key = field.alias ?? field.name;

          const keyValuePair = {
            [key]: callback
              ? callback(dataRef[field.name])
              : dataRef[field.name],
          };

          Object.assign(syncedFields, keyValuePair);
        });

        const index = client.index(collection.slug);

        const id = aliasedId?.alias
          ? {
              [aliasedId.alias]: dataRef[aliasedId.name],
            }
          : {
              id: dataRef.id,
            };

        const collectionSyncData = {
          ...id,
          ...syncedFields,
        };

        console.log("for data", dataRef);
        console.log("collectionSyncData", collectionSyncData);

        let response = await index.addDocuments([collectionSyncData]);

        if (logs && response.taskUid) payload.logger.info(`Synced!`);
      }
    }

    return dataRef;
  };
