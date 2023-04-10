'use strict';

const addButtons = document.querySelectorAll(".add-to-cart-button");
const cartList = document.getElementById("cart-list");

const cart = [];

function addToCart(button) {
    const articleRow = button.parentElement.parentElement;

    const articleName = articleRow.querySelector(".article-name").textContent;
    const articlePrice = articleRow.querySelector(".article-price").textContent;

    // Add article object into cart array
    cart.push({
        name: articleName,
        price: articlePrice,
    })

    updateCart();
}

function updateCart() {
    /* Re-rendering the whole cart is necessary, to ensure accurate sync with data (array) along with reactivity,
    * (instead of just adding and appending new elements each time button is pressed)
    */

    // Reset Cart
    cartList.innerHTML = "";

    // Append each added article into cart
    cart.forEach(article => {
        const newArticle = document.createElement("li");
        const newArticleName = document.createElement("p");
        const newArticlePrice = document.createElement("p");

        newArticleName.textContent = article.name;
        newArticlePrice.textContent = article.price + " €";

        newArticle.appendChild(newArticleName);
        newArticle.appendChild(newArticlePrice);

        cartList.appendChild(newArticle);
    })

    // Update cart sum
    document.getElementById("cart-total").textContent = sumCart();
}

function sumCart() {
    return cart.reduce((acc, article) => acc + Number(article.price), 0);
}

function disableButton(button) {
    button.textContent = "In cart"
    button.style.pointerEvents = "none";
}

addButtons.forEach(button => {
    button.addEventListener("click", () => {
        addToCart(button);
        alert("Item added to cart!");

        // Prevent multiple addition to cart
        disableButton(button);
    });
});

