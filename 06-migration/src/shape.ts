import type {
  ValidShape,
  Circle,
  Rectangle,
  RightTriangle,
  Square,
} from "./shape.types";

const PI = Math.PI;

function getCircleArea(radius: number) {
  return radius * radius * PI;
}

function getRectangleArea(length: number, width: number) {
  return length * width;
}

function getSquareArea(width: number) {
  return getRectangleArea(width, width);
}

function getRightTriangleArea(base: number, height: number) {
  return (base * height) / 2;
}

function getArea(shape: ValidShape) {
  switch (shape.type) {
    case "circle":
      shape.area = getCircleArea(shape.radius);
      break;
    case "rectangle":
      shape.area = getRectangleArea(shape.length, shape.width);
      break;
    case "square":
      shape.area = getSquareArea(shape.width);
      break;
    case "rightTriangle":
      shape.area = getRightTriangleArea(shape.base, shape.height);
  }
}

const circle: Circle = {
  type: "circle",
  radius: 4,
};
getArea(circle);
console.log(circle);

const rectangle: Rectangle = { type: "rectangle", length: 7, width: 4 };

getArea(rectangle);
console.log(rectangle);

const square = { type: "square", width: 5 } satisfies Square;
getArea(square);
console.log(square);

const rightTriangle: RightTriangle = {
  type: "rightTriangle",
  height: 4,
  base: 5,
};
getArea(rightTriangle);
console.log(rightTriangle);
