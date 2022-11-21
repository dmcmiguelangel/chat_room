'use strict';

const { ConversationModel } = require("../Models/ConversationModel");

class ConversatioDTO {

    /**
     * Get a collection to ConversationModel
     * @param {*} conversation
     * @returns ConversationModel
     */
    GetConversation(conversation) {
        const model = new ConversationModel();

        if (conversation == null)
            return model;

        model.userKey   = conversation.userKey;
        model.username  = conversation.username;
        model.message   = conversation.message;
        model.timestamp = conversation.timestamp;

        return model;
    }

}

module.exports = {
    ConversatioDTO
};