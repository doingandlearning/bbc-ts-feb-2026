const num: Array<number | string> = [1, 2, 3, 4, 5];
const num2: (number | string)[] = [1, 4, 9, 16, 25];

const num3 = [...num2];
const num4 = Array.from(num3);
num3.push(36);

console.log(num3);
console.log(num2);

const people = [
  { name: "Harry", date: new Date() },
  { name: "Sophie", date: new Date() },
];
const people2 = [...people];

console.log(people2);
console.log(people);

const newPeople = JSON.parse(JSON.stringify(people));
people2[0]!.name = "Declan";
console.log(people);
console.log(newPeople);

const newerPeople = structuredClone(people);
console.log(newerPeople);

type UpdatedPerson = {
  name: string;
  date: Date;
  lengthOfName: number;
  favouriteNumber: number;
};

type AlmostUpdatedPerson = {
  name: string;
  date: Date;
  lengthOfName: number;
};

const mappedPeople: UpdatedPerson[] = newerPeople
  .map<Omit<UpdatedPerson, "favouriteNumber">>((person) => ({
    ...person,
    lengthOfName: person.name.length,
  }))
  .map<UpdatedPerson>((person) => ({
    ...person,
    favouriteNumber: Math.floor(Math.random() * 20),
  }));

console.log(mappedPeople);

const elem = document.getElementById("header");

elem?.innerText || "No text found.";

elem!.innerText; // I know better - bog off!

if (elem) {
  elem;
}

if (!elem) {
  throw new Error("Element not found");
}

// 0, '', false, NaN
elem?.accessKey?.charAt(2) || -1; // optional chaining

// nullish coalescing operator
elem?.getAttribute?.name ?? -1;
