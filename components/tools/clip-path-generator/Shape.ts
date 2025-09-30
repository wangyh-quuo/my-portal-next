export interface IShape {
  type: string;
  label: string;
  value: string;
  points: { x: number; y: number }[];
  generateClipPath: (points: { x: number; y: number }[]) => string;
}

export class Shape implements IShape {
  type: string;
  label: string;
  value: string = "";
  points: { x: number; y: number }[];
  generateClipPath: (points: { x: number; y: number }[]) => string;
  constructor(
    type: string,
    label: string,
    points: { x: number; y: number }[],
    generateClipPath: (points: { x: number; y: number }[]) => string
  ) {
    this.type = type;
    this.label = label;
    this.points = points;
    this.generateClipPath = generateClipPath;
    this.value = this.generateClipPath(points);
  }

  static createShape(
    type: string,
    label: string,
    points: { x: number; y: number }[],
    generateClipPath: (points: { x: number; y: number }[]) => string
  ) {
    return new Shape(type, label, points, generateClipPath);
  }

  static getPointsLength(
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) {
    return Math.sqrt(
      Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
    );
  }
}

export const shapes: IShape[] = [
  Shape.createShape(
    "circle",
    "圆形",
    [
      { x: 50, y: 50 },
      { x: 50, y: 100 },
    ],
    (points) =>
      `circle(${Shape.getPointsLength(points[0], points[1]).toFixed(0)}% at ${
        points[0].x
      }% ${points[0].y}%)`
  ),
  Shape.createShape(
    "ellipse",
    "椭圆形",
    [
      { x: 20, y: 50 }, // 左焦点
      { x: 80, y: 50 }, // 右焦点
      { x: 50, y: 60 }, // 椭圆上的一点
    ],
    (points) => {
      const a =
        (Shape.getPointsLength(points[2], points[0]) +
          Shape.getPointsLength(points[2], points[1])) /
        2;
      const c = Shape.getPointsLength(points[0], points[1]) / 2;
      const b = Math.sqrt(a * a - c * c);
      console.log(a, b, c);
      const centerX = (points[0].x + points[1].x) / 2;
      const centerY = (points[0].y + points[1].y) / 2;
      return `ellipse(${a.toFixed(0)}% ${b.toFixed(
        0
      )}% at ${centerX}% ${centerY}%)`;
    }
  ),
  Shape.createShape(
    "polygon",
    "多边形",
    [
      { x: 50, y: 0 },
      { x: 100, y: 50 },
      { x: 80, y: 100 },
      { x: 20, y: 100 },
      { x: 0, y: 50 },
    ],
    (points) =>
      `polygon(${points.map((p) => `${p.x}% ${p.y}%`).join(", ")})`
  ), 
];
