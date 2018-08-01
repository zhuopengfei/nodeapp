var express = require('express');
var expressJWT = require('express-jwt');
var app = express();
var router = express.Router();
var connection = require('../database/config');
var connect = connection();


module.exports = router;
