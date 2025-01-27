import * as cheerio from "cheerio";
import { Endpoints } from './endpoints';
import { ApiRequest } from './apiRequest';
import { ProductDetails } from "./types";
import { writeFile, mkdirSync, existsSync } from 'node:fs';

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

        if (products.length > 0) {
            const dirPath = './files';
            if (!existsSync(dirPath)) {
                mkdirSync(dirPath, { recursive: true });
            }

            writeFile(`${dirPath}/products.json`, JSON.stringify(products, null, 2), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('File written');
                }
            });
        }

        console.log("Extracted Text:", products);
    } catch (error) {
        console.error("Error while parsing HTML:", error);
    }
}

parseHtml();
