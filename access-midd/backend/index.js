const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port,
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
});

connection.query("CREATE DATABASE am_db", (err, result) => {
    if (err) throw err;
    console.log("Database created");
});

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/test', (req, res) => {
    res.send('Testing a get url');
    connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
        if (err) throw err;
        console.log('The solution is: ', rows[0].solution);
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
