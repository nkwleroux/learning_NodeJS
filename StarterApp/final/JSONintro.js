const express = require("express");
const app = express();
const { products } = require("../data");

app.get("/", (req, res) => {
  //To print out json to server
  //res.json([{ name: "test" }, { name: "person" },products]);
  res.send('<h1>Home page</h1><a href="/api/products">products</a>')
});

app.get('/api/products',(req,res)=>{
  const newProducts = products.map((product)=>{
    const {id,name,image} = product;
    return {id,name,image}
  })
  res.json(newProducts);

})

app.listen(5000, () => {
  console.log("started");
});
