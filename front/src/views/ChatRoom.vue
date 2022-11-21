<template>
    <v-app>
        <v-sheet class="principal-sheet">
            <NavBar />

            <v-row no-gutters style="height: 91vh;">
                <v-col
                    cols="3"
                    sm="3"
                >
                    <ContactList
                        @startChatParent="startChatParent"
                        @openChatParent="openChatParent"
                        ref="contactListRef"
                    ></ContactList>
                </v-col>
                <v-col
                    cols="9"
                    sm="9"
                >
                    <div class="chat">
                        <!-- CHAT HEAD -->
                            <ChatHead
                                v-if="conversation"
                                v-bind:username="userReceiver?.username"
                                @closeConversation="conversation = false;"
                            ></ChatHead>
                        <!-- ./ CHAT HEAD -->
                        <!-- CHAT BODY -->
                        <div
                            class="chat-body"
                            id="chat-body-messages"
                            v-if="conversation"
                        >
                            <component
                                v-for="(component, index) in messages"
                                :is="component.component"
                                :key="index"
                                v-bind:message="component.data"
                                v-bind:time="component.time"
                            >
                            </component>
                        </div>
                        <div
                            class="chat-body"
                            style="text-align: center;"
                            v-if="!conversation"
                        >
                            <div><img src="../assets/images/icon.png" alt="logo" /></div>
                            <div style="font-size: 20px;font-weight: bold;">Bienvenido al chat room</div>
                        </div>
                        <!-- ./ CHAT BODY -->
                        <!-- CHAT FOOTER -->
                        <div class="chat-footer">
                            <ChatFooter
                                v-if="conversation"
                                @sendMessage="sendMessage">
                            </ChatFooter>
                        </div>
                        <!-- ./ CHAT FOOTER -->
                    </div>
                </v-col>
            </v-row>

        </v-sheet>
    </v-app>
</template>

<script>
import HTTP from '../../http-common';
import ContactList from '../components/ContactList';
import MessageSent from '../components/Messages/MessageSent';
import MessageReceived from '../components/Messages/MessageReceived';
import SocketIoService from '../services/socketio.service';
import ChatHead from '../components/Chat/ChatHead';
import ChatFooter from '../components/Chat/ChatFooter';
import store from '../store/index';

export default {
    name: 'ChatRoom',
    components: {
        ContactList,
        MessageSent,
        MessageReceived,
        ChatHead,
        ChatFooter
    },
    data: () => ({
        userInfo: {},
        isConnected: false,
        conversation: false,
        userReceiver: null,
        messages: [],
        conversationKey: null
    }),
    mounted() {
        this.userInfo = store.getters.getUserInfo;
    },
    created() {
        SocketIoService.setupConnection();
        SocketIoService.subscribeToMessages((err, data) => {
            if (this.userReceiver?.userKeyReceiver == data.userKeySender) {
                this.messages.push({
                    component: MessageReceived,
                    data: data.message,
                    time: this._getTime()
                });
                this.scrollBottom();
            }
            this.$refs.contactListRef.getConversations();
        });

        /* SocketIoService.subscribeToConversation((err, key) => {
            this.conversationKey = key;
        }); */
    },
    methods: {
        scrollBottom() {
            const divContainer = document.querySelector("#chat-body-messages");
            if (divContainer)
                divContainer.scrollTop = divContainer.scrollHeight;
        },
        async sendMessage(message) {
            const time = this._getTime();
            this.messages.push({
                component: MessageSent,
                data: message,
                time: time
            });
            SocketIoService.socket.emit('new-message', {
                //conversationKey: this.conversationKey,
                userKeySender: this.userInfo.userKey,
                userKeyReceiver: this.userReceiver.userKeyReceiver,
                message: message
            });
            this.scrollBottom();
            this.$refs.contactListRef.getConversations();
        },
        _getTime() {
            const localDate = new Date();
            return localDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        },
        startChatParent(data) {
            this.userReceiver = data;
            this.conversation = true;
            this.openChatParent(data);
        },
        async openChatParent(data) {
            this.userReceiver = data;
            await HTTP.get(
                `api/chat/chats`,
                {
                    params: {
                        userKeySender: this.userInfo.userKey,
                        userKeyReceiver: data.userKeyReceiver
                    }
                }
            )
            .then(res => {
                this.messages = [];
                if (res.status == 200) {
                    res.data.map(r => {
                        if (r.author == this.userInfo.userKey) {
                            this.messages.push({
                                component: MessageSent,
                                data: r.message,
                                time: r.timestamp
                            });
                        } else {
                            this.messages.push({
                                component: MessageReceived,
                                data: r.message,
                                time: r.timestamp
                            });
                        }
                    });
                    setTimeout(() => {
                        this.scrollBottom();
                    }, 100);
                }
            })
            .catch(e => {
                console.log(e.message);
            })
            .finally(() => {
                this.conversation = true;
            });
        }
    }
}
</script>