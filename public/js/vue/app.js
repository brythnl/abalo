import SiteHeader from './siteheader.js';
import SiteBody from './sitebody.js';
import SiteFooter from './sitefooter.js';

let vm = Vue.createApp({
    components: {
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
