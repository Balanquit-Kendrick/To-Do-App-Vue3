const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password123', // Your MySQL password
    database: 'todo_app',
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected...');
});

app.get('/todos', (req, res) => {
    db.query('SELECT * FROM todos', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/todos', (req, res) => {
    const { title } = req.body;
    db.query('INSERT INTO todos (title) VALUES (?)', [title], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, title, completed: false });
    });
});

app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { title, completed, memo } = req.body;
    db.query('UPDATE todos SET title = ?, completed = ?, memo = ? WHERE id = ?', [title, completed, memo, id], (err) => {
    if (err) {
        console.error(err);
        return res.status(500).send('Failed to update the todo');
    }
        res.sendStatus(200);
    });
});

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM todos WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
