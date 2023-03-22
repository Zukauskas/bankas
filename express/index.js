const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { celebrate } = require('celebrate');
const Joi = require('joi');
const { v4: uuid } = require('uuid');
const md5 = require('md5');
const { readFile, writeFile } = require('fs').promises;
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

connection.connect()
// GET

app.get('/accounts', (req, res) => {
    connection.query('SELECT * FROM users', (error, results) => {
        if (error) {
            res.status(500).send({ error: err.message });
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
                res.status(500).send({ error: err.message });
                return;
            }
        });
        connection.query('SELECT * FROM users', (error, results) => {
            if (error) {
                res.status(500).send({ error: err.message });
                return;
            }

            res.status(201).send(results);
        });
    }
);



// PUT

app.put('/accounts/:id', (req, res) => {

    const id = req.params.id;
    const { name, lastName, sum } = req.body;
    connection.query('UPDATE users SET name = ?, lastName = ?, sum = ? WHERE id = ?', [name, lastName, sum, id], (error, results) => {
        if (error) {
            res.status(500).send({ error: err.message });
            return;
        }
    });
    connection.query('SELECT * FROM users', (error, results) => {
        if (error) {
            res.status(500).send({ error: err.message });
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
            res.status(500).send({ error: err.message });
            return;
        }
    });
    connection.query('SELECT * FROM users', (error, results) => {
        if (error) {
            res.status(500).send({ error: err.message });
            return;
        }

        res.status(200).send(results);
    });
});

// set cookie

app.post('/login', async (req, res) => {
    try {
        const users = await readFile('./data/users.json', 'utf8');
        const name = req.body.name;
        const password = md5(req.body.password);
        console.log(name, password)
        const user = JSON.parse(users).find(
            (user) => user.name === name && user.password === password
        );
        if (user) {
            const tokenID = md5(uuid());
            const updatedUsers = JSON.parse(users).map((user) => {
                if (user.name === name && user.password === password) {
                    return { ...user, token: tokenID };
                }
                return { ...user };
            });

            await writeFile('./data/users.json', JSON.stringify(updatedUsers));

            res.cookie('bankSession', tokenID, {
                sameSite: 'None',
                secure: true,
                httpOnly: true,
            });
            res.status(200).send({
                message: 'Login success',
                name: user.name
            });
        } else {
            res.status(401).send({ message: 'Login failed' });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// get cookie

app.get('/login', async (req, res) => {
    try {
        const users = await readFile('./data/users.json', 'utf8');
        const token = req.cookies.bankSession;
        const user = JSON.parse(users).find((user) => user.token === token);

        if (user) {
            res.status(200).send({
                message: 'Login success',
                name: user.name
            });
        } else {
            res.status(401).send({ message: 'Login failed' });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Logout

app.post('/logout', async (req, res) => {
    try {
        const users = await readFile('./data/users.json', 'utf8');
        const token = req.cookies.bankSession;
        const updatedUsers = JSON.parse(users).map((user) => {
            if (user.token === token) {
                return { ...user, token: null };
            }
            return { ...user };
        });

        await writeFile('./data/users.json', JSON.stringify(updatedUsers));
        res.clearCookie('bankSession', {
            sameSite: 'None',
            secure: true,
            httpOnly: true,
        });
        res.status(200).send({ message: 'Logout success' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
