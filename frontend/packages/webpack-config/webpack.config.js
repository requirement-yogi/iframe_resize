const path = require("path");
const crypto = require("crypto");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const LicensePlugin = require("webpack-license-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = !isProduction;

const currentDate = new Date().valueOf().toString();
const buildNumber = Math.random().toString();
const buildHash = crypto
    .createHash("md5")
    .update(currentDate + buildNumber)
    .digest("hex")
    .substring(0, 5);

const publicUrl = "/web";

module.exports = {
    isDevelopment,
    isProduction,
    config: ({ baseDir, serverPort }) => {
        return {
            mode: isProduction ? "production" : "development",
            entry: "./src/index.tsx",
            output: {
                path: path.resolve(baseDir, "dist"),
                filename: isProduction ? "static/js/[name].[contenthash:8].js" : "static/js/bundle.js",
                chunkFilename: isProduction ? "static/js/[name].[contenthash:8].chunk.js" : "static/js/[name].chunk.js",
                assetModuleFilename: "static/media/[name].[hash][ext]",
                clean: true,
            },
            target: "browserslist",
            stats: "errors-warnings", // Use "normal" to see more information about the build
            devtool: isProduction ? "source-map" : "cheap-module-source-map",
            devServer: {
                host: "0.0.0.0", // To expose the dev server externally
                port: serverPort,
                client: {
                    overlay: false,
                    webSocketURL: `auto://0.0.0.0:0${publicUrl}/ws`, // To make the dev server work behind a proxy
                },
                hot: true,
                liveReload: true,
                compress: true,
                allowedHosts: "all", // To make the dev server work behind a proxy
                historyApiFallback: {
                    // Enable the history API, to make React router work
                    // Add a rewrite rule to use the public URL as the base path
                    rewrites: [
                        {
                            from: new RegExp(`^${publicUrl}/(.*)$`),
                            to: (context) => {
                                // Static resources
                                if (context.parsedUrl.pathname.includes(".")) {
                                    return `/${context.match[1]}`;
                                }
                                // Routes
                                return "/index.html";
                            },
                        },
                    ],
                },
            },
            module: {
                rules: [
                    // JavaScript / TypeScript
                    {
                        test: /\.(js|jsx|ts|tsx)$/i,
                        use: [
                            {
                                loader: "babel-loader",
                                options: {
                                    plugins: [isDevelopment && "react-refresh/babel"].filter(Boolean),
                                },
                            },
                        ],
                        exclude: /node_modules/,
                    },

                    // CSS / CSS modules
                    {
                        test: /\.css$/i,
                        use: [
                            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                            {
                                loader: "css-loader",
                                options: {
                                    modules: {
                                        auto: true,
                                        localIdentName: "[1]_[local]__[hash:base64:5]",
                                        localIdentRegExp: /([^/\\]*)\.module\.css$/i,
                                        exportLocalsConvention: "camelCase",
                                        namedExport: false,
                                    },
                                },
                            },
                        ],
                    },

                    // SCSS / SCSS modules
                    {
                        test: /\.scss$/i,
                        use: [
                            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                            {
                                loader: "css-loader",
                                options: {
                                    importLoaders: 1,
                                    modules: {
                                        auto: true,
                                        localIdentName: "[1]_[local]__[hash:base64:5]",
                                        localIdentRegExp: /([^/\\]*)\.module\.scss$/i,
                                        exportLocalsConvention: "camelCase",
                                        namedExport: false,
                                    },
                                },
                            },
                            "sass-loader",
                        ],
                    },

                    // SVG files
                    {
                        test: /\.svg$/i,
                        issuer: /\.[jt]sx?$/,
                        use: ["@svgr/webpack"],
                    },

                    // Assets
                    {
                        test: /\.(png|jpg|jpeg|bmp|gif)$/i,
                        type: "asset",
                    },
                ],
            },
            plugins: [
                // Performs type checking asynchronously
                new ForkTsCheckerWebpackPlugin(),

                // Copies static resources to the output folder
                new CopyWebpackPlugin({
                    patterns: [
                        {
                            from: path.resolve(baseDir, "public"),
                            globOptions: {
                                ignore: isProduction ? ["**/index.html", "**/env.js"] : ["**/index.html"],
                            },
                        },
                    ],
                }),

                // Extracts CSS into separate files
                isProduction &&
                    new MiniCssExtractPlugin({
                        filename: "static/css/[name].[contenthash:8].css",
                        chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
                    }),

                // Generates the HTML file and injects the resources
                new HtmlWebpackPlugin({
                    template: path.resolve(baseDir, "public", "index.html"),
                    templateParameters: {
                        PUBLIC_URL: publicUrl,
                        BUILD_HASH: buildHash,
                    },
                }),

                // Defines environment variables to reuse in the code
                new webpack.EnvironmentPlugin({
                    PUBLIC_URL: publicUrl,
                    ENVIRONMENT: isProduction ? "production" : "development",
                    NODE_ENV: isProduction ? "production" : "development",
                    CI: false, // Used in the @atlaskit/renderer library
                }),

                // Enables Hot Module Replacement (HMR) for React
                isDevelopment &&
                    new ReactRefreshWebpackPlugin({
                        overlay: false,
                    }),

                // Extract licenses from our dependencies
                isProduction &&
                    new LicensePlugin({
                        outputFilename: "licenses.json",
                        excludedPackageTest: (packageName) => {
                            // Exclude our own packages
                            return packageName === "requirementyogi" || packageName.startsWith("@requirementyogi/");
                        },
                        additionalFiles: {
                            "licenses.json": (packages) => {
                                return JSON.stringify(
                                    // Hide the version and source attributes
                                    packages.map(({ version, source, ...params }) => params),
                                    null,
                                    2,
                                );
                            },
                        },
                        unacceptableLicenseTest: (licenseIdentifier) => {
                            // Define the acceptable licenses
                            const acceptableLicenses = [
                                "Apache-2.0",
                                "MIT",
                                "ISC",
                                "0BSD",
                                "BSD-2-Clause",
                                "BSD-3-Clause",
                                "Python-2.0",
                                "MPL-2.0",
                                "CC-BY-3.0",
                                "CC-BY-4.0",
                                "CC0-1.0",
                                "ODC-By-1.0",
                                "WTFPL",
                                "(CC-BY-4.0 AND MIT)",
                            ];
                            return !acceptableLicenses.includes(licenseIdentifier);
                        },
                    }),
            ].filter(Boolean),
            optimization: {
                // Only runs for production builds
                minimizer: [new CssMinimizerPlugin(), "..."],
            },
            resolve: {
                extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
                plugins: [
                    // Use TypeScript path aliases
                    new TsconfigPathsPlugin({
                        configFile: path.resolve(baseDir, "tsconfig.json"),
                        extensions: [".tsx", ".ts", ".jsx", ".js"],
                    }),
                ],
            },
        };
    },
};
