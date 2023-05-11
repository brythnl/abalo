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
    // Reset Cart
    cartList.innerHTML = "";

    let cartSum = 0;

    // Append each article into cart list
    cartItems.forEach((item) => {
        const newItem = document.createElement("li");

        const newItemName = document.createElement("p");
        const newItemPrice = document.createElement("p");
        newItemName.textContent = item.ab_name;
        newItemPrice.textContent = item.ab_price + " €";
        newItem.appendChild(newItemName);
        newItem.appendChild(newItemPrice);

        const cartRemoveButton = document.createElement("a");
        cartRemoveButton.textContent = "-";
        cartRemoveButton.classList.add("cart-remove-button");
        cartRemoveButton.setAttribute("href", "#");
        cartRemoveButton.setAttribute(
            "style",
            "text-decoration: none; color: red; font-weight: 1000"
        );
        cartRemoveButton.addEventListener("click", () => {
            removeFromCart(item.id);
            getItems(updateCart);
        });

        newItem.appendChild(cartRemoveButton);

        cartList.appendChild(newItem);

        cartSum += item.ab_price;
    });

    // Update cart sum
    document.getElementById("cart-total").textContent = cartSum;
}

const addButtons = document.querySelectorAll(".add-to-cart-button");
const cartList = document.getElementById("cart-list");
const shoppingcartid = cartList.parentElement.getAttribute("id");

let cartItems = [];

// Show current cart
getItems(updateCart);

addButtons.forEach((button) => {
    button.addEventListener("click", () => {
        addToCart(button);
        getItems(updateCart);
    });
});
