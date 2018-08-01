var mysql = require('mysql');

module.exports = (function () {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'myjd'
    });
    connection.on('connection',function (connection) {
        connection.query('SET SESSION auto_increment_increment=1');
    });
    return function () {
        return connection;
    }
});


// connection.connect();