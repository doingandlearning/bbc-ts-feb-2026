interface Apple {
  type: "apple";
  isGoodForBaking: boolean;
  ripe: boolean;
  color: "red" | "green";
}

interface Orange {
  type: "orange";
  numOfSegments: number;
  ripe: boolean;
}

function pickFruit(fruit: Apple | Orange) {
  fruit;
  if ("isGoodForBaking" in fruit) {
    return fruit;
  } else if ("numOfSegments" in fruit) {
    return fruit;
  }
  fruit;
}

// Discriminated Union

interface LoadingState {
  status: "loading";
  progress?: number;
}

interface SuccessState {
  status: "success";
  data: {};
  timestamp: Date;
}

interface ErrorState {
  status: "error";
  error: Error;
  retryable: boolean;
}

type States = LoadingState | SuccessState | ErrorState;

function evaluateState(state: States) {
  state;
  if (state.status === "error") {
    state;
  }
  // if value === target
  switch (state.status) {
    case "loading":
      state;
      break;
    case "success":
      state;
      break;
    case "error":
      state;
      break;
    default:
      state;
  }
}

// function handleResponse(response) {
//   return match (response) {
//     when ({ status: 200, data }) -> data
//     when ({ status: 401 }) -> throw new Error(’Unauthorized’)
//     when ({ status: 404 }) -> throw new Error(’Not Found’)
//     when ({ status: s if s >= 500 }) -> throw new Error(’Server Error’)
//     default -> throw new Error(’Unknown Error’)
//   };
// }
// 5 |> (x => x *2)
