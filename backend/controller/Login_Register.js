const mongoose = require("mongoose");
const express = require("express");
const User = require("../model/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Function to handle user registration
exports.Register = async (req, res) => {
    try {
        const { name, email, password, role,skills } = req.body;

        // Check if the user already exists
        const isPresent = await User.findOne({ email });
        if (isPresent) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        if(role==''){
            role="student"
        }
        // Create a new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            skills
        });

        const savedUser = await user.save();
        res.status(201).json({
            success: true,
            user: savedUser,
            message: "User created successfully",
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error while creating the user",
            error: err.message,
        });
    }
};
exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate request body
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Both email and password are required",
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not registered",
            });
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Generate JWT payload
        const payload = {
            id: user._id,
            email: user.email,
            role: user.role, // Includes role for RBAC
        };

        // Create JWT token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

        // Set HTTP-only cookie with the token
        const cookieOptions = {
            expires: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
            httpOnly: true, // Protects cookie from client-side scripts
            secure: process.env.NODE_ENV === "production", // Secure only in production
            sameSite: "strict", // CSRF protection
        };

        res.cookie("token", token, cookieOptions);

        // Mask sensitive data in the response
        user.password = undefined;

        // Send successful login response
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user,
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during login",
            error: error.message,
        });
    }
};



exports.Logout = (req, res) => {
    try {
        // Clear the JWT cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",  
            sameSite: "strict",  
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (err) {
        console.error("Logout Error: ", err);
        return res.status(500).json({
            success: false,
            message: "Error while logging out",
            error: err.message,
        });
    }
};



exports.authStatus = (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authenticated.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ success: true, userId: decoded.id });
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid or expired token.' });
    }
};
