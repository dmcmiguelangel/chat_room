import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        userInfo: null,
        connectionId: null
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo;
        },
        getConnectionId(state) {
            return state.connectionId;
        },
        isLoggedIn(state) {
            return !!state.userInfo;
        }
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        setConnectionId(state, connId) {
            state.connectionId = connId;
        }
    },
    actions: {
    },
    modules: {
    }
})