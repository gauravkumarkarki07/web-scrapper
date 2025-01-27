export const links = {
  farmSensors: {
    baseUrl: "https://www.iot-store.com.au/",
    link: "https://www.iot-store.com.au/collections/sensors/farm-sensors",
    pagination: false,
    selector: {
      productMainDivClass: ".product-grid-item",
      productName: "p",
      productPrice: "small",
      productDescription: "",
      productLink: "a",
    },
  },
} as const;
