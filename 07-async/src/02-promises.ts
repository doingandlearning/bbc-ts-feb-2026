import fs from "node:fs/promises";

interface User {
  name: string;
  age: number;
  region: string;
}

type Regions = Record<string, string[]>;

type NewsArticle = {
  id: string;
  headline: string;
  content: string;
};

// Promise ->
//     pending
//     settled ->  resolved ✅, rejected 😿

let user: User;
let regions: Regions;
let allNews: NewsArticle[];

fs.readFile("user.json", "utf-8")
  .then((data) => {
    user = JSON.parse(data);
    return fs.readFile("regions.json", "utf-8");
  })
  .then((data) => {
    regions = JSON.parse(data);
    return fs.readFile("news.json", "utf-8");
  })
  .then((data) => {
    allNews = JSON.parse(data);
    const userRegionIDs = regions[user.region] ?? [];
    const userNews = allNews.filter((article) =>
      userRegionIDs.includes(article.id),
    );
    userNews.forEach((news) => {
      console.log(news.headline);
      console.log(news.content);
      console.log("--------");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// 1 -> 2 -> 3

// 1 ->
// 2 ->
// 3 ->
Promise.all([
  fs.readFile("user.json", "utf-8"),
  fs.readFile("regions.json", "utf-8"),
  fs.readFile("news.json", "utf-8"),
]).then(([userString, regionString, newsString]) => {
  user = JSON.parse(userString);
  regions = JSON.parse(regionString);
  allNews = JSON.parse(newsString);
  const userRegionIDs = regions[user.region] ?? [];
  const userNews = allNews.filter((article) =>
    userRegionIDs.includes(article.id),
  );
  userNews.forEach((news) => {
    console.log(news.headline);
    console.log(news.content);
    console.log("--------");
  });
});

Promise.allSettled([
  fs.readFile("uer.json", "utf-8"),
  fs.readFile("regions.json", "utf-8"),
  fs.readFile("news.json", "utf-8"),
]).then(([userObj, regionsObj, newsObj]) => {
  user =
    userObj.status === "fulfilled"
      ? JSON.parse(userObj.value)
      : { region: "SE" };
});
