// getting-started.js
const mongoose = require('mongoose');

const chatsSchema = mongoose.Schema({
    //_id: ObjectId,
    conversationKey: String,
    author: String,
    message: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const chatsModel = mongoose.model('chats', chatsSchema);

module.exports = {
    chatsModel
};