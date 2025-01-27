import { Scraper } from "./utils/scraper";
import { links as iotConfig } from "./websites/the-iot-store/config";
import * as fs from "node:fs";

const scraper = new Scraper(iotConfig.farmSensors);
const dir = "files/";

const getData = async () => {
  const products = await scraper.getProductDetails();

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(`${dir}/product.json`, JSON.stringify(products, null, 2));
  console.log("Your data is downloaded in the files directory");
};

getData();
