import Head from "next/head";
import NavItemCard, { INavItems } from "@/components/NavItemCard";
import NavMenu from "@/components/NavMenu";
import { MutableRefObject, useRef } from "react";
import linkItems, { rootNavMap } from "@/components/data/linkMenu";

const useMenuProps = (
  list: INavItems[],
  target: MutableRefObject<Record<string, HTMLDivElement | null>>
) => {
  const menuObj = list.reduce<Record<string, any>>((prev, cur) => {
    if (!cur.level) {
      return prev;
    }
    // 第一层级
    if (cur.level === 1) {
      prev[cur.key] = {
        key: cur.key,
        icon: cur.icon,
        label: cur.label,
      };
      return prev;
    }
    if (cur.parentKey) {
      // 第二层级
      if (!Object.hasOwn(prev, cur.parentKey)) {
        prev[cur.parentKey] = {
          key: cur.parentKey,
          icon: rootNavMap?.[cur.parentKey]?.icon ?? cur.icon,
          label: rootNavMap?.[cur.parentKey]?.label,
          children: [],
        };
      }
      prev[cur.parentKey].children.push({
        key: cur.key,
        icon: cur.icon,
        label: cur.label,
      });
    }
    return prev;
  }, {});

  const items = Object.values(menuObj);

  const onSelect = (info: any) => {
    const key = info.key;
    console.log(key);
    document.documentElement.scrollTo({
      top: (target.current[key]?.offsetTop as number) - 56,
      behavior: "smooth",
    });
  };

  return {
    items,
    onSelect,
  };
};

export default function Home() {
  const ref = useRef<Record<string, HTMLDivElement | null>>({});
  const menuProps = useMenuProps(linkItems, ref);

  return (
    <div className="flex">
      <Head>
        <title>前端开发工具与资源导航站</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="og:title" content="前端开发工具与资源导航站" />
        <meta
          name="description"
          content="探索最全面的前端开发工具与资源导航站！我们精心搜集并分类整理了最新的前端框架、库、插件、设计工具、代码片段以及教程指南，助力每一位前端开发者高效学习、快速开发。无论您是初学者还是资深专家，都能在这里找到提升技能的宝藏。立即访问，开启您的高效前端开发之旅！"
        />
        <meta
          property="og:description"
          content="探索最全面的前端开发工具与资源导航站！我们精心搜集并分类整理了最新的前端框架、库、插件、设计工具、代码片段以及教程指南，助力每一位前端开发者高效学习、快速开发。无论您是初学者还是资深专家，都能在这里找到提升技能的宝藏。立即访问，开启您的高效前端开发之旅！"
        />
      </Head>
      <NavMenu {...menuProps}></NavMenu>
      <div className="p-4 pt-0 flex-1 bg-slate-50 dark:bg-slate-950">
        {linkItems.map((menu) => (
          <div
            key={menu.key}
            ref={(e) => {
              ref.current[menu.key] = e;
            }}
          >
            <h2 className="p-2 border-b font-bold text-lg dark:text-slate-200 dark:border-b-slate-50/30">
              {menu.label}
            </h2>
            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-3 xl:grid-cols-4 mt-3">
              {menu.items.map((item) => (
                <NavItemCard navItem={item} key={item.key} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
