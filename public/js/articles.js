
Vue.createApp({
    data() {
        return{
            articles:[],
            currentInput:""
        };
    },
    mounted(){
        this.loadArticles();
    },
    methods: {
        loadArticles: function (){
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange=()=> {
                if(xhr.readyState===4){
                    if(xhr.status===200){
                        let res=JSON.parse(xhr.responseText);
                        this.articles=res;
                        console.log(this.articles);
                    }else{
                        console.error(xhr.statusText);
                    }
                }
            };
            xhr.open('GET', "/api/articles");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();

        }
    },
    computed: {
            filteredArticles(){
                if(this.currentInput.length>=3) {
                    let filtered = this.articles.filter(article => article.name.toLowerCase().includes(this.currentInput.toLowerCase()));
                    return filtered.slice(0, 5);
                }else{
                    return this.articles;
                }
            }
    }

}).mount('#app');
