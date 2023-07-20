const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt =require('jsonwebtoken')

module.exports = {
  registration: async (req,res, next) => {
   
   
        console.log(req.body);
        const { name, password, address } = req.body;
        const image = req.file ? req.file.filename : null;
        console.log(image);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, password: hashedPassword, address, image });
        await user.save();
        res.status(201).json({ message: "User registered successfully!" });
   

  },

  login: async (req, res, next) => {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password." });
    }

    // If the password matches, generate a JWT token and send it as the response.
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h", // Token expires in 1 hour. You can adjust this as needed.
      }
    );
    res.status(200).json({
      message: "Login successful!",
      token: token,
    });
  },

  // Read a single User by ID
  getUser: async (req, res, next) => {
    const { id } = req.params;
    // console.log(id);
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ user });
  },

  //update a user
  updateUser: async (req, res, next) => {
    const { id } = req.params;
    const { name, password, address } = req.body;
    const image = req.file ? req.file.filename : null;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    // Update the user's data
    user.name = name || user.name; 
    user.address = address || user.address;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    if (image) {
      user.image = image;
    }
    await user.save();
    res.status(200).json({ message: "User updated successfully!", user });
  },

  //delete a user
  deleteUser:async (req,res,next)=>{
    const { id } = req.params
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "User deleted successfully!" });
  },

};
