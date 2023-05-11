'use strict';

const addButtons = document.querySelectorAll(".add-to-cart-button");
const removeButtons = document.querySelectorAll(".remove-from-cart-button");
const cartList = document.getElementById("cart-list");

const cart = [];

function addToCart(button) {
    const articleid = button.parentElement.parentElement.getAttribute("id");

    // Add article object into cart
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `/api/shoppingcart/${shoppingcartid}/${articleid}`);
    xhr.setRequestHeader(
        "X-CSRF-TOKEN",
        document.querySelector('meta[name="csrf-token"]').content
    );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status === 200) {
            alert(xhr.responseText);
        } else {
            console.error("Failed to add article to cart: ", xhr.statusText);
        }
    };
    xhr.send();
}

function removeFromCart(articleid) {
    let xhr = new XMLHttpRequest();
    xhr.open(
        "DELETE",
        `/api/shoppingcart/${shoppingcartid}/articles/${articleid}`
    );
    xhr.setRequestHeader(
        "X-CSRF-TOKEN",
        document.querySelector('meta[name="csrf-token"]').content
    );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
        } else {
            console.error(
                "Failed to delete article from cart: ",
                xhr.statusText
            );
        }
    };
    xhr.send();
}

function getItems(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `/api/shoppingcart/items/${shoppingcartid}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status === 200) {
            cartItems = JSON.parse(xhr.responseText);
            callback(cartItems);
        } else {
            console.error("Failed to get cart contents: ", xhr.statusText);
        }
    };
    xhr.send();
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
    const currentAddButton = button.parentElement.parentElement.querySelector(".add-to-cart-button");
    currentAddButton.textContent = "+";
    currentAddButton.style.pointerEvents = "auto";
}

addButtons.forEach(button => {
    button.addEventListener("click", () => {
        addToCart(button);
        updateCart();

        // Prevent multiple additions of the same article to cart
        disableButton(button);
    });
});

removeButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (removeFromCart(button)) {
            updateCart();

            // Re-enable user to add article to cart
            enableButton(button);
        } else {
            alert("Item not in cart!");
        }
    });
});
