<template>
    <v-main>
        <v-card
            class="contacts-container"
        >
            <v-tabs v-model="tabSelected">
                <v-tab href="#chats-tab" key="chats-tab">
                    <v-icon>mdi-message</v-icon>
                    Chats
                </v-tab>
                <v-tab href="#contacts-tab" key="contacts-tab">
                    <v-icon>mdi-contacts</v-icon>
                    Contactos
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tabSelected">
                <!-- CHATS -->
                <v-tab-item value="chats-tab">
                    <v-list-item-group
                        v-model="selectedContact"
                        color="primary"
                        v-if="conversations.length > 0"
                    >
                        <v-list-item
                            v-for="(item, i) in conversations"
                            :key="i"
                            @click="openChat(item.userKey, item.username)"
                        >
                            <v-list-item-icon>
                                <!-- <v-icon v-text="item.icon"></v-icon> -->
                                <img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" class="avatar" alt="Avatar">
                            </v-list-item-icon>
                            <v-list-item-content>
                                <!-- <v-list-item-title v-text="item.text"></v-list-item-title> -->
                                <div class="users-list-body">
                                    <!-- <div v-bind:class="item.seen ? 'seen' : ''">
                                        <h5 class="text-primary">{{ item.username }}</h5>
                                        <p>{{ item.message }}</p>
                                    </div>
                                    <div class="users-list-action">
                                        <div class="new-message-count" v-if="!item.seen">3</div>
                                        <small v-bind:class="!item.seen ? 'text-primary' : 'text-muted'">03:41 PM</small>
                                    </div> -->
                                    <div>
                                        <h5 class="text-primary">{{ item.username }}</h5>
                                        <p>{{ item.message | truncate(30) }}</p>
                                    </div>
                                    <div class="users-list-action">
                                        <small class="text-primary">{{ item.timestamp }}</small>
                                    </div>
                                </div>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                    <div
                        class="loading-contacts"
                        v-if="loadConversations"
                    >
                        <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                        ></v-progress-circular>
                        Cargando chats...
                    </div>
                    <div
                        class="loading-contacts"
                        v-if="!loadConversations && conversations.length == 0"
                    >
                        No se encontraron chats recientes
                    </div>
                </v-tab-item>
                <!-- ./ CHATS -->
                <!-- CONTACTS -->
                <v-tab-item value="contacts-tab">
                    <v-list-item-group
                        v-model="selectedContact"
                        color="primary"
                        v-if="contacts.length > 0"
                    >
                        <v-list-item
                            v-for="(item, i) in contacts"
                            :key="i"
                            @click="startChat(item, item.username);"
                        >
                            <v-list-item-icon>
                                <img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" class="avatar" alt="Avatar">
                            </v-list-item-icon>
                            <v-list-item-content>
                                <div class="users-list-body">
                                    <div v-bind:class="item.seen ? 'seen' : ''">
                                        <h5 class="text-primary">{{ item.username }}</h5>
                                    </div>
                                </div>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                    <div
                        class="loading-contacts"
                        v-if="loadContacts"
                    >
                        <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                        ></v-progress-circular>
                        Cargando contactos...
                    </div>
                    <div
                        class="loading-contacts"
                        v-if="!loadContacts && contacts.length == 0"
                    >
                        No se encontraron contactos recientes
                    </div>
                </v-tab-item>
                <!-- CONTACTS -->   
            </v-tabs-items>
        </v-card>
    </v-main>
</template>
<script>
import HTTP from '../../http-common';
import store from '../store/index';
import SocketIoService from '../services/socketio.service';

export default {
    name: 'ContactList',
    data: () => ({
        userInfo: {},
        selectedContact: null,
        contacts: [
            /* { text: 'Juan Márquez', seen: false },
            { text: 'José Jiménez', seen: true },
            { text: 'Marcos Robles', seen: true }, */
        ],
        conversations: [],
        loadContacts: true,
        loadConversations: true,
        tabSelected: 'chats-tab'
    }),
    props: [
        'startChatParent',
        'openChatParent'
    ],
    filters: {
        truncate: function(data, num) {
            if (!data) return "";
            
            data = data.toString();
            
            if (data.length > num)
                return data.substring(0, num) + "...";

            return data;
        }
    },
    created() {
        SocketIoService.subscribeToRefreshContacts((err, data) => {
            this.getContacts();
            console.log(data);
        });
        SocketIoService.subscribeToMessages((err, data) => {
            this.$emit('receiveMessage', data);
            //this.getConversations();
        });
    },
    mounted() {
        this.userInfo = store.getters.getUserInfo;
        this.getContacts();
        this.getConversations();
    },
    methods: {
        async getContacts() {
            this.contacts = [];
            await HTTP.get(`api/user/get-users/${ this.userInfo.userKey }`)
            .then(res => {
                if (res.status == 200) {
                    this.contacts = res.data;
                } else {
                    //this.$vToastify.warning(res.data.message);
                }
            })
            .catch(e => {
                console.log(e.message);
                //*this.$vToastify.error(e.message);
            })
            .finally(() => {
                this.loadContacts = false;
            });
        },
        async getConversations() {
            await HTTP.get(`api/chat/conversations/${ this.userInfo.userKey }`)
            .then(res => {
                this.conversations = res.data;
            })
            .catch(e => {
                console.log(e.message);
                //*this.$vToastify.error(e.message);
            })
            .finally(() => {
                this.loadConversations = false;
            });
        },
        startChat(item, username) {
            this.$emit('startChatParent', { userKeyReceiver: item.userKey, username: username });
        },
        openChat(userKeyReceiver, username) {
            this.$emit('openChatParent', { userKeyReceiver: userKeyReceiver, username: username });
        }
    }
}
</script>
<style scoped>
.contacts-container {
    height: 94.8vh;
    width: 100%;
    overflow: auto;
}
.contacts-container::-webkit-scrollbar {
    display: none;
}
.users-list-body {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    position: relative;
    min-width: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
}
.users-list-body p {
    white-space: nowrap;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: 0;
    color: #969696;
}
.seen h5 {
    font-weight: 600;
    color: #646464 !important;
}
.users-list-body div {
    flex: 1;
}
.users-list-action {
    padding-left: 15px;
}
.users-list-action .new-message-count {
    width: 23px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -moz-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    line-height: 0;
    font-size: 13px;
    height: 23px;
    background-color: #26a69a;
    color: #fff;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin-left: auto;
}
.users-list-action small {
    font-size: 80%;
    float: right;
}
.text-primary {
    white-space: nowrap;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: .2rem;
    color: #26a69a !important;
}
.text-muted {
    color: #6c757d!important;
}
.loading-contacts {
    margin-top: 10%;
    text-align: center;
    font-weight: bold;
}
</style>