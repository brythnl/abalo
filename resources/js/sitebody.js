import Impressum from "./impressum.js";

export default {
    props: ['show-impressum'],

    data(){
        return{
            articles:[],
            searchedArticle:[],
            currentInput:"",
            Input:"",
            page:[]
        };
    },
    components: {
        Impressum,
    },
    created(){
        this.init();
    },
    methods: {
        init: function (){
            this.pagedArticle(1);
            this.loginStatus=document.getElementById('user-name').value;
            console.log(this.loginStatus);
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange=()=> {
                if(xhr.readyState===4){
                    if(xhr.status===200){
                        this.page=JSON.parse(xhr.responseText);
                        console.log(this.page);
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
        },
        searchArticle:function(){
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        this.searchedArticle = JSON.parse(xhr.responseText);
                        console.log(this.searchedArticle);
                    } else {
                        console.error(xhr.statusText);
                    }
                }
            };
            let params = new URLSearchParams({'SeacrchText': this.currentInput});
            xhr.open('GET', "/api/page?SearchText=" + this.currentInput);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(params);
        },
        verkauft: function() {
            axios.post('/api/articles/1/sold/5')
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    computed: {
        filteredArticles() {
                if (this.Input.length >= 3 ) {
                    if(this.currentInput!==this.Input) {
                        this.currentInput=this.Input;
                        this.searchArticle()
                    }
                    return this.searchedArticle;
                }else{
                    return this.articles;
                }

        }
    },
    template:`
        <main>
            <impressum v-if="showImpressum"></impressum>
            <div v-else>
                <div class="search">
                <label for="search_text" class="search__label">search article name :</label>
                <input type="text" name="search" id="search" v-model="Input" class="search__text">
                </div>
                <div class="search" v-if="loginStatus">
                    <a href="/myarticle">My Article</a>
                </div>

                <table class="ItemTable">
                    <tbody id="articletable_body">
                    <tr class="ItemTable__Header">
                        <th>images</th>
                        <th>name</th>
                        <th>price</th>
                        <th>description</th>
                    </tr>
                    <tr v-for="article in filteredArticles" v-bind:id="article.id">
                        <td class="article-picture ItemTable__Picture"><img v-bind:src="article.picture" v-bind:alt="article.name" class="ItemTable__Img"></td>
                        <td class="article-name ItemTable__Name">{{ article.name }}</td>
                        <td class="article-price ItemTable__price">{{ article.price }}</td>
                        <td class="article-desc ItemTable__desc">{{ article.description }}</td>
                        <td><a href=# class="add-to-cart-button ItemTable__AddButton" style="text-decoration: none; color: black;">+</a>
                        </td>
                        <td><a href=# class="remove-from-cart-button ItemTable__RemButton"
                               style="text-decoration: none; color: black;">-</a>
                        </td>
                        <td><a href=# @click="verkauft">Verkauft</a></td>
                    </tr>
                    </tbody>
                </table>
                <table class="pageList" v-if="Input.length<3">
                    <tbody>
                    <tr>
                        <td v-for="count in page" class="pageList__number"><button v-on:click="pagedArticle(count) " class="pageList__button">{{count}}</button></td>
                    </tr>
                    </tbody>
                </table>
            </div>
       </main>
    `
}
