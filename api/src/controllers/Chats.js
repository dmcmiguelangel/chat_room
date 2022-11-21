'use strict';

const { ChatDTO } = require('../DL/DTO/ChatDTO');
const { ChatResponse } = require('../DL/Responses/ChatResponse');
const { chatsModel } = require('../schemas/ChatSchema');

class Chats {

    constructor() {
        if (!Chats._instance)
            Chats._instance = this;
        
        return Chats._instance;
    }

    /**
     * @param string conversationKey
     * @return ChatResponse | null
    */
    findLastMessage = async (conversationKey) => {
        const lastChat = await chatsModel.findOne({ conversationKey: conversationKey }).sort({$natural:-1})
        
        if (lastChat != null) {
            const dto = new ChatDTO();
            let res = new ChatResponse();

            res = dto.GetChat(lastChat);
            return res;
        }
        return null;
    }

    /**
     * @param string userKey
     * @param {*} data
    */
    save = async (userKey, data) => {
        const newRecord = new chatsModel({
            conversationKey: data.conversationKey,
            author: userKey,
            message: data.message
        });

        await newRecord.save();
    }

    /**
     * @param string conversationKey
     * @return ChatResponse[] | []
    */
    findAll = async (conversationKey) => {
        let res = [];
        const chats = await chatsModel.find( { conversationKey: conversationKey } );
        
        if (chats.length > 0) {
            let dto = new ChatDTO();
            let to = new ChatResponse();

            chats.map(r => {
                to = dto.GetChat(r);
                res.push(to);
            });
        }
        return res;
    }

}

module.exports = {
    Chats
};