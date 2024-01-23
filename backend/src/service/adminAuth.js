require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const User = require("../models/user");
const secretKey = process.env.SECRET_KEY;

async function createAdmin(email, password) {
    if (await User.findOne({ email: email })) return false;

    let existsInDB = await Admin.findOne({ email: email });

    if (existsInDB) {
        return false;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
        email,
        password: hashedPassword,
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
