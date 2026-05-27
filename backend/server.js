const express = require("express");
const app = express();
const cors = require("cors");
// const mongoose = require("mongoose");

require("dotenv").config();

const productRoutes = require("./routes/productRoutes")
const cartRoutes = require('./routes/cartRoutes');

const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());

app.use('/api/products',productRoutes);
app.use('/api/cart',cartRoutes)

//mongodb connection

const connectDb = mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Mongodb connected")
}).catch((err)=>{
    console.log("errr",err);
})

connectDb;



app.get('/',(req,res)=>{
    res.send("Hello this is workinh")
})
app.listen(port,()=>{
    console.log("App is working");
})









