import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import 'vuetify/dist/vuetify.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true
        },
        themes: {
            light: {
                primary: '#01C9E0',
                secondary: '#424242',
                accent: '#007987',
                error: '#FF5252',
                info: '#01C9E0',
                success: '#4CAF50',
                warning: '#FFC107',
				dark: '#000000'
            }
        }
    },
    icons: {
        iconfont: 'md' || 'fa' || 'fab'
    }
});