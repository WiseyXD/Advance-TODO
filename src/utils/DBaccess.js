const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

async function createUser(email , password)
{
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new User({
        id : uuidv4(),
        email,
        password : hashedPassword,
    })
    await newUser.save();
}

module.exports = {createUser};