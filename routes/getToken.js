var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');

var secretOrPrivateKey = 'Hello,express-jwt';

// 生产token
app.get('/getToken', function (req, res) {
    res.json({
        result: 'ok',
        token: jwt.sign({
            name: 'Tony',
            data: '========'
        }, secretOrPrivateKey, {
            expiresIn: 60 * 1
        })
    });
})