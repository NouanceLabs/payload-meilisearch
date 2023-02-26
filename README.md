# Payload Meilisearch Plugin (ALPHA)

**Expect breaking changes.**

A plugin for [Payload CMS](https://github.com/payloadcms/payload) to connect [Meilisearch](https://meilisearch.com) and Payload.

Roadmap to stable release:

- ~~Sync collections on create and update~~
- ~~Delete collections~~
- Support all field types of Payload (in progress)
- Support for Payload's draft system (planned)
- Support Meilisearch index options for filtering and sorting (planned)

## Installation

```bash
  yarn add @nouance/payload-meilisearch
  # OR
  npm i @nouance/payload-meilisearch
```

## Basic Usage

In the `plugins` array of your [Payload config](https://payloadcms.com/docs/configuration/overview), call the plugin with [options](#options):

```js
import { buildConfig } from "payload/config";
import meilisearchPlugin from "@nouance/payload-meilisearch";

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
import meilisearchPlugin from "@nouance/payload-meilisearch";

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

### Curently supported field types

- **Code**
- **Date**
- **Email**
- **JSON**
- **Number**
- **Point**
- **Radio group**
- **Select**
- **Text**
- **Textarea**

## Development

For development purposes, there is a full working example of how this plugin might be used in the [demo](./demo) of this repo. This demo can be developed locally using any [Meilisearch Cloud](https://cloud.meilisearch.com/) account, you just need a working API key. Then:

```bash
git clone git@github.com:NouanceLabs/payload-meilisearch.git \
  cd payload-meilisearch && yarn \
  cd demo && yarn \
  cp .env.example .env \
  vim .env \ # add your Meilisearch creds to this file
  yarn dev
```
