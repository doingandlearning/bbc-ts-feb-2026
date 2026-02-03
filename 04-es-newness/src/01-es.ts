// es6 -> es2015
// es7 -> es2016
// es8 -> es2017
// es2018

// 1. Default Parameters

// (a,b) => number

function areaOfRect(length = 1, width = length) {
  return length * width;
}

// 2. Template literals

const name = "Ruby";
const team = "Bitesize Adaptive Learning";
const role = "Grad";

const summary = `${name} works at ${team} as ${role}.`;

type Greeting = "Hello" | "Bonjour" | "Gutentag"; // Union of types
let greeting: Greeting = "Hello";
const farewell = "Goodbye";

type Farewell = "Goodbye" | "Au revoir" | "Tchuss";
type Target = "World" | "Planet";
type GreetOptions = `${Greeting} ${Target}`; // Type loops
type FarewellOptions = `${Farewell} ${Target}`;
type ConversationEndpoints = GreetOptions | FarewellOptions;

const whatHeSaid: ConversationEndpoints = "Goodbye World";

type Area = "news" | "sport" | "iplayer";
type ValidUrls = `https://${Area}.bbc.co.uk`;
type NewUrls = `https://bbc.co.uk/${Area}`;
type AllUrls = ValidUrls | NewUrls;

// 3. Arrow Functions
type Operation = (a: number, b: number) => number;

const perimeterOfRect: Operation = (a, b) => a + b; // implicit return

// function -> object

const volumeOfCylinder: Operation = (height, radius) => {
  const PI = 3.14159;
  return PI * radius * radius * height;
};

// 4. var/let/const

function simulateDom() {
  var pseudoDom = {
    button1: { click: () => "" },
    button2: { click: () => "" },
    button3: { click: () => "" },
  };
  // block scope
  // never use var! use const when can and let when you have to.
  for (let i = 1; i <= 3; i++) {
    // @ts-expect-error
    var element = pseudoDom[`button${i}`];
    element.click = function () {
      return `Item ${i} is clicked.`;
    };
  }

  console.log(pseudoDom.button1.click()); // {1/1/1} {3/3/3} {1/2/3} {4/4/4}
  console.log(pseudoDom.button2.click());
  console.log(pseudoDom.button3.click());
}

simulateDom();
