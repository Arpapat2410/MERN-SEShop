/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          required:
 *              - name
 *              - price
 *              - description
 *              - image
 *              - category
 *          properties:
 *              name:
 *                  type: string
 *                  description: The name of the product
 *              price:
 *                  type: string
 *                  description: The price of the product
 *              description:
 *                  type: string
 *                  description: The description of the product
 *              image:
 *                  type: string
 *                  description: The image of the product
 *              category:
 *                  type: string
 *                  description: The category of the product
 *          example:
 *              name: "Macbook Pro"
 *              price: "2000"
 *              description: "A great laptop"
 *              image: "http://example.com/macbook.jpg"
 *              category: "Electronics"
 * tags:
 *  name: Products
 *  description: The products managing API
 */

const express = require("express");
const router = express.Router();
const ProductModel = require("../models/Product.model");

/**
 * @swagger
 * /products:
 *  get:
 *      summary: Retrieve a list of Products.
 *      tags: [Products]
 *      responses:
 *          200:
 *              description: A list of products.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 *          500:
 *              description: Some error occurred.
 */


router.get("/", async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Failed to Get All Products" });
    }
});

 /**
 * @swagger
 * /products/{id}:
 *  get:
 *      summary: Retrieve a list of Products. 
 *      tags:   [Products]
 *      parameters:
 *          -   in: path
 *              name:   id
 *              required: true
 *              schema:
 *                  type:   string
 *              description: The product id
 *      responses:
 *          200:
 *              description: The product by id
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 *          400:
 *              description: Product not found
 *          500:
 *              description: Some error occurred.
 */

router.get('/:id', async(req, res) => {
    try {
        const { id } =  req.params;
        const product = await ProductModel.findById(id);
        if(! product) {
            return res.status(400).json({ message : "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Failed to Get All Products" });
    }
});




/**
 * @swagger
 * /carts:
 *  post:
 *      summary: Add a new item to the cart or update existing item.
 *      tags: [Carts]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Cart'
 *      responses:
 *          201:
 *              description: Item successfully added to the cart or updated.
 *          500:
 *              description: Internal Server Error.
 */
router.post("/", async (req, res) => {
    try {
        const { productId, email } = req.body;
        let existingCart = await CartModel.findOne({ productId, email });

        if (existingCart) {
            // อัพเดทรายการในตะกร้าสินค้าหากมีรายการอยู่แล้ว
            existingCart.quantity += req.body.quantity;
            await existingCart.save();
            res.status(201).json(existingCart);
        } else {
            // เพิ่มรายการใหม่ลงในตะกร้าสินค้าหากไม่มีรายการอยู่
            const newCart = await CartModel.create(req.body);
            res.status(201).json(newCart);
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to Add Item to Cart" });
    }
});


/**
 * @swagger
 * /products/{id}:
 *  put:
 *      summary: Update a product by ID.
 *      tags: [Products]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the product to update.
 *          schema:
 *            type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *      responses:
 *          200:
 *              description: Product updated successfully.
 *          404:
 *              description: Product not found.
 *          500:
 *              description: Some error occurred.
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
        res.status(500).json({ error: "Failed to update product" });
    }
});

/**
 * @swagger
 * /products/{id}:
 *  delete:
 *      summary: Delete a product by ID.
 *      tags: [Products]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the product to delete.
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Product deleted successfully.
 *          404:
 *              description: Product not found.
 *          500:
 *              description: Some error occurred.
 */


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await ProductModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete product" });
    }
});

module.exports = router;