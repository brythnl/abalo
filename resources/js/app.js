import './bootstrap';
import { createApp } from 'vue';

import NavBar from './navbar.js';
import SiteHeader from './siteheader.js';
import SiteBody from './sitebody.js';
import SiteFooter from './sitefooter.js';

Vue.createApp({
    components: {
        NavBar,
        SiteHeader,
        SiteBody,
        SiteFooter
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
