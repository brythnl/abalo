import Impressum from "./impressum.js";


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
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange=()=> {
                if(xhr.readyState===4){
                    if(xhr.status===200){
                        this.myItem=JSON.parse(xhr.responseText);
                        console.log(this.myItem);
                    }else{
                        console.error(xhr.statusText);
                    }
                }
            };
            xhr.open('GET', "/api/myArticle?user="+this.username);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();
        },
        ArticleOffer: function (id){

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
                    <td><button>Apply as special offer</button></td>


                </tr>
                </tbody>
            </table>
        </div>
        </main>
    `

}
