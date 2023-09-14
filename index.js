const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const secertkey = "secertkey";
app.get("/", (req, resp) => {
    resp.json({
        message: "a simple api"
    })
})
app.post("/login", (req, resp) => {
    console.log("hello inside login");
    const user = {
        id: 1,
        username: "mudassir",
        email: "mudassir.comsats2018@gmail.com"
    }
    jwt.sign({ user }, secertkey, { expiresIn: '300s' }, (err, token) => {
        resp.json({
            token
        })
    })
})
app.post("/profile", verifyToken, (req, resp) => {
    jwt.verify(req.token, secertkey, (err, authData) => {
        if (err) {
            resp.send({
                result: "invalid token"
            })
        } else {
            resp.json({
                message: "profile accessed",
                authData
            })
        }
    })
})
function verifyToken(req, resp, next) {
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    console.log(typeof bearerHeader !== undefined);
    if (typeof bearerHeader !== undefined) {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    }
    else {
        resp.send({
            result: 'Token is not valid'
        })
    }
}
app.listen(5000, () => {
    console.log("app is running on port 5000");
})