const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProductSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: String, required: true },
        image: { type: String, required: true },
        category: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const ProductModel = model("Product", ProductSchema);
module.exports = ProductModel; 


// {
//     "_id": "1",
//     "name": "Binary Code T-shirt",
//     "description": "A comfortable cotton t-shirt with a stylish binary code design.",
//     "price": "25.99",
//     "image": "https://i.ebayimg.com/images/g/9eAAAOSwKp9fNHZK/s-l1600.jpg",
//     "category": "popular"
//   },