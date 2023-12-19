const express = require("express");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const secretKey = "83cf4473035a69381539a892cb5f918e3286b3cee03f6eb758e43ba961617e5f3b0f73036cbda4c0bd03987fff9ca4baa7d428b0360b1d2e56e2d9e37038ad86";


async function createUser(email, password) {
    let existsInDB = await User.findOne({ email: email });

    if (existsInDB) {
        return false;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        id: uuidv4(),
        email,
        password: hashedPassword,
    });

    await newUser.save();
    return true;
}

async function checkUserInDB(email, password) {
    let exists = false;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
        if (bcrypt.compare(password, existingUser.password)) {
            exists = true;
        }
    }
    
    return exists;
}

async function JWTtoken(email)
{
    const token = jwt.sign(email , secretKey)
    return token;
}


module.exports = { createUser, checkUserInDB , JWTtoken,secretKey};