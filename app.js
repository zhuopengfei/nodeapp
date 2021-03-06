var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var swig = require('swig');
var bodyParser = require("body-parser");



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var add = require('./routes/add');
var del = require('./routes/delete');
var edit = require('./routes/edit');
var search = require('./routes/search');
// var login = require('./routes/login/login'); // 登入
var register = require('./routes/register/register'); // 注册
// var getToken = require('./routes/getToken'); // 获取token

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'dist'));
// app.set('view engine', 'jade');
// app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/dist')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// 路由信息
app.use('/', indexRouter);
app.use('/api', usersRouter);
app.use('/api', add); // 增加
app.use('/api', del); // 删除
app.use('/api', edit); // 修改
app.use('/api', search); // 查询
// app.use('/api/login', login); // 登入
app.use('/api', register); // 注册
// app.use('/api/getToken',getToken); //获取token


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    // res.status(err.status || 500);
    // res.render('error');
    next();
});

module.exports = app;
