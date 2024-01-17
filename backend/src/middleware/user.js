const jwt = require("jsonwebtoken");
const { secretKey } = require("../service/auth");
function authenticateToken(req, res, next) {
    const token = req.headers.authorization;
    // const token = JSON.parse(localStorage.getItem("token"));
    if (token == null) return res.status(401).send();

    jwt.verify(token, secretKey, (err, email) => {
        if (err) {
            return res.status(403);
        }
        req.email = email;
        next();
    });
}

module.exports = authenticateToken;
