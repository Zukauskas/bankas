const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3003;
app.use(express.json());
app.use(cors());
// Route to handle POST request at /accounts endpoint
app.post('/accounts', (req, res) => {
    const accountData = req.body;
    console.log('Received account data:', accountData);

    // Write the account data to the accounts.json file
    fs.writeFile('accounts.json', JSON.stringify(accountData), (err) => {
        if (err) {
            console.error('Error writing account data to file: ', err);
            res.sendStatus(500); // Send a server error status code (500 Internal Server Error) back to the client
        } else {
            console.log('Account data written to file successfully');
            res.sendStatus(200); // Send a success status code (200 OK) back to the client
        }
    });
});

app.get('/accounts', (req, res) => {
    fs.readFile('accounts.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading account data from file: ', err);
            res.sendStatus(500); // Send a server error status code (500 Internal Server Error) back to the client
        } else {
            console.log('Retrieved account data from file successfully');
            const accounts = JSON.parse(data);
            res.json(accounts); // Send the retrieved account data back to the client
        }
    });
});

app.listen(port, () => {
    console.log(`Bank app listening on port ${port}`);
});
