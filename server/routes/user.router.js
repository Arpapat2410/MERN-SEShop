const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model")
const verifyToken = require("../middlewares/verifyToken")
const verifyAdmin = require("../middlewares/verifyAdmin")

router.get("/", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to Get All Users" });
    }
});


router.get("/:id", async (req, res) => {
    const { id } = req.params; // ดึงค่า email จาก URL parameters
    try {
        const users = await UserModel.find({ id });
        if (users.length === 0) { // ตรวจสอบว่าไม่พบรายการในตะกร้าสินค้า
            return res.status(404).json({ message: "User not found" });
        }
        res.json(users); // ส่งข้อมูลรายการในตะกร้าสินค้ากลับไป
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const user = req.body;
        const existingUser = await UserModel.findOne({ email: user.email });

        if (existingUser) {
            return res.status(302).json({ message: "User already exists" });
        }
        if (!req.body.photoURL) {
            req.body.photoURL = "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";
        }

        const newUser = new UserModel(user);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        // แสดงข้อความแสดงข้อผิดพลาดในระดับบันทัดสำหรับการตรวจสอบปัญหา
        console.error(error);
        res.status(500).json({ error: "Failed to Add User" });
    }
});



router.put("/:id", async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to update User" });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            res.status(404).json({ error: " User not found" });
            return;
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to Delete User" });
    }
});


//Check is Admin
router.get("/admin/:email", async (req, res) => {
    try{
        const {email} = req.params;
        const user = await UserModel.findOne({ email })
        let isAdmin = false;
        if(user.role === "admin"){
            isAdmin = true;
        }
        res.json({isAdmin})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//Chang Admin to User Role
// Change User to Admin Role
router.patch("/admin/:id", verifyToken, verifyAdmin, async (req,res) => {
    try {
        const { id } = req.params;
        const updateAdmin = await UserModel.findByIdAndUpdate(
            id,
            {
                role: "admin"
            },
            {
                new: true,
                runValidators : true
            }
        )
        if(!updateAdmin) {
            res.status(404).json({ message: "User not found" });
        }
        res.json(updateAdmin)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})



//Chang User to User Role
router.patch("/user/:id", verifyToken, verifyAdmin, async (req,res) => {
    try {
        const { id } = req.params;
        const updateAdmin = await UserModel.findByIdAndUpdate(
            id,
            {
                role:"admin"
            },
            {
                new: true,
                runValidators : true
            }
        )
        if(!updateAdmin) {
            res.status(404).json({ message: " Admin not found" });
        }
        res.json(updateAdmin)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


module.exports = router;