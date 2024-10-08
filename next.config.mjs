import path from "node:path";
import fs from "node:fs";
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";
import BundleAnalyzer from "@next/bundle-analyzer";
const withBundleAnalyzer = BundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export
  // https://nextjs.org/docs/app/building-your-application/deploying/static-exports#version-history
  output: "export",
  // Disable server side image optimization too
  // https://nextjs.org/docs/api-reference/next/image#unoptimized
  "images.unoptimized": true,
  reactStrictMode: true,
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.module.rules.push({
      test: /\.svg$/i,
      loader: "@svgr/webpack",
      issuer: { not: /\.(css|scss|sass)$/ },
    });
    if (!isServer) {
      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: ["typescript", "javascript", "css", "json", "html"],
          filename: "static/[name].worker.js",
        })
      );
    }
    return config;
  },
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
    "rc-tree",
    "rc-table",
  ],
};

let customDomain = "";
try {
  const file = fs.readFileSync(path.resolve("CNAME"));
  customDomain = file.toString();
} catch (error) {
  customDomain = "";
}

// gitpage静态页面路径重定向
if (process.env.GITHUB_ACTIONS && !customDomain) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "");
  nextConfig.basePath = `/${repo}`;
  nextConfig.redirects = async () => {
    return [
      {
        source: "/[path]",
        destination: `/${repo}/[path].html`,
        permanent: false,
      },
    ];
  };
}

export default withBundleAnalyzer(nextConfig);
