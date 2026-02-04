export async function fakeFetch(url: string) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, 2000);
  }); // sleep(2) - simulate a delay!
  if (url === "http://error.com") throw Error("network error");
  return Buffer.from("some other data!!!");
}
