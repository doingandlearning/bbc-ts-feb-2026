import readline from "node:readline/promises";

async function askForBirthday(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const answer = await rl.question("When is your birthday?");
  rl.close();
  return answer || "";
}

function isValidDate(date: Date): date is Date {
  return date instanceof Date && date.toString() !== "Invalid Date";
}

// date.toString() === "Invalid Date"
function parse(birthday: string) {
  const date = new Date(birthday);
  if (!isValidDate(date)) {
    // logging ...
    return null;
  }
  return date;
}

const userInput = await askForBirthday();
const date = parse(userInput);
console.log(`${date} - line 19`);
if (date) {
  console.log(`Your birthday is ${date.toISOString()} - line 20`);
} else {
  console.log("That date doesn't seem to be in the right form (YY-MM-DD)");
}
