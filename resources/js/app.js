import './bootstrap';
import { createApp } from 'vue';

import VueScrollUp from 'vue-scroll-up';
import NavBar from './navbar.js';
import SiteHeader from './siteheader.js';
import SiteBody from './sitebody.js';
import SiteFooter from './sitefooter.js';
import NewArticle from './sitenewarticle.js';

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
