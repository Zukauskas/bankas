const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { celebrate } = require('celebrate');
const Joi = require('joi');
const { v4: uuid } = require('uuid');
const md5 = require('md5');
const { readFile, writeFile } = require('fs').promises;

const app = express();
const PORT = 3003;

app.use(cors());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// GET

app.get('/accounts', async (req, res) => {
    try {
        const data = await readFile('./data/accounts.json', 'utf8');
        const accounts = JSON.parse(data);
        res.status(200).send(accounts);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// POST

app.post(
    '/accounts',
    celebrate({
        body: Joi.object({
            name: Joi.string().required().min(3),
            lastName: Joi.string().required().min(3),
        }),
    }),
    async (req, res) => {
        try {
            const data = await readFile('./data/accounts.json', 'utf8');
            const accounts = JSON.parse(data);
            const { name, lastName } = req.body;
            console.log(name, lastName);
            accounts.push({ name, lastName, id: uuid(), sum: 0 });
            await writeFile('./data/accounts.json', JSON.stringify(accounts));
            res.status(201).send(accounts);
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    }
);

// PUT

app.put('/accounts/:id', async (req, res) => {
    try {
        const data = await readFile('./data/accounts.json', 'utf8');
        const accounts = JSON.parse(data);
        const updatedAccounts = accounts.map((account) => {
            if (account.id === req.params.id) {
                return { ...req.body };
            }
            return { ...account };
        });

        await writeFile('./data/accounts.json', JSON.stringify(updatedAccounts))
        console.log(updatedAccounts)
            ;
        res.status(200).send(updatedAccounts);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// DELETE

app.delete('/accounts/:id', async (req, res) => {
    try {
        const data = await readFile('./data/accounts.json', 'utf8');
        const accounts = JSON.parse(data);
        const updatedAccounts = accounts.filter(
            (account) => account.id !== req.params.id
        );
        await writeFile('./data/accounts.json', JSON.stringify(updatedAccounts));
        res.status(200).send(updatedAccounts);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
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

            res.cookie('bankSession', tokenID);
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
        res.cookie('bankSession', '', { maxAge: -3600 });
        res.status(200).send({ message: 'Logout success' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
