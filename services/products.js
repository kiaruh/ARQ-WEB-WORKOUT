const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const products = require("../mocks/products.json");

class ProductsService {
  fields = ["name", "description", "time"];

  getAll = () => {
    return products;
  }

  get = id => {
    const product = products.find(product => product.id === id);
    if (!product) {
      throw new Error("Product does not exist");
    }
    return product;
  }

  create = product => {
    product.id = uuidv4();
    products.push(product);
    fs.writeFileSync("mocks/products.json", JSON.stringify(products));
    return product;
  }

  update = product => {
    const productIndex = products.findIndex(pProduct => pProduct.id === product.id);
    if (productIndex === -1) {
      throw new Error("Product does not exist");
    }
    products[productIndex] = product;
    fs.writeFileSync("mocks/products.json", JSON.stringify(products));
    return product;
  }

  delete = id => {
    const productIndex = products.findIndex(pProduct => pProduct.id === id);
    if (productIndex === -1) {
      throw new Error("Product does not exist");
    }
    products.splice(productIndex, 1);
    fs.writeFileSync("mocks/products.json", JSON.stringify(products));
    return true;
  }
}

module.exports = new ProductsService();
