import Impressum from "./impressum.js";
import axios from "axios";


export default {
    props: ['show-impressum'],
    data(){
        return{
            myItem:[],
            username:""
        };
    },
    components :{
        Impressum,
    },mounted() {
        this.init();
    },
    methods:{
        init: function (){
            this.username=document.getElementById('user-name').value;
            console.log(this.username);
            this.loadArticle()
        },
        ArticleOffer: function (uid){
            axios.post('/api/offerarticle',{id:uid})
                .then(response => {
                    console.log(response.data);
                    this.loadArticle();
                    alert('Article offered as a special offer')
                }).catch(error=> {
                    console.log(error);
            })
        },
        loadArticle:function (){
            axios.get('/api/myArticle?user='+this.username)
                .then(response => {
                    console.log(response.data);
                    this.myItem=response.data;
                }).catch(error=>{
                    console.log(error);
            })
        }

    },
    template:`
        <main>
        <impressum v-if="showImpressum"></impressum>
        <div v-else>
            <table class="ItemTable">
                <tbody id="articletable_body">
                <tr class="ItemTable__Header">
                    <th>images</th>
                    <th>name</th>
                    <th>price</th>
                    <th>description</th>
                </tr>
                <tr v-for="article in myItem" v-bind:id="article.id">
                    <td class="article-picture ItemTable__Picture"><img v-bind:src="article.picture" v-bind:alt="article.name" class="ItemTable__Img"></td>
                    <td class="article-name ItemTable__Name">{{ article.name }}</td>
                    <td class="article-price ItemTable__price">{{ article.price }}</td>
                    <td class="article-desc ItemTable__desc">{{ article.description }}</td>
                    <td>
                        <input v-if="article.offer==false" type="button" value="Apply as special offer" v-on:click="ArticleOffer(article.id)" class="ItemTable__offerButton--enabled">
                        <input v-else type="button" value="Applied as special offer" v-on:click="ArticleOffer(article.id)" class="ItemTable__offerButton--disabled" disabled>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        </main>
    `

}
