const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { v4: uuid } = require('uuid');
const md5 = require('md5');
const mysql = require('mysql')

const app = express();
const PORT = 3003;

app.use(cors());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'users'
})

connection.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Connected to database');
    }
})


// GET

app.get('/accounts', (req, res) => {
    connection.query('SELECT * FROM users', (error, results) => {
        if (error) {
            res.status(500).send({ message: error });
            return;
        }
        res.status(200).send(results);
    });


});

// POST

app.post(
    '/accounts', (req, res) => {
        const { name, lastName } = req.body;
        connection.query('INSERT INTO users (name, lastName) VALUES (?, ?)', [name, lastName], (error, results) => {
            if (error) {
                res.status(500).send({ message: error });
                return;
            }
        });
        connection.query('SELECT * FROM users', (error, results) => {
            if (error) {
                res.status(500).send({ message: error });
                return;
            }

            res.status(201).send(results);
        });

    });



// PUT

app.put('/accounts/:id', (req, res) => {

    const id = req.params.id;
    const { name, lastName, sum } = req.body;
    connection.query('UPDATE users SET name = ?, lastName = ?, sum = ? WHERE id = ?', [name, lastName, sum, id], (error, results) => {
        if (error) {
            res.status(500).send({ message: error });
            return;
        }
    });
    connection.query('SELECT * FROM users', (error, results) => {
        if (error) {
            res.status(500).send({ message: error });
            return;
        }

        res.status(200).send(results);
    });


});

// DELETE

app.delete('/accounts/:id', async (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send({ message: error });
            return;
        }
    });
    connection.query('SELECT * FROM users', (error, results) => {
        if (error) {
            res.status(500).send({ message: error });
            return;
        }

        res.status(200).send(results);
    });

});

// set cookie

app.post('/login', async (req, res) => {

    let { name, password } = req.body;
    password = md5(password)
    connection.query('SELECT * FROM accounts WHERE name = ? AND password = ?', [name, password], (error, results) => {
        if (error) {
            res.status(500).send({ message: 'Login failed' });
            return;
        }
        if (results.length > 0) {
            const tokenID = md5(uuid());
            connection.query('UPDATE accounts SET tokenID = ? WHERE name = ? AND password = ?', [tokenID, name, password], (error, results) => {
                if (error) {
                    res.status(500).send({ message: 'Login failed' });
                    return;
                }
            });
            res.cookie('bankSession', tokenID, {
                sameSite: 'None',
                secure: true,
                httpOnly: true,
            });
            res.status(200).send({
                message: 'Login success',
                name: name
            });
        }
        else {
            res.status(401).send({ message: 'Login failed' });
        }
    });

});

// get cookie

app.get('/login', async (req, res) => {
    const token = req.cookies.bankSession;
    connection.query('SELECT * FROM accounts WHERE tokenID = ?', [token], (error, results) => {
        if (error) {
            res.status(500).send({ message: 'Login failed' });
            return;
        }
        if (results.length > 0) {
            res.status(200).send({
                message: 'Login success',
                name: results[0].name
            });
        }
        else {
            res.status(401).send({ message: 'Login failed' });
        }
    }
    );
});

// Logout

app.post('/logout', async (req, res) => {
    const token = req.cookies.bankSession;
    connection.query('UPDATE accounts SET tokenID = null WHERE tokenID = ?', [token], (error, results) => {
        if (error) {
            res.status(500).send({ message: 'Logout failed' });
            return;
        }
    });
    res.clearCookie('bankSession', {
        sameSite: 'None',
        secure: true,
        httpOnly: true,
    });
    res.status(200).send({ message: 'Logout success' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
