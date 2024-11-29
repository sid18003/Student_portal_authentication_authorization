const mongoose = require("mongoose");
const express = require("express");
const User = require("../model/User.js");
const jwt = require("jsonwebtoken"); 

exports.Students = async (req,res)=> {
    try {
         const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: 'Not authorized' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'teacher') {
            return res.status(403).json({ message: 'Not authorized to view this data' });
        }

         const students = await User.find({ role: 'student' });  
        
        res.status(200).json({
            success: true,
            students,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}