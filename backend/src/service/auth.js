require("dotenv").config();
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Admin = require("../models/admin");
const secretKey = process.env.SECRET_KEY;

async function createUser(email, password, username) {
    if (await Admin.findOne({ email: email })) return false;
    if (await Admin.findOne({ username })) return false;

    if (await User.findOne({ email: email })) return false;
    if (await User.findOne({ username })) return false;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        email,
        password: hashedPassword,
        username,
    });

    await newUser.save();
    return true;
}

async function checkUserInDB(email, password) {
    let exists = false;
    const existingUser = await User.findOne({ email: email });
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

async function JWTtoken(email) {
    const token = jwt.sign(email, secretKey);
    return token;
}

module.exports = { createUser, checkUserInDB, JWTtoken, secretKey };
