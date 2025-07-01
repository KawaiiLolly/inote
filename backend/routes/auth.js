const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = "Narayanisagood$boy";

// ROUTE 1
// Create User
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email!").isEmail(),
    body("name", "Enter a valid name!").isLength({ min: 3 }),
    body("password", "Password must be at least 3 characters!").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Sorry, a user with this email already exists!" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass, // Hashed password in the 'password' field
      });

      const data = { user: { id: newUser.id } };
      const authToken = jwt.sign(data, JWT_SECRET);

      res.status(200).json({ success: true, authToken });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// ROUTE 2
// Login User
router.post(
  "/login",
  [
    body("email", "Enter a valid email!").isEmail(),
    body("password", "Password cannot be blank!").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials!" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Invalid credentials!" });
      }

      const payload = { user: { id: user.id } };
      const authToken = jwt.sign(payload, JWT_SECRET);

      res.status(200).json({ success: true, authToken });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// ROUTE 3
// get logged in user details
//POST: /api/auth/getuser . login required

router.post("/getuser", fetchUser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
