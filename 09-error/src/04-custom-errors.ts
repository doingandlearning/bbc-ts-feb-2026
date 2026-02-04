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

Error();
// ArgumentError()
URIError();
TypeError();
RangeError();
ReferenceError();
SyntaxError();
EvalError();

function isValidDate(date: Date): date is Date {
  return date instanceof Date && date.toString() !== "Invalid Date";
}

type ErrorCodes = "E101" | "E102" | "E103";
// ERR_DATE_BEFORE_RANGE, ERR_DATE_AFTER_RANGE, ERR_DATE_INVALID_FORMAT
class InvalidDateError extends Error {
  public code: ErrorCodes;

  constructor(message: string, code: ErrorCodes = "E101") {
    // this = new Error(message)
    super(message); // => new Error(message)
    this.name = "InvalidDateError";
    this.code = code;
  }
}


// {
// 	name: string,
// 	message: string,
// 	stack?: string
// 	code: ErrorCodes
// }

// date.toString() === "Invalid Date"
function parse(birthday: string) {
  const date = new Date(birthday);
  if (!isValidDate(date)) {
    // logging ...

    const err = new InvalidDateError("Date format invalid (YY-MM-DD)");
    throw err;
  }
  return date;
}

try {
  const userInput = await askForBirthday();
  const date = parse(userInput);
  console.log(`${date} - line 19`);
  if (date) {
    console.log(`Your birthday is ${date.toISOString()} - line 20`);
  } else {
    console.log("That date doesn't seem to be in the right form (YY-MM-DD)");
  }
} catch (error) {
  if (error instanceof InvalidDateError) {
    switch (error.code) {
      case "E101":
			case "E102":
				// write out to Grafana
        console.log(`${error.name}: ${error.message}`);
        break;
			
      default:
        // Logged, pinged
        console.log("Something unexpected happened");
    }
  } else (error instanceof Error) {}
}
