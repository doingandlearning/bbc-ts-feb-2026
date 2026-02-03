export interface Circle {
  type: "circle";
  area?: number;
  radius: number;
}

export interface Rectangle {
  type: "rectangle";
  length: number;
  width: number;
  area?: number;
}

export interface RightTriangle {
  type: "rightTriangle";
  base: number;
  area?: number;
  height: number;
}

export interface Square {
  type: "square";
  area?: number;
  width: number;
}

export type ValidShape = Circle | Square | RightTriangle | Rectangle;
