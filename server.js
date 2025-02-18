const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// 创建 MySQL 连接
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'question_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// 创建题目表
app.get('/create-table', (req, res) => {
    const sql = `
        CREATE TABLE IF NOT EXISTS questions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            difficulty VARCHAR(50) NOT NULL,
            lastTestDate DATE NOT NULL,
            frequency INT NOT NULL,
            status VARCHAR(50) NOT NULL
        )
    `;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Questions table created...');
    });
});

// 获取所有题目
app.get('/questions', (req, res) => {
    const sql = 'SELECT * FROM questions';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// 添加题目
app.post('/questions', (req, res) => {
    const { title, difficulty, lastTestDate, frequency, status } = req.body;
    const sql = 'INSERT INTO questions SET ?';
    const question = { title, difficulty, lastTestDate, frequency, status };
    db.query(sql, question, (err, result) => {
        if (err) throw err;
        res.send('Question added...');
    });
});

// 更新题目
app.put('/questions/:id', (req, res) => {
    const { title, difficulty, lastTestDate, frequency, status } = req.body;
    const sql = 'UPDATE questions SET title = ?, difficulty = ?, lastTestDate = ?, frequency = ?, status = ? WHERE id = ?';
    db.query(sql, [title, difficulty, lastTestDate, frequency, status, req.params.id], (err, result) => {
        if (err) throw err;
        res.send('Question updated...');
    });
});

// 删除题目
app.delete('/questions/:id', (req, res) => {
    const sql = 'DELETE FROM questions WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send('Question deleted...');
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});