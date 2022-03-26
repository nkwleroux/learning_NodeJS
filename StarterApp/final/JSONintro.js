const express = require("express");
const app = express();
const { products } = require("../data");

app.get("/", (req, res) => {
  //To print out json to server
  //res.json([{ name: "test" }, { name: "person" },products]);
  res.send('<h1>Home page</h1><a href="/api/products">products</a>');
});

//for all products
app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
});

//for specific product (dynamically add html pages)
app.get("/api/products/:productID", (req, res) => {
  // console.log(req);
  // console.log(req.params);
  const { productID } = req.params;
  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  );
  if (!singleProduct) {
    return res.status(404).send("Product does not exist.");
  }
  res.json(singleProduct);
});

//can use :productID and :reviewID as paramaters
app.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
  // const { productID } = req.params;
  // const singleProduct = products.find((product) => product.id === Number(productID));
  // if(!singleProduct){
  //   return res.status(404).send('Product does not exist.')
  // }
  // res.json(singleProduct);
});

//coding standard
//query for search?= ...
//params for :...
app.get("/api/v1/query", (req, res) => {
  console.log(`searching ${req.query}`);
  const { search, limit } = req.query;
  let sortedProducts = [...products];
  console.log(sortedProducts);
  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  if(sortedProducts.length <1){
    //example
    return res.status(200).json({success:true,data:[sortedProducts]})
  }
  res.status(200).json(sortedProducts);
});

app.listen(5000, () => {
  console.log("started");
});
