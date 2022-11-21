import store from '@/store';
import { io } from 'socket.io-client';

class SocketIoService {
    socket;

    constructor() {}

    setupConnection() {
        this.socket = io(process.env.BASE_URL, {
            transports: ['websocket'],
            forceNew: true,
            upgrade: false
        });
        this._privateID();
    }

    _privateID() {
        if (!this.socket) return;

        this.socket.on('private-id', id => {
            console.log('private-id', id);
            this.socket.emit('set-connection-id', {
                socketId: id,
                userKey: store.getters.getUserInfo.userKey
            });
        });
    }

    subscribeToRefreshContacts(cb) {
        if (!this.socket) return(true);
            
        this.socket.on('refresh-contacts', data => {
            return cb(null, data);
        });
    }

    disconnect() {
        if (this.socket)
            this.socket.disconnect();
    }
    
    // Handle message receive event
    subscribeToMessages(cb) {
        if (!this.socket) return(true);
            
        this.socket.on('send-message', data => {
            return cb(null, data);
        });
    }

    subscribeToConversation(cb) {
        if (!this.socket) return(true);
            
        this.socket.on('send-conversation-key', key => {
            console.log('Conversation key received!', key);
            return cb(null, key);
        });
    }
}

export default new SocketIoService();