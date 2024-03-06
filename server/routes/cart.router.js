/**
 * @swagger
 * components:
 *  schemas:
 *      Cart:
 *          type: object
 *          required:
 *              - productId
 *              - email
 *              - name
 *              - price
 *              - image
 *              - quantity
 *          properties:
 *              productId:
 *                  type: string
 *                  description: The productId of the Cart item
 *              email:
 *                  type: string
 *                  description: The email of the Cart item
 *              name:
 *                  type: string
 *                  description: The name of the Cart item
 *              price:
 *                  type: string
 *                  description: The price of the Cart item
 *              image:
 *                  type: string
 *                  description: The image of the Cart item
 *              quantity:
 *                  type: string
 *                  description: The quantity of the Cart item
 *          example:
 *              productId: "60c5xxxxx"
 *              email: "Aon24_za@gmail.com"
 *              name: "Macbook Pro"
 *              price: "2000"
 *              image: "http://example.com/macbook.jpg"
 *              quantity: 5
 * tags:
 *  name: Carts Item
 *  description: The products managing API
 */

const express = require("express");
const router = express.Router();
const CartModel = require("../models/Cart.model")

/**
 * @swagger
 * /carts:
 *  get:
 *      summary: Retrieve a list of cart item.
 *      tags: [Carts]
 *      responses:
 *          200:
 *              description: A list of products.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Cart'
 *          500:
 *              description: Some error occurred.
 */


router.get("/", async (req, res) => {
    try {
        const carts = await CartModel.find();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ error: "Failed to Get All Products" });
    }
});


/**
 * @swagger
 * /carts/{email}:
 *  get:
 *    summary: Retrieve cart items by email.
 *    tags: [Carts]
 *    parameters:
 *      - in: path
 *        name: email
 *        required: true
 *        description: Email of the customer.
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: A list of cart items.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Cart'
 *      404:
 *        description: Cart items not found.
 *      500:
 *        description: Internal Server Error.
 */
router.get("/:email", async (req, res) => {
    const { email } = req.params; // ดึงค่า email จาก URL parameters
    try {
        const carts = await CartModel.find({ email });
        if (carts.length === 0) { // ตรวจสอบว่าไม่พบรายการในตะกร้าสินค้า
            return res.status(404).json({ message: "Cart items not found" });
        }
        res.json(carts); // ส่งข้อมูลรายการในตะกร้าสินค้ากลับไป
    } catch (error) {
        res.status(500).json({ message: error.message });
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
 *              description: Item successfully added to the cart.
 *          500:
 *              description: Internal Server Error.
 */
router.post("/", async (req, res) => {
    try {
        const cart = req.body;
        const existingCart = await CartModel.findOne({ productId:cart.productId, email:cart.email });

        if (existingCart) {
            // อัพเดทรายการในตะกร้าสินค้าหากมีรายการอยู่แล้ว
            existingCart.quantity += cart.quantity;
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



module.exports = router;


/**
 * @swagger
 * /carts/{id}:
 *  put:
 *      summary: Update a cart item by ID.
 *      tags: [Carts]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID of the cart item to update.
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Cart'
 *      responses:
 *          200:
 *              description: Cart item updated successfully.
 *          404:
 *              description: Cart item not found.
 *          500:
 *              description: Internal Server Error.
 */
router.put("/:id", async (req, res) => {
    try {
        const updatedCart = await CartModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCart) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: "Failed to update cart item" });
    }
});



/**
 * @swagger
 * /carts/{id}:
 *  delete:
 *      summary: Delete a cart item by ID.
 *      tags: [Carts]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID of the cart item to delete.
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Cart item deleted successfully.
 *          404:
 *              description: Cart item not found.
 *          500:
 *              description: Internal Server Error.
 */

router.delete("/:id", async (req, res) => {
    try {
        const deletedCartItem = await CartModel.findByIdAndDelete(req.params.id);
        if (!deletedCartItem) {
            res.status(404).json({ error: "Cart item not found" });
            return;
        }
        res.status(200).json({ message: "Cart item deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to Delete Cart Item" });
    }
});

/**
 * @swagger
 * /carts/clear/{email}:
 *  delete:
 *      summary: Delete all items from the cart of a specific email.
 *      tags: [Carts]
 *      parameters:
 *        - in: path
 *          name: email
 *          required: true
 *          description: Email of the customer whose cart items to be deleted.
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: All items of the cart deleted successfully.
 *          404:
 *              description: Cart items not found for the provided email.
 *          500:
 *              description: Internal Server Error.
 */
router.delete("/clear/:email", async (req, res) => {
    const { email } = req.params;
    try {
        const deletedCart = await CartModel.deleteMany({ email });
        if (deletedCart.deletedCount > 0) {
            return res.status(200).json({ message: "All items of the cart deleted successfully" });
        }
        res.status(404).json({ error: "Cart items not found for the provided email" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete cart items" });
    }
});


module.exports = router;