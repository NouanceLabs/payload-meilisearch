import { Payload } from "payload";
import { Config as PayloadConfig } from "payload/config";
import MeiliSearch from "meilisearch";

type TransformerFieldType = string | number;

export type FieldSyncConfig = {
  name: string;
  alias?: string;
  transformer?: (field: TransformerFieldType, doc?: any) => any;
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
