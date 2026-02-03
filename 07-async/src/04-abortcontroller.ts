const ac = new AbortController();

// .abort()  -> signal

async function run() {
  try {
    const response = await fetch(
      "https://api.github.com/users/doingandlearning",
      { signal: ac.signal },
    );
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

run();

async function doSomething(signal: typeof ac.signal) {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new Error("Aborted!"));
    }

    const onAbort = () => {
      clearTimeout(workTimer);
      const err = new Error("Aborted");
      (err as any).name = "AbortError";
      reject(err);
    };

    signal.addEventListener("abort", onAbort, { once: true });

    const workTimer = setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve("Done!");
    }, 5000);
  });
}
doSomething(ac.signal);
setTimeout(() => ac.abort(), 3000);
