"use strict";

function createLabel(forValue, content) {
    const label = document.createElement("label");
    label.setAttribute("for", forValue);

    label.textContent = content;

    return label;
}

function createInput(typeValue, nameValue, idValue) {
    const input = document.createElement("input");
    input.setAttribute("type", typeValue);
    input.setAttribute("name", nameValue);
    input.setAttribute("id", idValue);
    input.setAttribute("required", "");

    return input;
}

function createArticleForm() {
    const nameLabel = createLabel("name", "Name: ");
    const nameInput = createInput("text", "name", "name-input");

    const priceLabel = createLabel("price", "Price: ");
    const priceInput = createInput("number", "price", "price-input");

    const descLabel = createLabel("desc", "Description: ");
    const descInput = document.createElement("textarea");
    descInput.setAttribute("name", "desc");
    descInput.setAttribute("id", "desc-input");

    const submitButton = document.createElement("input");
    submitButton.setAttribute("id", "submit-button");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "Speichern");

    const csrfToken = document.createElement("input");
    csrfToken.setAttribute("type", "hidden");
    csrfToken.setAttribute("name", "_token");
    csrfToken.setAttribute(
        "value",
        document.querySelector('meta[name="csrf-token"]').content
    );

    const articleForm = document.createElement("form");
    articleForm.setAttribute("id", "article-form");
    articleForm.setAttribute("action", "/articles");
    articleForm.setAttribute("method", "post");

    articleForm.appendChild(csrfToken);
    articleForm.appendChild(nameLabel);
    articleForm.appendChild(nameInput);
    articleForm.appendChild(priceLabel);
    articleForm.appendChild(priceInput);
    articleForm.appendChild(descLabel);
    articleForm.appendChild(descInput);
    articleForm.appendChild(submitButton);

    document.getElementById("article-form-container").appendChild(articleForm);
}

function submitArticleForm(e) {
    e.preventDefault(); // prevents form from being immediately submitted when submit button is pressed

    const name = document.getElementById("name-input").value;
    const price = document.getElementById("price-input").value;

    if (name.length < 3) {
        alert("Minimum name length is 3 characters");
        return false;
    }
    if (price <= 0) {
        alert("Minimum price is 0.01");
        return false;
    }

    document.getElementById("article-form").submit();

    alert("Form submitted!");
}

// =================================================================================================================

createArticleForm();

// document.getElementById("article-form").addEventListener("submit", submitArticleForm);

document.getElementById("submit-button")
    .addEventListener("click", (e) => {
        e.preventDefault();

        let formData = new FormData();
        collectFormData(formData);
        //sendFormData(formData);
        newArticle();
    });

function collectFormData(formData) {
    document.querySelectorAll("[id$='-input']")
        .forEach(input => {
            formData.append(input.name, input.value);
        });
}

function sendFormData(formData) {
    const articleForm = document.getElementById("article-form");

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/articles");
    xhr.setRequestHeader("X-CSRF-TOKEN",
        document.querySelector('meta[name="csrf-token"]').content
    );

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            let message = '';
            if (xhr.status === 200) {
                message = "Erfolgreich";
            } else {
                message = "Fehler: " + xhr.status + " " + xhr.statusText;
            }
            articleForm.appendChild(document.createTextNode(message));
        }
    };
    xhr.onerror = () => articleForm.appendChild("Fehler: " + xhr.status + " " + xhr.statusText);

    xhr.send(formData);
}
function newArticle(){
    const articleForm = document.getElementById("article-form");
    let xhr = new XMLHttpRequest();
    let name = document.getElementById("name-input").value;
    let price = document.getElementById("price-input").value;
    let desc = document.getElementById("desc-input").value;
    let user = document.getElementById("user-name").value;
    let url = "/api/articles";
    let params = new URLSearchParams({'name':name,'price':price,'desc':desc,'user-name':user});
    xhr.open('POST',url);
    xhr.onreadystatechange=()=> {
        if(xhr.readyState===4){
            let message = '';
            if(xhr.status===200){
                let result=JSON.parse(xhr.responseText);
                message = "Article successfully saved with id :"+result['id'];
                console.log(result);
            }else{
                message = "Fehler: " + xhr.status + " " + xhr.statusText;
            }
            articleForm.appendChild(document.createTextNode(message));
        }
    };
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(params);
}
