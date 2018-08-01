var express = require('express');
var app = express();
var router = express.Router();
var connection = require('../../database/config');
var connect = connection();
var jwt = require('jsonwebtoken');
// var multipart = require('connect-multiparty');
// var multipartMiddleware = multipart();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded


router.post('/register', bodyParser.json(), function (req, res, next) {
    // res.send(req.body);
    res.json(req.body);
    var userName = req.body['name'];
    var userPass = req.body['password'];
    var email = req.body['email'];
    res.send(userName);

    if (userName.length === 0 || userPass.length === 0 || email.length === 0) {
        console.log(11111);

        res.send('Tony!!!')
        res.status(400).json({
            code: '-200',
            msg: '用户名或密码未输入',
        });
        return;
    }
    var params = [userName, userPass, email];
    var sqlStr = 'insert into user(uname,upass,uemail)values(?,?,?);';
    connect.getConnection(function (err, conn) {
        if (err) {
            res.status(400).json({code: '-200', msg: '数据库连接失败'});
            return;
        }
    });
    connect.query(sqlStr, params, function (err, rs) {
        if (err) {
            if (err.message.include('Duplicate')) {
                res.status(400).json({code: '-200', msg: '用户名出错：用户名重复'});
                return;
            } else {
                res.status(400).json({code: '-200', msg: '注册用户出错' + err.message});
                return;
            }
        }
        res.status(200).json({code: '200', token: jwt.sign({userid: res.insertId}, 'secret')});
    });
    connect.release();
});

module.exports = router;