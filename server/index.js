const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

const ProductModel = new mongoose.model("Product",new mongoose.Schema({
    name: String,
    price: Number
}))

//Product CRUD
app.get('/products',async(req,res)=>{
    const products = await ProductModel.find();
    res.status(200).send(products);
})
app.get('/products/:id',async(req,res)=>{
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    res.status(200).send(product);
})
app.post('/products',async(req,res)=>{
    const newProduct = new ProductModel({
        name: req.body.name,
        price: req.body.price
    })
    await newProduct.save();
    res.status(201).send(`${newProduct.name} posted successfully!`)
})
app.delete('/products/:id',(req,res)=>{
    const id = req.params.id;
    ProductModel.findByIdAndDelete(id).then((x)=>{
        res.status(200).send(`${x.name} deleted successfully!`);
    });
})
app.put('/products/:id',async(req,res)=>{
    const id = req.params.id;
    const updated = await ProductModel.findByIdAndUpdate(id,{
        name: req.body.name,
        price: req.body.price
    })
    res.status(200).send(`${updated.name} updated successfully!`);
})




const DB_KEY = process.env.DB_KEY;
const DB_PASSWORD = process.env.DB_PASSWORD;
mongoose.connect(DB_KEY.replace("<password>",DB_PASSWORD))
.then(()=>{
    console.log('MONGO DB Connected!');
})
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`App running on PORT: ${PORT}`);
})