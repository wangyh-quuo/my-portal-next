import React from "react";

export interface INavItems {
  key: string;
  label: string;
  items: INavItem[];
  parentKey?: string;
  level: number;
  icon?: React.ReactNode;
}
export interface INavItem {
  key: string;
  label: string;
  description: string;
  icon: string;
  link: string;
}

export type NavItemCardProps = {
  navItem: INavItem;
};

const NavItemCard: React.FC<NavItemCardProps> = ({ navItem }) => {
  const iconURL = /^http(s?):\/\//.test(navItem.icon)
    ? navItem.icon
    : `${navItem.link}${navItem.icon}`;
  return (
    <a
      href={navItem.link}
      className="flex items-center w-full rounded-xl p-4 bg-white shadow-sm hover:bg-blue-50 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-600"
      target="_blank"
    >
      <div className="p-4 border rounded-full bg-white">
        <img className="w-8 h-8" src={iconURL} alt="" />
      </div>
      <div className="ml-2 flex-1">
        <div>{navItem.label}</div>
        <div className="text-sm text-gray-400">{navItem.description}</div>
      </div>
    </a>
  );
};

export default NavItemCard;
