const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:String,
    price:String,
    description:String,
    image:String,
    category:String
})

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;