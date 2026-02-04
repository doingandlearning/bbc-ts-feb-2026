type DefaultHttpResponse<BodyType> = {
  statusCode: number;
  statusText: string;
  time: Date;
  body: BodyType;
};

type JsonValue = number | boolean | string;

async function fetchData<DataShape extends {}>(
  url: string,
): Promise<DefaultHttpResponse<DataShape>> {
  const response = await fetch(url);
  const data = response.json();
  return data;
}

type GithubUserResponse = {
  name: string;
  login: string;
  location: string;
};

const response = await fetchData<GithubUserResponse>(
  "https://api.github.com/user/doingandlearning",
);
