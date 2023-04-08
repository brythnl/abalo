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
    input.setAttribute("required", "");

    return input;
}

function createArticleForm() {
    const nameLabel = createLabel("name", "Name: ");
    const nameInput = createInput("text", "name", "name-input");

    const priceLabel = createLabel("price", "Price: ");
    const priceInput = createInput("number", "price", "price-input")

    const descLabel = createLabel("desc", "Description: ");
    const descInput = document.createElement("textarea");
    descInput.setAttribute("name", "desc");
    descInput.setAttribute("id", "desc-input")

    const submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "Speichern");

    const csrfToken = document.createElement("input");
    csrfToken.setAttribute("type", "hidden");
    csrfToken.setAttribute("name", "_token");
    csrfToken.setAttribute("value", document.querySelector('meta[name="csrf-token"]').content);

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

createArticleForm();

document.getElementById("article-form").addEventListener("submit", submitArticleForm);
