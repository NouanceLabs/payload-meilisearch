# Payload Meilisearch Plugin (ALPHA)

A plugin for [Payload CMS](https://github.com/payloadcms/payload) to connect [Meilisearch](https://meilisearch.com) and Payload.

Planned features:

- Sync collections on create, update or delete (in progress)
- Support all field types of Payload (in progress)
- Support for Payload's versioning system (planned)
- Support Meilisearch index options for filtering and sorting (planned)

## Installation

```bash
  yarn add
  # OR
  npm i
```

## Basic Usage

In the `plugins` array of your [Payload config](https://payloadcms.com/docs/configuration/overview), call the plugin with [options](#options):

```js
import { buildConfig } from "payload/config";
import meilisearchPlugin from "";

const config = buildConfig({
  plugins: [
    meilisearchPlugin({
      host: process.env.MEILISEARCH_HOST,
      apiKey: process.env.MEILISEARCH_API_KEY,
    }),
  ],
});

export default config;
```

### Options

- `host`

  Required. Your Meilisearch host URL.

- `apiKey`

  Required. Your Meilisearch API key. Must have permissions to read, create and delete indexes and documents.

- `sync`

  Required. An array of sync configs. This will automatically configure a sync between Payload collections and Meilisearch indexes. See [sync](#sync) for more details.

- `logs`

  Optional. When `true`, logs sync events to the console as they happen.

## Sync

This option will sync collection's data and their fields to your Meilisearch instance. Each collection slug maps to a unique index in Meilisearch.

```js
import { buildConfig } from "payload/config";
import meilisearchPlugin from "@";

const config = buildConfig({
  plugins: [
    meilisearchPlugin({
      host: process.env.MEILISEARCH_HOST,
      apiKey: process.env.MEILISEARCH_API_KEY,
      sync: [
        {
          collection: "posts",
          fields: [
            {
              name: "title",
              alias: "title",
            },
            {
              name: "publishedDate",
              alias: "publishedDate",
            },
          ],
        },
      ],
    }),
  ],
});

export default config;
```
