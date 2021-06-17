const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.HTTP_PORT || 3000;

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const salesRouter = require("./routes/sales");

app.use(bodyParser.json());
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/sales", salesRouter);

app.listen(port, () => {
  console.log(`Server started and listening at http://localhost:${port}`);
});