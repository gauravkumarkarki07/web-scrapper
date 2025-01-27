import { LinkDetails, LinkType, ProductDetails } from "../types";
import * as cheerio from "cheerio";

export class Scraper {
  constructor(private readonly links: LinkDetails) {}

  private async getWebsite(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Cannot get website");
    }
    const responseJson = await response.text();
    return responseJson;
  }

  async getProductDetails() {
    const data = await this.getWebsite(this.links.link);
    const $ = cheerio.load(data);

    const products: ProductDetails[] = [];

    $(this.links.selector.productMainDivClass).each((_, element) => {
      const name =
        $(element).find(this.links.selector.productName).text() || "No Name";
      const description =
        $(element).find(this.links.selector.productDescription).text() ||
        "No description";
      const price =
        $(element).find(this.links.selector.productPrice).text() || "No Price";
      const link = this.links.baseUrl + $(element).attr("href") || "No Link";

      products.push({ name, description, link, price });
    });

    return products;
  }
}
