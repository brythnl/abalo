import './bootstrap';
import { createApp } from 'vue';

import VueScrollUp from 'vue-scroll-up';
import NavBar from './navbar.js';
import SiteHeader from './siteheader.js';
import SiteBody from './sitebody.js';
import SiteFooter from './sitefooter.js';
import NewArticle from './sitenewarticle.js';
import MyArticle from './myarticle.js';

let nachrichtConn = new WebSocket('ws://localhost:8085/nachricht');
nachrichtConn.onmessage = function(e) {
    console.log('Received', e.data);
    alert(e.data);
};

let verkauftConn = new WebSocket('ws://localhost:8085/verkaufsmeldung');
verkauftConn.onopen = function(e) {
    console.log("hello");
}
verkauftConn.onmessage = function(e) {
    let data = JSON.parse(e.data);
    console.log(window.session.userId);
    if (data.articleCreatorId == window.session.userId) {
        alert(data.message);
    }
}


Vue.createApp({
    components: {
        NavBar,
        SiteHeader,
        SiteBody,
        SiteFooter,
        NewArticle,
        VueScrollUp,
        MyArticle
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
