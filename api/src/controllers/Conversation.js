'use strict';

const crypto = require('crypto');
const { ConversatioDTO } = require('../DL/DTO/ConversationDTO');
const { ConversationResponse } = require('../DL/Responses/ConversationResponse');
const { conversationModel } = require('../schemas/ConversationSchema');
const { Chats } = require('./Chats');

const { Users } = require('./Users');

class Conversation {

    constructor() {
        if (!Conversation._instance)
            Conversation._instance = this;
        
        return Conversation._instance;
    }

    /**
     * 
     * @param string userKey 
     * @return ConversationResponse[]
     */
    findAll = async (userKey) => {
        const conversation = await conversationModel.find({ members: { $in: [ userKey ] } });
        const user = new Users();
        let chat = new Chats();
        const dto = new ConversatioDTO();
        let res = new ConversationResponse();
        let to = [];
        
        if (conversation.length > 0) {
            let differentUser = '';
            let lastMessage = null;
            for (const c of conversation) {
                differentUser = await c.members.find(x => x != userKey);
                if (differentUser != null) {
                    const userResult = await user.findUserByUserKey(differentUser);
                    if (userResult != null) {
                        lastMessage = await chat.findLastMessage(c.conersationKey);
                        if (lastMessage != null) {
                            res = dto.GetConversation({
                                userKey: userResult.userKey,
                                username: userResult.username,
                                message: lastMessage.message,
                                timestamp: lastMessage.timestamp
                            });
                            to.push(res);
                        }
                    }
                }
            }

            return to;
        }
    }

    /**
     * 
     * @param string userKeySender
     * @param string userKeyReceiver
     * @return string | null
     */
    find = async ({userKeySender, userKeyReceiver}) => {
        const conversation = await conversationModel.findOne({
            $or: [
                { 'members': [ userKeySender, userKeyReceiver ] },
                { 'members': [ userKeyReceiver, userKeySender ] }
            ]
        });
        return conversation != null ? conversation.conersationKey : null;
    }

    /**
     * 
     * @param {*} data 
     * @return bool
     */
    save = async (data) => {
        const key = crypto.randomBytes(16).toString('hex');
        const newConversation = new conversationModel({
            conersationKey: key,
            members: [
                data.userKeySender,
                data.userKeyReceiver
            ]
        });

        const res = await newConversation.save();
        return res != null ? key : null;
    }
}

module.exports = {
    Conversation
};