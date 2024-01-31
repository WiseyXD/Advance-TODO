require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const User = require("../models/user");
const secretKey = process.env.SECRET_KEY;

async function createAdmin(email, password, username) {
    if (await User.findOne({ email: email })) return false;
    if (await User.findOne({ username })) return false;

    if (await Admin.findOne({ email: email })) return false;
    if (await Admin.findOne({ username })) return false;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
        email,
        password: hashedPassword,
        username,
    });

    await newAdmin.save();

    return true;
}

async function checkAdminInDB(email, password) {
    let exists = false;
    const existingUser = await Admin.findOne({ email: email });
    if (existingUser) {
        const passwordMatches = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (passwordMatches) {
            exists = true;
        }
    }
    return exists;
}

module.exports = { createAdmin, checkAdminInDB };
