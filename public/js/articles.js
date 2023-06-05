
Vue.createApp({
    data() {
        return{
            articles:[],
            currentInput:"",
            Input:""
        };
    },
    mounted(){
        this.loadArticles("");
    },
    methods: {
        loadArticles: function (searchText){
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
            xhr.open('GET', "/api/articles?SearchText="+searchText);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();

        }
    },
    computed: {
            filteredArticles(){
                if(this.currentInput!==this.Input) {
                    this.Input = this.currentInput;
                    if (this.currentInput.length >= 2) {
                        this.loadArticles(this.Input);
                        let filtered = this.articles.filter(article => article.name.toLowerCase().includes(this.currentInput.toLowerCase()));
                        return filtered.slice(0, 5);
                    } else {
                        this.loadArticles("");
                        return this.articles;
                    }
                }else{
                    return this.articles;
                }
            }
    }

}).mount('#app');
