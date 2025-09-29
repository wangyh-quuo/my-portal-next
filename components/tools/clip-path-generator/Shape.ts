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
      `circle(${Shape.getPointsLength(points[0], points[1]).toFixed(0)}% at ${points[0].x}% ${
        points[0].y
      }%)`
  ),
];
