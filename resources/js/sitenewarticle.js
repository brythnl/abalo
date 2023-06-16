export default{
   data(){
        return{
            articleid:[]
        }
    },mounted() {
        this.createArticleForm();
    },
    methods:{
        createLabel: function(forValue, content){
            const label = document.createElement("label");
            label.setAttribute("for", forValue);

            label.textContent = content;

            return label;
        },
        createInput: function(typeValue, nameValue, idValue){
            const input = document.createElement("input");
            input.setAttribute("type", typeValue);
            input.setAttribute("name", nameValue);
            input.setAttribute("id", idValue);
            input.setAttribute("required", "");

            return input;
        },
        createArticleForm: function (){
            const nameLabel = this.createLabel("name", "Name: ");
            const nameInput = this.createInput("text", "name", "name-input");
            nameLabel.classList.add("article-form-container__nameTxt");
            nameInput.classList.add("article-form-container__nameIn");

            const priceLabel = this.createLabel("price", "Price: ");
            const priceInput = this.createInput("number", "price", "price-input");
            priceInput.classList.add("article-form-container__priceIn");
            priceLabel.classList.add("article-form-container__priceTxt")

            const descLabel = this.createLabel("desc", "Description: ");
            const descInput = document.createElement("textarea");
            descInput.setAttribute("name", "desc");
            descInput.setAttribute("id", "desc-input");
            descInput.classList.add("article-form-container__descIn");
            descLabel.classList.add("article-form-container__descTxt");



            const csrfToken = document.createElement("input");
            csrfToken.setAttribute("type", "hidden");
            csrfToken.setAttribute("name", "_token");
            csrfToken.setAttribute(
                "value",
                document.querySelector('meta[name="csrf-token"]').content
            );

            const articleForm = document.getElementById("article-form-container");

            articleForm.appendChild(csrfToken);
            articleForm.appendChild(nameLabel);
            articleForm.appendChild(nameInput);
            articleForm.appendChild(priceLabel);
            articleForm.appendChild(priceInput);
            articleForm.appendChild(descLabel);
            articleForm.appendChild(descInput);

            document.getElementById("article-form-container")
        },
        submitform : function (){
            const articleForm = document.getElementById("returntext");
            let xhr = new XMLHttpRequest();
            let name = document.getElementById("name-input").value;
            let price = document.getElementById("price-input").value;
            let desc = document.getElementById("desc-input").value;
            let user = document.getElementById("user-name").value;
            let url = "/api/articles";
            let params = new URLSearchParams({'name':name,'price':price,'desc':desc,'user':user});
            xhr.open('POST',url);
            xhr.onreadystatechange=()=> {
                if(xhr.readyState===4){
                    let message = '';
                    if(xhr.status===200){
                        this.articleid=JSON.parse(xhr.responseText);
                        message = this.articleid['response'];
                        console.log(this.articleid);
                    }else{
                        message = "Fehler: " + xhr.status + " " + xhr.statusText;
                    }
                    articleForm.appendChild(document.createTextNode(message));
                    alert(message);
                }
            };
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(params);
        }
    }, template:`
        <main>
        <div id="article-form-container" class="article-form-container">
        </div>
        <input type="button" v-on:click="submitform" value="Speichern" class="article-form-container__saveButton">
        <p id="returntext" class="article-form-container__returntext">
        </p>
        </main>
    `
}
