import React, { MouseEventHandler, use, useEffect, useRef } from "react";
import UtilsLayout from "../Layout";
import { Tabs } from "antd";
import { InputCopy } from "@/components/CopyButton";
import { IShape, shapes } from "./Shape";

type UpdateCallback = (
  type: string,
  index: number,
  point: { x: number; y: number }
) => void;

const ClipPathContainer: React.FC<IShape & { update: UpdateCallback }> = (
  props
) => {
  const isDragging = useRef(false);
  const dragIndex = useRef<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    console.log("move", e);
    isDragging.current = true;
    dragIndex.current = index;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    e.preventDefault();
  };
  let ticking = false;
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;

    if (!ticking) {
      requestAnimationFrame(() => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(0);
        const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(0);
        if (dragIndex.current !== -1) {
          props.update(props.type, dragIndex.current, {
            x: Math.min(100, Math.max(0, +x)),
            y: Math.min(100, Math.max(0, +y)),
          });
        }
        ticking = false;
      });
      ticking = true;
    }
  };
  const handleMouseUp = (e: MouseEvent) => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <h3 className="text-lg font-medium mb-2">预览</h3>
        <div className="p-2 mx-auto size-72 border border-gray-300 rounded">
          <div className="relative w-full h-full">
            <div
              className="w-full h-full bg-blue-500"
              style={{ clipPath: props.value }}
            ></div>
            <div ref={containerRef} className="absolute top-0 bottom-0 left-0 right-0">
              {props.points.map((point, index) => (
                <div
                  key={index}
                  className="w-2 h-2 bg-red-500 rounded-full absolute cursor-pointer "
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    transform: `translate(-50%, -50%)`,
                  }}
                  title={`(${point.x}%, ${point.y}%)`}
                  onMouseDown={(e) => handleMouseDown(e, index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-medium mb-2">CSS 代码</h3>
        <pre className="bg-gray-100 p-4 rounded flex items-center justify-between gap-x-4">
          {`clip-path: ${props.value};`}
          <InputCopy options={{ text: () => props.value }}></InputCopy>
        </pre>
      </div>
    </div>
  );
};

const ClipPathGenerator: React.FC = () => {
  const [shapeList, setShapeList] = React.useState<IShape[]>(shapes);

  const updatePoint: UpdateCallback = (type, index, point) => {
    setShapeList((prev) => {
      const newShapes = [...prev];
      for (let shape of newShapes) {
        if (shape.type === type && shape.points[index]) {
          shape.points[index] = point;
          shape.value = shape.generateClipPath(shape.points);
        }
      }
      return newShapes;
    });
  };

  return (
    <UtilsLayout
      title="剪切路径生成器"
      description="通过指定的路径创建一个剪切路径"
    >
      <Tabs>
        {shapeList.map((item) => (
          <Tabs.TabPane tab={item.label} key={item.type}>
            <ClipPathContainer {...item} update={updatePoint} />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </UtilsLayout>
  );
};

export default ClipPathGenerator;
