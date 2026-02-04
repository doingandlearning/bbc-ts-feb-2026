async function test() {
  return 2;
}

// typeof  -> primitives + object + function

type returntype = Awaited<ReturnType<typeof test>>;

type GithubUserResponse = {
  name: string;
  login: string;
  location: string;
};

const data: Partial<GithubUserResponse> = {};

type ValidRegions = "NI" | "SE" | "NE" | "Scotland";

// type Regions = {
//   [key: string]: string[];
// }; // dictionary

type Regions = Partial<Record<ValidRegions, string[]>>;

const region: Regions = {
  NI: ["hello"],
};

const promise = async () => 123;

const result = promise();

type ResolvedResult = Awaited<typeof result>;

interface Todo {
  title: string;
  description: string;
  id?: number;
  completed: boolean;
  dueDate?: Date;
  nextAction: string;
}

type FetchedTodo = Required<Todo>;

const unfinishedTodo: Partial<Todo> = {};
unfinishedTodo.title = "Think about conditionals";
unfinishedTodo.description = "They are cool";
unfinishedTodo.completed = false;

type PartialTodo = Omit<Todo, "description">;
