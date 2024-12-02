const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    const bicriptedPassword = bcryptjs.hashSync(password, 10);

    const bicriptedConPassword = bcryptjs.hashSync(confirmPassword, 10);
    const newUser = await User.create({
      email,
      password: bicriptedPassword,
      confirmPassword: bicriptedConPassword,
    });
    return res
      .status(201)
      .json({ message: "User register successfuly", newUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const existedUser = await User.findOne({ email: email });
    if (!existedUser) {
      return res
        .status(404)
        .json({ success: false, message: "You have register first" });
    }

    const token = jwt.sign({ _id: existedUser._id }, process.env.JWT_SECRET);

    console.log(token);
    const { password: pass, ...rest } = existedUser._doc;
    return res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({ success: true, message: "User login successful", rest, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, login };
