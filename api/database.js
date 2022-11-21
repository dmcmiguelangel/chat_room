// getting-started.js
const mongoose = require('mongoose');
const { Users } = require('./src/controllers/Users');
const { Chats } = require('./src/controllers/Chats');
const { Connections } = require('./src/controllers/Connections');
const { Conversation } = require('./src/controllers/Conversation');

class MongoDB {

    users = null;
    chat = null;
    connections = null;
    conversation = null;

    constructor() {
        if (!MongoDB._instance)
            MongoDB._instance = this;
        
        return MongoDB._instance;
    }

    main = async () => {
        await mongoose.connect(`${ process.env.DB_CONNECTION }://${ process.env.DB_HOST }:${ process.env.DB_PORT }/${ process.env.DB_DATABASE }`);        
        this._initialize();
    }

    _initialize = () => {
        this.users = new Users();
        this.chat = new Chats();
        this.connections = new Connections();
        this.conversation = new Conversation();
    }

}

module.exports = {
    MongoDB
}