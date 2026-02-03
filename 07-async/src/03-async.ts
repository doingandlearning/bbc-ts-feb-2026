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

async function getData() {
  try {
    const userPromise = fs.readFile("user.json", "utf-8");
    const regionsPromise = fs.readFile("regions.json", "utf-8");
    const allNewsPromise = fs.readFile("news.json", "utf-8");

    // let newVariable: Awaited<typeof userPromise>;

    // const [userString, regionsString, newsString] = await Promise.all([
    //   userPromise,
    //   regionsPromise,
    //   allNewsPromise,
    // ]);

    const userString = await userPromise;
    const regionsString = await regionsPromise;
    const newsString = await allNewsPromise;

    const user: User = JSON.parse(userString); // response.json()
    const regions: Regions = JSON.parse(regionsString);
    const allNews: Array<NewsArticle> = JSON.parse(newsString);

    const userRegionIDs = regions[user.region] ?? [];
    const userNews = allNews.filter((article) =>
      userRegionIDs.includes(article.id),
    );
    userNews.forEach((news) => {
      console.log(news.headline);
      console.log(news.content);
      console.log("--------");
    });
  } catch (err) {}
}
