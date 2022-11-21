const { ConnectionsModel } = require('../DL/Models/ConnectionsModel');

class Connections {
    
    socketConnections = [];

    saveConnection = (socketId, userKey) => {
        const conn = new ConnectionsModel();

        conn.socketId = socketId;
        conn.userKey  = userKey;

        this.socketConnections.push(conn);
    }

    deleteConnection = (socketId) => {
        if (this.socketConnections.length > 0) {
            const index = this.socketConnections?.findIndex(
                o => {
                    return o?.socketId == socketId
                }
            );
            delete this.socketConnections[index];
        }
    }

    getSocketIdByUserKey = (userKeyReceiver) => {
        const res = this.socketConnections?.find(r => r?.userKey == userKeyReceiver);
        return res != null ? res.socketId : null;
    }

}

module.exports = {
    Connections
};