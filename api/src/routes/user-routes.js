const express = require('express');
const router = express.Router(); // new instance of Router
const { MongoDB } = require('../../database');
const db = new MongoDB();

router.post('/verify', async (req, res) => {
    const response = await db.users.findUser(req.body.username);
    if (response != null)
        res.status(200).send(response);
    else
        res.status(500).send('Status: Internal Server Error');
});

router.get('/get-users/:userKey', async (req, res) => {
    const response = await db.users.findAll(req.params.userKey);
    res.status(200).send(response);
});

module.exports = router;