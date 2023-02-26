import { buildConfig } from "payload/config";
import path from "path";
import Categories from "./collections/Categories";
import Posts from "./collections/Posts";
import Tags from "./collections/Tags";
import Users from "./collections/Users";
import Media from "./collections/Media";
import payloadMeilisearch from "../../src/index";

export default buildConfig({
  serverURL: "http://localhost:3000",
  admin: {
    user: Users.slug,
  },
  collections: [Categories, Posts, Tags, Users, Media],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [
    payloadMeilisearch({
      host: process.env.MEILISEARCH_HOST,
      apiKey: process.env.MEILISEARCH_API_KEY,
      logs: true,
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
            {
              name: "views",
              alias: "views",
            },
            {
              name: "author",
              alias: "author",
            },
            {
              name: "tags",
              alias: "tags",
            },
            {
              name: "category",
              alias: "category",
            },
            {
              name: "featuredImage",
            },
            {
              name: "content",
            },
          ],
        },
        {
          collection: "categories",
          fields: [
            {
              name: "name",
              alias: "name",
            },
          ],
        },
        {
          collection: "tags",
          fields: [
            {
              name: "name",
              alias: "name",
            },
          ],
        },
      ],
    }),
  ],
});
