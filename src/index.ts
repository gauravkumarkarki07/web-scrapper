import { Scraper } from "./utils/scraper";
import { links as iotConfig } from "./websites/the-iot-store/config";

const scraper = new Scraper(iotConfig.farmSensors);

const getData = async () => {
  const products = await scraper.getProductDetails();
  console.log(products);
};

getData();
