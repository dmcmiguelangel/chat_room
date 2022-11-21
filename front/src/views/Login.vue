<template>

    <v-app class="secondary">
        <v-main>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="8">
                        <v-card class="elevation-12">
                            <v-window>
                                <v-window-item :value="1">
                                    <v-row>
                                        <v-col cols="12" md="8">
                                            <v-card-text class="mt-12">
                                                <h1 class="text-center display-2 primary--text">
                                                    Chat room
                                                </h1>
                                                <h4 class="text-center mlt-4">Bienvenido al chat room</h4>
                                                <v-form @submit.prevent="login();">
                                                    <v-text-field
                                                        label="Ingresa un nombre de usuario"
                                                        name="username"
                                                        prepend-icon="person"
                                                        type="text"
                                                        color="info"
                                                        :maxlength="30"
                                                        v-model="username"
                                                    />
                                                </v-form>
                                            </v-card-text>
                                            <div class="text-center mt-3 mb-3">
                                                <v-btn
                                                    rounded
                                                    color="accent"
                                                    dark
                                                    :loading="loading"
                                                    @click="login();"
                                                >
                                                    <v-icon>mdi-login</v-icon>&nbsp;Ingresar
                                                </v-btn>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="4" class="primary">
                                            <v-card-text class="white--text mt-12">
                                                <div class="text-center">
                                                    <img src="../assets/images/icon.png" alt="Logo" />
                                                </div>
                                                <h3 class="text-center">Bienvenido a tu chat personal</h3>
                                            </v-card-text>
                                        </v-col>
                                    </v-row>
                                </v-window-item>
                            </v-window>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>

</template>

<script>
import HTTP from '../../http-common';
import { mapMutations } from 'vuex';

export default {
    name: 'LoginView',
    data: () => ({
        loading: false,
        username: ''
    }),
    methods: {
        ...mapMutations(['setUserInfo']),
        async login() {
            if (this.username.trim() == '') return;

            this.loading = true;
            await HTTP.post(
                'api/user/verify',
                {
                    username: this.username
                }
            )
            .then(res => {
                if (res.status == 200) {
                    this.setUserInfo({
                        userKey: res.data.userKey,
                        username: res.data.username
                    });
                    this.$router.push({ name: 'ChatRoom' });
                }
            }).catch(e => {
                console.error(e);
            })
            .finally(() => {
                this.loading = false;
            });
        }
    }
}
</script>