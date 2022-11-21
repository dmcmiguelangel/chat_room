<template>
    <v-main>
        <form @submit.prevent="sendMessageParent();">
            <div></div>
            <v-text-field
                placeholder="Escriba un mensaje"
                name="username"
                type="text"
                color="info"
                outlined
                style="height: 32px !important;"
                v-model="message"
                autofocus
            />
            <div class="form-buttons">
                <v-btn
                    rounded
                    color="accent"
                    dark
                    @click="sendMessageParent();"
                >
                    <v-icon>mdi-send</v-icon>
                </v-btn>
            </div>
        </form>
    </v-main>
</template>
<script>
export default {
    name: 'ChatFooter',
    props: [
        'sendMessage'
    ],
    data: () => ({
        message: ''
    }),
    methods: {
        sendMessageParent() {
            if (this.message.trim() == '') return;

            this.$emit('sendMessage', this.message);
            this.message = '';
        }
    }
}
</script>