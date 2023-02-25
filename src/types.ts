import { Payload } from "payload";
import { Config as PayloadConfig } from "payload/config";
import MeiliSearch from "meilisearch";

export type FieldSyncConfig = {
  name: string;
  alias?: string;
  transformer?: (args: any) => any;
};

export type SyncConfig = {
  collection: string;
  fields: FieldSyncConfig[];
};

export type MeilisearchConfig = {
  host: string;
  apiKey: string;
  sync?: SyncConfig[];
  logs?: boolean;
};

export type SanitizedMeilisearchConfig = MeilisearchConfig & {
  sync: SyncConfig[];
};
