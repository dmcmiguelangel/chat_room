'use strict';

const { ChatModel } = require("../Models/ChatModel");

class ChatDTO {

    /**
     * Get a collection to UserModel
     * @param {*} chat
     * @returns ChatModel
     */
    GetChat(chat) {
        const model = new ChatModel();

        if (chat == null)
            return model;

        model.author    = chat.author;
        model.message   = chat.message;
        model.timestamp = this._convertTimestampToLocalDateTime(chat.timestamp);

        return model;
    }

    /**
     * @param DateTime timestamp
     */
    _convertTimestampToLocalDateTime(timestamp) {
        const localDate = new Date(timestamp);
        return localDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    }

}

module.exports = {
    ChatDTO
};