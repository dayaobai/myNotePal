console.log("db")
const mysql = require('mysql');

function connectToDatabase () {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'ztksql'
    });

    // 连接数据库  
    connection.connect(err => {
        if (err) {
            console.error('数据库连接失败: ' + err.stack);
            return;
        }
        console.log('数据库连接成功，连接ID:' + connection.threadId);
    });
    return connection;
};


// 查询数据库的函数（修正 connection 未定义的问题）
const queryDatabase = (sql, callback) => {
    const connection = connectToDatabase(); // 这里创建数据库连接
    if (!connection) {
        callback(new Error("数据库连接失败"), null);
        return;
    }

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('数据库查询失败:', err);
            callback(err, null);
        } else {
            callback(null, results);
        }

        connection.end(); // 关闭数据库连接
    });
};



// // 处理进程关闭时断开数据库连接
// process.on('exit', () => {
//     connection.end();
//     console.log('数据库连接已关闭');
// });

module.exports = { connectToDatabase, queryDatabase };