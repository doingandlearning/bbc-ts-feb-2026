type Axis = "x" | "y" | "z";

type Vector3 = {
  x: { value: number };
  y: { value: number };
  z: { value: number };
};

// (0,1)  (0,1,2)

function getComponent(vector: Vector3, axis: Axis) {
  return vector[axis]["value"];
}
// make the variable const
// type the variable
// as const
// as type
let vec = { x: { value: 10 }, y: { value: 20 }, z: { value: 30 } };
let axis = "a";

// let axis: Axis = "axis"

if (["x", "y", "z"].includes(axis)) {
  console.log(getComponent(vec, axis as Axis)); // heavy hammer!
} else {
  console.log("Invalid Axis");
}
