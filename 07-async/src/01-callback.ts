import fs from "node:fs";

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
// Callback hell!
fs.readFile("user.json", "utf-8", (err: Error | null, data: string) => {
  if (err) {
    console.error(err);
  }
  const user: User = JSON.parse(data);
  fs.readFile("regions.json", "utf-8", (err: Error | null, data: string) => {
    if (err) {
      console.error(err);
    }
    const regions: Regions = JSON.parse(data);
    fs.readFile("news.json", "utf-8", (err: Error | null, data: string) => {
      if (err) {
        console.error(err);
      }
      const allNews: Array<NewsArticle> = JSON.parse(data);
      const userRegionIDs = regions[user.region] ?? [];
      const userNews = allNews.filter((article) =>
        userRegionIDs.includes(article.id),
      );
      userNews.forEach((news) => {
        console.log(news.headline);
        console.log(news.content);
        console.log("--------");
      }); // cyclomatic complexity ...
    });
  });
});
