'use strict';

const crypto = require('crypto');
const { usersModel } = require('../schemas/UserSchema');
const { UsersDTO } = require('../DL/DTO/UserDTO');
const { UserResponse } = require('../DL/Responses/UserResponse');

class Users {

    constructor() {
        if (!Users._instance)
            Users._instance = this;
        
        return Users._instance;
    }

    /**
     * @param string username
     * @return UserResponse
    */
    findUser = async (username) => {
        username = username.trim();
        
        let user = await usersModel.findOne({ username: username });
        
        if (user == null) {
            await this.save(username);
            user = await usersModel.findOne({ username: username });
        }

        let dto = new UsersDTO();
        let userResponse = new UserResponse();
        userResponse = dto.GetUser(user);
        return userResponse;
    }

    /**
     * @param string username
     * @return UserResponse
    */
    findUserByUserKey = async (userKey) => {        
        let user = await usersModel.findOne({ userKey: userKey });

        let dto = new UsersDTO();
        let userResponse = new UserResponse();
        userResponse = dto.GetUser(user);
        return userResponse;
    }

    /**
     * @param string userId
     * @param string connectionId
     * @return bool
    */
    saveConnId = async (userKey, socketId) => {
        const res = await usersModel.updateOne(
            { userKey: userKey },
            {
                $set: { connectionId: socketId }
            }
        );
    }

    /**
     * @param string username
     * @param string socketId
     * @return bool
    */
    save = async (username, socketId = null) => {
        const newUser = new usersModel({
            userKey: crypto.randomBytes(16).toString('hex'),
            username: username,
            connectionId: socketId
        });

        const res = await newUser.save();
        return res != null;
    }

    /**
     * @param string socketId
     * @return UserResponse[]
    */
    findAll = async (userKey) => {
        let res = [];
        const all = await usersModel.find({ 'userKey': { $ne: userKey } });

        if (all.length > 0) {
            let dto = new UsersDTO();
            let user = new UserResponse();

            all.map(r => {
                user = dto.GetUser(r);
                res.push(user);
            });
        }
        return res;
    }

    /**
     * 
     * @param string userKeyReceiver 
     */
    getSocketIdByUserKey = async (userKeyReceiver) => {
        const res = await usersModel.findOne({ userKey: userKeyReceiver });
        return res != null ? res.connectionId : null;
    }

}

module.exports = {
    Users
}