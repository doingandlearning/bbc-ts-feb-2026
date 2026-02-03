{
  function contains(text: string, search: string | RegExp) {
    if (typeof search === "string") {
      return text.includes(search);
    }
    return Boolean(search.exec(text));
  }

  const answer = contains("I love porridge", "love");
  const answer2 = contains("I love porridge", /love/);
}
{
  function contains(text: string, search: string | RegExp) {
    if (search instanceof RegExp) {
      return Boolean(search.exec(text));
    }
    return text.includes(search);
  }

  const answer = contains("I love porridge", "love");
  const answer2 = contains("I love porridge", /love/);
}
