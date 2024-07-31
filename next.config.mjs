import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";
/** @type {import('next').NextConfig} */
const nextConfig = {
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
          languages: ["typescript", "javascript", "css", "json"],
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

// gitpage静态页面路径重定向
if (process.env.GITHUB_ACTIONS) {
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

export default nextConfig;
