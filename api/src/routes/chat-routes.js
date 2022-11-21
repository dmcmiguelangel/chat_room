const express = require('express');
const router = express.Router(); // new instance of Router
const { MongoDB } = require('../../database');
const db = new MongoDB();

router.get('/conversations/:userKey', async (req, res) => {
    const response = await db.conversation.findAll(req.params.userKey);
    res.status(200).send(response);
});

router.get('/chats', async (req, res) => {
    const conversationKey = await db.conversation.find({userKeySender: req.query.userKeyReceiver, userKeyReceiver: req.query.userKeySender});

    const response = await db.chat.findAll(conversationKey);
    res.status(200).send(response);
});

module.exports = router;