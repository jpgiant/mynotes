const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const fetchUser=require("../middleware/fetchUser")

const jwt_secret = "Aabcd@fdfdfd34";

//Route 1: Creating a user with endpoint: POST "/api/auth/createuser"
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password must be 5 characters long").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=false
    // res.send(req.body)
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    //Validate if the user with duplicate email exists or not
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry! A user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const securedPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, jwt_secret);
      // console.log(authtoken)
      success=true
      res.json({ success, authtoken });
      // .then((user) => res.json(user))
      // .catch((e) => {
      //   console.log(e);
      //   res.json({ error: "Please enter a unique value", message: e.message });
      // });
    } catch (error) {
      console.log(error);
      res.status(500).send("Some error occurred");
    }
  }
);

//Route 2: Authenticating a using endpoint: POST "/api/auth/login"
router.post(
  "/login",
  [
    body("email", "Invalid email").isEmail(),
    body("password", "Password cannot be empty").exists(),
  ],
  async (req, res) => {
    //If error exists, return the error array
    const errors = validationResult(req);
    let success=false
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        success=false
        return res
          .status(400)
          .json({ success,error: "Please try with correct credentials" });
      }
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        success=false
        return res
          .status(400)
          .json({ success, error: "Please try with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, jwt_secret);
      // console.log(authtoken)
      success=true
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error);
      res.status(500).send("Sorry! Some error has occurred");
    }
  }
);

//Route 3: Get the information of user: POST /api/auth/getuser
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.log(error);
    res.status(500).send("Sorry! Some error has occurred");
  }
});

module.exports = router;
