import './bootstrap';
import { createApp } from 'vue';

import DockMenu from './dockmenu.js';
import NavBar from './navbar.js';
import SiteHeader from './siteheader.js';
import SiteBody from './sitebody.js';
import SiteFooter from './sitefooter.js';
import NewArticle from './sitenewarticle.js';

Vue.createApp({
    components: {
        DockMenu,
        NavBar,
        SiteHeader,
        SiteBody,
        SiteFooter,
        NewArticle,
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
