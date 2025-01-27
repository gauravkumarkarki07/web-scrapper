import * as cheerio from "cheerio";
import { Endpoints } from './endpoints';
import { ApiRequest } from './apiRequest';
import { ProductDetails } from "./types";

const api = new ApiRequest();
const endpoints = new Endpoints();

const products:ProductDetails[]=[];

async function parseHtml() {
    try {
        const html = await api.fetchData(endpoints.iotDevices);
        const $ = cheerio.load(html);

        $('.product-grid-item').each((index, element) => {
            const name = $(element).find('p').text().trim() || "No name available";
            const price = $(element).find('.product-item--price').find('span.visually-hidden').first().text().trim();
            const description = $(element).find('.product-description').text().trim() || "No description available";
            const link = $(element).attr('href');
                const fullLink =  `${endpoints.iotDevices}/${link}`;
                products.push({ name, price, description, link: fullLink });
        });

        console.log("Extracted Text:", products);
    } catch (error) {
        console.error("Error while parsing HTML:", error);
    }
}

parseHtml();
