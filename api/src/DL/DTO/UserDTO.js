'use strict';

const { UserModel } = require('../Models/UserModel');

class UsersDTO {

    /**
     * Get a collection to UserModel
     * @param {*} user
     * @returns UserModel
     */
    GetUser(user) {
        const model = new UserModel();

        if (user == null)
            return model;

        model.userKey  = user.userKey;
        model.username = user.username;

        return model;
    }

}

module.exports = {
    UsersDTO
};