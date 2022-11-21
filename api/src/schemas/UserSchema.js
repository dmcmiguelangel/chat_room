// getting-started.js
const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    userKey: String,
    username: String,
    connectionId: String,
    created: { 
        type: Date,
        default: Date.now
    }
});

const usersModel = mongoose.model('users', usersSchema);

module.exports = {
    usersModel
};