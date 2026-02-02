import { location, company } from "./utils.js";
import type { VALID_URL_VALUE } from "./types.js";
import data from "./user.json" with { type: "json" };

console.log("I'm here!");

type DataType = Array<{ name: string; company: string; location: string }>;

console.log(data[0]?.location?.city);

// const checkedData: DataType = data;

function sayHello(location: string, company: string) {
  console.log(`Hello from ${location}, I work at ${company}`);
}

sayHello(location, company);

const field1: VALID_URL_VALUE = 42;
console.log(data);
