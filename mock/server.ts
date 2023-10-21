const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Mock users
const users = [{
    id: "88e88e8rf8jsnannm",
    username: "alex",
    email: "bobby@emai.com",
    password: "pass",
    roles: ["ROLE_ADMIN"]
},
{
    id: "modErAtorIdcsssannm",
    username: "mode",
    email: "moderatpr@emai.com",
    password: "pass",
    roles: ["ROLE_MODERATOR"]
}];

app.post('/api/v1/auth/signin', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ ...user, password: undefined, accessToken: 'mock-access-token' });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

app.post('/api/v1/auth/signup', (req, res) => {
    const { username, email, password } = req.body;
    const user = {
        id: Date.now().toString(),
        username,
        email,
        password,
        roles: ["ROLE_MODERATOR"]
    }
    users.push(user);
    res.json({ ...user, password: undefined });
});


app.get("/api/v1/test/all", (req, res) => {
    res.json("Public content");
});

app.get("/api/v1/test/user", (req, res) => {
    // Simulate checking auth header
    if (req.headers.authorization) {
        res.json("User content");
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
});

app.get("/api/v1/test/mod", (req, res) => {
    // Simulate checking auth header
    if (req.headers.authorization) {
        res.json("Moderator content");
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
});

app.get("/api/v1/inventory/items", (req, res) => {
    const items = [
        {
            "id": 1,
            "productName": "COCA COLA",
            "description": "test de update",
            "quantity": 1,
            "priceOfAcquisition": 1,
            "dateAdded": "2023-10-14T21:47:32.733736",
            "dateUpdated": "2023-10-14T23:54:52.195808"
        },
        {
            "id": 2,
            "productName": "item1",
            "description": "description for item 1",
            "quantity": 10,
            "priceOfAcquisition": 100,
            "dateAdded": "2023-10-14T22:37:56.586896",
            "dateUpdated": null
        },
        {
            "id": 3,
            "productName": "item2",
            "description": "description for item 2",
            "quantity": 120,
            "priceOfAcquisition": 100,
            "dateAdded": "2023-10-14T22:38:15.865768",
            "dateUpdated": null
        },
        {
            "id": 4,
            "productName": "item3",
            "description": "update te pup",
            "quantity": 999,
            "priceOfAcquisition": 999,
            "dateAdded": "2023-10-14T22:38:23.94303",
            "dateUpdated": "2023-10-14T23:08:41.000875"
        }
    ]
    if (req.headers.authorization) {
        res.json(items);
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});