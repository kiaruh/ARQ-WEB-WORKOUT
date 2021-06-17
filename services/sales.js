const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const sales = require("../mocks/sales.json");
const usersService = require("./users");
const productsService = require("./products");

class SalesService {
  fields = ["products", "userId", "date", "totalPrice"];

  productFields = ["id", "price"];

  getAll = () => {
    return sales;
  }

  getAllBetweenDates = (fromDate, toDate) => {
    const from = Date.parse(fromDate);
    const to = Date.parse(toDate);
    return sales.filter(sale => sale.date > from && sale.date < to);
  }

  getAllByUser = userId => {
    const userExists = usersService.get(userId);
    if (!userExists) {
      throw new Error("User does not exist");
    }
    return sales.filter(sale => sale.userId === userId);
  }

  getAllByProduct = productId => {
    const productExists = productsService.get(productId);
    if (!productExists) {
      throw new Error("Product does not exist");
    }
    return sales.filter(sale => {
      let matches = false;
      sale.products.forEach(product => {
        if (product.id === productId) {
          matches = true;
        }
      });
      return matches;
    });
  }

  get = id => {
    const sale = sales.find(sale => sale.id === id);
    if (!sale) {
      throw new Error("Sale does not exist");
    }
    return sale;
  }

  getComissionsByUser = (userId, fromDate, toDate) => {
    const userExists = usersService.get(userId);
    if (!userExists) {
      throw new Error("User does not exist");
    }
    let sales = [];
    if (fromDate && toDate) {
      sales = this.getAllBetweenDates(fromDate, toDate);
      sales = sales.filter(sale => sale.userId === userId);
    } else {
      sales = this.getAllByUser(userId);
    }
    let comissions = 0;
    sales.forEach(sale => {
      comissions += sale.totalPrice * 0.1;
    });
    return comissions;
  }

  create = sale => {
    const dataErrorMessage = this.dataErrorMessage(sale);
    if (dataErrorMessage) {
      throw new Error(dataErrorMessage);
    }
    sale.id = uuidv4();
    sales.push(sale);
    fs.writeFileSync("mocks/sales.json", JSON.stringify(sales));
    return sale;
  }

  update = sale => {
    const saleIndex = sales.findIndex(pSale => pSale.id === sale.id);
    if (saleIndex === -1) {
      throw new Error("Sale does not exist");
    }
    const dataErrorMessage = this.dataErrorMessage(sale);
    if (dataErrorMessage) {
      throw new Error(dataErrorMessage);
    }
    sales[saleIndex] = sale;
    fs.writeFileSync("mocks/sales.json", JSON.stringify(sales));
    return sale;
  }

  patch = sale => {
    const saleIndex = sales.findIndex(pSale => pSale.id === sale.id);
    if (saleIndex === -1) {
      throw new Error("Sale does not exist");
    }
    if (sale.products && sale.user) {
      const dataErrorMessage = this.dataErrorMessage(sale);
      if (dataErrorMessage) {
        throw new Error(dataErrorMessage);
      }
    }
    Object.keys(sales[saleIndex]).forEach(key => {
      if (sale[key]) {
        sales[saleIndex][key] = sale[key];
      }
    })
    fs.writeFileSync("mocks/sales.json", JSON.stringify(sales));
    return sale;
  }

  delete = id => {
    const saleIndex = sales.findIndex(pSale => pSale.id === id);
    if (saleIndex === -1) {
      throw new Error("Sale does not exist");
    }
    sales.splice(saleIndex, 1);
    fs.writeFileSync("mocks/sales.json", JSON.stringify(sales));
    return true;
  }

  dataErrorMessage = sale => {
    let message = "";
    sale.products.forEach(product => {
      const exists = productsService.get(product.id);
      if (!exists) {
        message += `Product ${product.id} doesn"t exist | `;
      }
    });
    const userExists = usersService.get(sale.userId);
    if (!userExists) {
      message += `User ${sale.userId} doesn"t exist`;
    }
    return message;
  }
}

module.exports = new SalesService();
