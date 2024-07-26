import { theme, type ThemeConfig } from "antd";
const { darkAlgorithm } = theme;

export const darkThemeConfig: ThemeConfig = {
  algorithm: darkAlgorithm,
  token: {
    colorBgBase: "#fff",
    colorBgContainer: "#20293a",
    colorBgElevated: "#20293a",
    colorBgLayout: "#111729",
    colorBorder: "#ffffff0d",
    colorBorderSecondary: "#64748b4d",

    colorText: "rgba(255,255,255,0.88)",
    colorTextQuaternary: "rgba(255,255,255,0.25)",
    colorTextSecondary: "rgba(255,255,255,0.65)",
    colorTextTertiary: "rgba(255,255,255,0.45)",
    colorTextHeading: "rgba(255,255,255,0.88)",
    colorTextDescription: "rgba(255,255,255,0.45)",
    colorTextLabel: "rgba(255,255,255,0.65)",
    colorTextPlaceholder: "rgba(255,255,255,0.25)",

    controlItemBgActive: "#111729",
    controlItemBgActiveHover: "#111729",
    controlItemBgHover: "rgb(51,65,85)",
  },
};
