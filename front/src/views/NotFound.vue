<template>
    <v-app>
        <v-sheet class="principal-sheet">
            <v-container>
                <center>
                    <h2>Página no encontrada</h2>
                    <p>
                        <router-link :to="{ name: 'login' }">Salir</router-link>
                    </p>
                </center>
            </v-container>
        </v-sheet>
    </v-app>
</template>