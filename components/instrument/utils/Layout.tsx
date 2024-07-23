import React from "react";

interface UtilsLayoutProps {
  title: React.ReactNode;
  description: React.ReactNode;
  children: React.ReactNode;
}
/**
 * UtilsLayout
 * @param props
 * @returns
 */
const UtilsLayout: React.FC<UtilsLayoutProps> = (props) => {
  const { title, description } = props;
  return (
    <>
      <h1 className="text-3xl font-bold mb-2 text-center">{title}</h1>
      <p className="text-base mb-4 text-center">{description}</p>
      {props.children}
    </>
  );
};

export default UtilsLayout;
