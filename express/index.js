const express = require('express');
const cors = require('cors');
const { readFile, writeFile } = require('fs').promises;
const { v4: uuid } = require('uuid');
const { celebrate } = require('celebrate');
const Joi = require('joi');

const app = express();
const PORT = 3003;

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// GET with async/await

app.get('/accounts', async (req, res) => {
    try {
        const data = await readFile('./accounts.json', 'utf8');
        const accounts = JSON.parse(data);
        res.status(200).send(accounts);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// POST with async/await

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
            const data = await readFile('./accounts.json', 'utf8');
            const accounts = JSON.parse(data);
            const { name, lastName } = req.body;
            console.log(name, lastName);
            accounts.push({ name, lastName, id: uuid(), sum: 0 });
            await writeFile('./accounts.json', JSON.stringify(accounts));
            res.status(200).send(accounts);
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    }
);

// PUT with async/await

app.put('/accounts/:id', async (req, res) => {
    try {
        const data = await readFile('./accounts.json', 'utf8');
        const accounts = JSON.parse(data);
        const updatedAccounts = accounts.map((account) => {
            if (+account.id === +req.params.id) {
                return { ...req.body };
            }
            return { ...account };
        });

        await writeFile('./accounts.json', JSON.stringify(updatedAccounts));
        res.status(200).send(updatedAccounts);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// DELETE with async/await

app.delete('/accounts/:id', async (req, res) => {
    try {
        const data = await readFile('./accounts.json', 'utf8');
        const accounts = JSON.parse(data);
        const updatedAccounts = accounts.filter(
            (account) => account.id !== req.params.id
        );
        await writeFile('./accounts.json', JSON.stringify(updatedAccounts));
        res.status(200).send(updatedAccounts);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
