import Vue from 'vue';

import NavBar from './components/NavBar';

const components = {
    NavBar
};

Object.entries(components).forEach(([name, component]) => { Vue.component(name, component); });