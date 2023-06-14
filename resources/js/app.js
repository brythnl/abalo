import './bootstrap';
import { createApp } from 'vue';

import VueScrollUp from 'vue-scroll-up';
import NavBar from './navbar.js';
import SiteHeader from './siteheader.js';
import SiteBody from './sitebody.js';
import SiteFooter from './sitefooter.js';
import NewArticle from './sitenewarticle.js';

let conn = new WebSocket('ws://localhost:8085/nachricht');

conn.onmessage = function(e) {
    console.log('Received', e.data);
    alert(e.data);
};

Vue.createApp({
    components: {
        NavBar,
        SiteHeader,
        SiteBody,
        SiteFooter,
        NewArticle,
        VueScrollUp
    },
    data() {
        return {
            showImpressum: false,
        };
    },
    methods: {
        toggleImpressum() {
            this.showImpressum = !this.showImpressum;
        }
    },
}).mount('#app');
