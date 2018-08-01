var express = require('express');
var router = express.Router();
var URL = require('url');

// 加载MySQL模块
var mysql = require('mysql');

// 创建连接
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    // database: 'user',
});

// 执行连接
connection.connect();

// sql语句
var sql = 'SELECT * FROM name';
var addSql = 'INSERT INTO name(id,name,sex) VALUES(?,?,?)';

router.get('./', function (req, res, nex) {
    // 解析请求参数
    var params = URL.parse(req.url, true).query;
    var addSqlParams = [params.id, params.name, params.sex];

    // 增加
    connection.query(addSql, addSqlParams, function (err, result) {
        if (error) {
            console.log('[INSERT ERROR]', err.message);
            return;
        }
        res.send(result);
    })
});
module.exports = router;
