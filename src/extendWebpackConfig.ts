import type { Config } from "payload/config";
import path from "path";
import type { Configuration as WebpackConfig } from "webpack";

const mockModulePath = path.resolve(__dirname, "mocks/serverModule.js");

export const extendWebpackConfig =
  (config: Config): ((webpackConfig: WebpackConfig) => WebpackConfig) =>
  (webpackConfig) => {
    const existingWebpackConfig =
      typeof config.admin?.webpack === "function"
        ? config.admin.webpack(webpackConfig)
        : webpackConfig;

    return {
      ...existingWebpackConfig,
      resolve: {
        ...(existingWebpackConfig.resolve || {}),
        alias: {
          ...(existingWebpackConfig.resolve?.alias
            ? existingWebpackConfig.resolve.alias
            : {}),
          stripe: mockModulePath,
          express: mockModulePath,
          [path.resolve(__dirname, "./hooks/deleteCollection")]: mockModulePath,
          [path.resolve(__dirname, "./hooks/createOrUpdateCollection")]:
            mockModulePath,
          [path.resolve(__dirname, "./components/NavLink/index")]:
            mockModulePath,
          [path.resolve(__dirname, "./components/ManageMeilisearch/index")]:
            mockModulePath,
        },
      },
    };
  };
