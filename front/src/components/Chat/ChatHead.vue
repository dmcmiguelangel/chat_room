<template>
    <v-main>
        <div class="chat-head">
            <div class="chat-head-name">
                <div><img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" class="avatar" alt="Avatar"></div>
                <div class="user-name">{{ username }}</div>
            </div>
            <div class="chat-head-close">
                <v-btn
                    rounded
                    color="secondary"
                    dark
                    @click="closeConversationParent();"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </div>
        </div>
    </v-main>
</template>
<script>
export default {
    name: 'ChatHead',
    props: [
        'username',
        'closeConversation'
    ],
    methods: {
        closeConversationParent() {
            this.$emit('closeConversation');
        }
    }
}
</script>