// var express = require('express');
// var expressJWT = require('express-jwt');
// var app = express();
//
// var secretOrPrivateKey = 'Hello,express-jwt';
//
// app.use(expressJWT({
//     secret: secretOrPrivateKey
// }).unless({
//     path: ['/getToken']
// }));
//
// // 检验token失败时的处理 token过期/无效
// app.use(function (err, req, res, next) {
//     if (err.name === 'UnauthorizedError') {
//         res.status(401).send('invalid token....');
//     }
// });

module.exports = router;
