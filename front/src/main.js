import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
//import socketio from 'socket.io-client';

import './globalComponents';
import './assets/global.css';

Vue.config.productionTip = false;

//export const SocketInstance = socketio('http://localhost:3000/');

//Vue.use(SocketInstance);

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')