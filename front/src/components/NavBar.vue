<template>
    <nav>
        <v-app-bar
            color="accent"
            dense
            dark
        >
            
            <v-img
                class="mx-2"
                src="../assets/images/icon.png"
                max-height="40"
                max-width="40"
                contain
            ></v-img>

            <v-toolbar-title>Chat room</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-menu
                left
                bottom
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-list left>
                    <v-list-item @click="logout">
                        <v-list-item-title>
                            <v-icon dense>fas fa-sign-out-alt</v-icon>
                            Salir
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

        </v-app-bar>
    </nav>    
</template>

<script>
import SocketIoService from '../services/socketio.service';
import { mapMutations } from 'vuex';

export default {
    name: 'NavBar',
    methods: {
        ...mapMutations(['setUserInfo']),
        logout() {
            this.setUserInfo(null);
            SocketIoService.disconnect();
            this.$router.push('/');
        }
    }
}
</script>