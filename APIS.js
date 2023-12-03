const express = require("express");
const path = require("path");
const port = 1000;
const app = express();
app.use(express.urlencoded({
    extended:true,
}));
app.use(express.json());
let products = [];
app.get("/",(req,res,next)=>{
    res.status(200).sendFile(path.join(__dirname,"views/index.html"))
});
// post is use for create;
app.post("/api/addproduct", (req,res,next)=>{
    const {name, price} = req.body;
    products.push({name, price});
    res.status(201).send("products add successfully")
});
app.route('/api/products').get((req,res,next)=>{
    res.status(200).send(products)
});
//read : Put
app.route('/api/products/:productIndex').get((req,res)=>{
    let {productIndex} = req.params
    productIndex = Number(productIndex);
    if(!products[productIndex]){
        return res.status(404).send("product not found")
    }
    res.status(200).send(products[productIndex])
});
// update
app.route('/api/products/:productIndex').put((req,res)=>{
    let {productIndex} = req.params
    const {name, price} = req.body
    productIndex = Number(productIndex);
    if(!products[productIndex]){
        return res.status(404).send("product not found")
    }
    products[productIndex].name = name;
    products[productIndex].price = price;
    res.status(200).send(products[productIndex])
});
// delete
app.route('/api/products/:productIndex').delete((req,res)=>{
    let {productIndex} = req.params;
    productIndex = Number(productIndex);
    if(!products[productIndex]){
        return res.status(404).send("product not found")
    }
    products.splice(productIndex, 1)
    res.status(200).send("product deleted successfully")
});

app.listen(port, ()=>console.log(`server is running on port no : ${port}`));