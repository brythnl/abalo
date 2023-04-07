'use strict';

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
    input.setAttribute("required");

    return input;
}

function createArticleForm() {
    const nameLabel = createLabel("name", "Name: ");
    const nameInput = createInput("text", "name", "name-input");

    const priceLabel = createLabel("price", "Price: ");
    const priceInput = createInput("number", "price", "price-input")

    const descLabel = createLabel("desc", "Description: ");
    const descInput = document.createElement("textarea");

    const submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "Speichern");
    submitButton.setAttribute("onclick", submitArticleForm());

    const articleForm = document.createElement("form");
    articleForm.setAttribute("id", "article-form");
    articleForm.setAttribute("action", "/articles");
    articleForm.setAttribute("method", "post");

    articleForm.appendChild(nameLabel);
    articleForm.appendChild(nameInput);
    articleForm.appendChild(priceLabel);
    articleForm.appendChild(priceInput);
    articleForm.appendChild(descLabel);
    articleForm.appendChild(descInput);
    articleForm.appendChild(submitButton);

    document.getElementById("article-form-container").appendChild(articleForm);
}



createArticleForm();
