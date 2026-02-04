function firstElement<ElementType>(
  a: ElementType[],
  position: number,
): ElementType | undefined {
  const element = a[position];
  return element;
}

const a_s = ["a", "b", "c"];
const a_n = [1, 2, 3];
const a_m = ["a", 2, "c", true];

const element = firstElement(a_m, 2);

interface GithubUserResponse {
  name: string;
  login: string;
  location: string;
}

async function fetchData<DataShape>(url: string): Promise<DataShape> {
  const response = await fetch(url);
  const data = response.json();
  return data;
}

const data = await fetchData<GithubUserResponse>(
  "https://api.github.com/users/doingandlearning",
);

const getSecondElement = <T>(a: T[]): T | undefined => a[1];
