// getting-started.js
const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
    //_id: ObjectId,
    conersationKey: String,
    members: Array,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const conversationModel = mongoose.model('conversations', conversationSchema);

module.exports = {
    conversationModel
};