export default{
    data(){
        return{
            articles:[],
            searchedArticle:[],
            currentInput:"",
            page:[]
        };
    },
    created(){
        this.init();
    },
    methods: {
        init: function (){
            this.pagedArticle(1);
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange=()=> {
                if(xhr.readyState===4){
                    if(xhr.status===200){
                        this.page=JSON.parse(xhr.responseText);
                        console.log(this.articles);
                    }else{
                        console.error(xhr.statusText);
                    }
                }
            };
            xhr.open('GET', "/api/pageCount");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();
        },
        pagedArticle:function (page){
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange=()=> {
                if(xhr.readyState===4){
                    if(xhr.status===200){
                        this.articles=JSON.parse(xhr.responseText);
                        console.log(this.articles);
                    }else{
                        console.error(xhr.statusText);
                    }
                }
            };
            let params = new URLSearchParams({'page':page});
            xhr.open('GET', "/api/page?page="+page);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(params);
        }
    },
    computed: {
        filteredArticles(){
            if(this.currentInput.length>=3) {
                let xhr = new XMLHttpRequest();
                xhr.onreadystatechange=()=> {
                    if(xhr.readyState===4){
                        if(xhr.status===200){
                            this.searchedArticle=JSON.parse(xhr.responseText);
                            console.log(this.searchedArticle);
                        }else{
                            console.error(xhr.statusText);
                        }
                    }
                };
                let params = new URLSearchParams({'SeacrchText':this.currentInput});
                xhr.open('GET', "/api/page?SearchText="+this.currentInput);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(params);
                return this.searchedArticle;
            }else{
                return this.articles;
            }
        }
    },
    template:`
        <main>

        <label for="search_text" >search article name :</label>
        <input type="text" name="search" id="search" v-model="currentInput">
        <table class="ItemList">
            <tbody id="articletable_body">
            <tr>
                <th>images</th>
                <th>name</th>
                <th>price</th>
                <th>description</th>
            </tr>
            <tr v-for="article in filteredArticles" v-bind:id="article.id">
                <td class="article-picture"><img v-bind:src="article.picture" v-bind:alt="article.name"></td>
                <td class="article-name">{{ article.name }}</td>
                <td class="article-price">{{ article.price }}</td>
                <td class="article-desc">{{ article.description }}</td>
                <td><a href=# class="add-to-cart-button" style="text-decoration: none; color: black;">+</a>
                </td>
                <td><a href=# class="remove-from-cart-button"
                       style="text-decoration: none; color: black;">-</a>
                </td>

            </tr>
            </tbody>
        </table>
        <table class="pageList" v-if="currentInput.length<3">
            <tbody>
            <tr>
                <td v-for="count in page"><button v-on:click="pagedArticle(count)">{{count}}</button></td>
            </tr>
            </tbody>
        </table>
        </main>
    `
}
