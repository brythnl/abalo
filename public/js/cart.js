'use strict';

const addButtons = document.querySelectorAll(".add-to-cart-button");
const removeButtons = document.querySelectorAll(".remove-from-cart-button");
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
}

function removeFromCart(button) {
    const articleRow = button.parentElement.parentElement;
    const articleName = articleRow.querySelector(".article-name").textContent;

    const articleIndex = cart.findIndex(article => article.name === articleName);

    if (articleIndex !== -1) {
        cart.splice(articleIndex, 1);
        return true;
    } else {
        return false;
    }
}

function updateCart() {
    /* Re-rendering the whole cart is necessary, to ensure accurate sync with data (array) along with reactivity,
    * (instead of just adding and appending new elements each time button is pressed)
    */

    // Reset Cart
    cartList.innerHTML = "";

    // Append each article into cart list
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

function enableButton(button) {
    button.parentElement.parentElement.querySelector(".add-to-cart-button").textContent = "+";
    button.style.pointerEvents = "auto";
}

addButtons.forEach(button => {
    button.addEventListener("click", () => {
        addToCart(button);
        updateCart();
        alert("Item added to cart!");

        // Prevent multiple additions of the same article to cart
        disableButton(button);
    });
});

removeButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (removeFromCart(button)) {
            updateCart();
            alert("Item removed from cart!");

            // Re-enable user to add article to cart
            enableButton(button);
        } else {
            alert("Item not in cart!");
        }
    });
});
