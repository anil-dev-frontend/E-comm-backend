const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP

const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        status: "N",
        message: "All fields are required!"
      });
    }
    // Check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        status: "N",
        message: "Email is already registered"
      });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    // Save user
    await newUser.save();

    return res.status(201).json({
      status: "Y",
      message: "Account created successfully",
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (error) {
    console.log("Signup Error:", error);
    return res.status(500).json({
      status: "N",
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// LOGIN

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
      return res.status(400).json({
        status: "N",
        message: "Email and password are required!"
      });
    }
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: "N",
        message: "Invalid email or password"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        status: "N",
        message: "Invalid email or password"
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    return res.status(200).json({
      status: "Y",
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });

  } catch (error) {
    console.log("Login Error:", error);
    return res.status(500).json({
      status: "N",
      message: "Server Error",
      error: error.message
    });
  }
};

// FORGOT PASSWORD
// GENERATE OTP

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // Validation
    if (!email) {
      return res.status(400).json({
        status: "N",
        message: "Email field is required!"
      });
    }
    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "N",
        message: "User with this email does not exist."
      });
    }

    // Generate 6 digit OTP
    const generatedOtp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // OTP valid for 10 minutes
    const expiresTime = new Date(
      Date.now() + 180 * 1000
    );

    // Save OTP
    user.otp = generatedOtp;
    user.otpExpires = expiresTime;

    await user.save();

    // TESTING PURPOSE ONLY
    return res.status(200).json({
      status: "Y",
      message: "OTP generated successfully",
      // Production mein ye remove karna hai
      otp: generatedOtp,
      expiresIn: "10 minutes"
    });

  } catch (error) {
    console.log("Forgot Password Error:", error);
    return res.status(500).json({
      status: "N",
      message: "Failed to generate OTP",
      error: error.message
    });
  }
};


// VERIFY OTP + CHANGE PASSWORD

const resetPassword = async (req, res) => {
  try {
    const {email,otp,newPassword} = req.body;
    // Validation
    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        status: "N",
        message:
          "Email, OTP and new password are required!"
      });
    }
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "N",
        message: "User not found."
      });
    }
    // Check OTP
    if (user.otp !== otp) {
      return res.status(400).json({
        status: "N",
        message: "Invalid OTP."
      });
    }

    // Check expiry
    if (!user.otpExpires ||new Date() > user.otpExpires) {
      return res.status(400).json({
        status: "N",
        message:
          "OTP has expired. Please request a new OTP."
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword,10);
    // Update password
    user.password = hashedPassword;
    // Remove OTP
    user.otp = null;
    user.otpExpires = null;
    await user.save();
    return res.status(200).json({
      status: "Y",
      message:
        "Your account password has been reset successfully!"
    });

  } catch (error) {
    console.log("Reset Password Error:", error);
    return res.status(500).json({
      status: "N",
      message: "Failed to update password",
      error: error.message
    });
  }
};


module.exports = {signupUser,loginUser,forgetPassword,resetPassword};