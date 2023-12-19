const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { exists } = require("../models/todo");

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

checkUserInDB("aryan.s.nag@gmail.com", "Qwerty88**");

module.exports = { createUser, checkUserInDB };
