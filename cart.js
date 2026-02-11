function addToCart(productName, productPrice, productImage) {
    var cartItem = {
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1
    };

    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(cartItem);

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
}

document.addEventListener("DOMContentLoaded", function () {
    var cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    var cartItemsContainer = document.getElementById("cart-items");
    var cartSubtotalElement = document.getElementById("cart-subtotal");
    var cartTotalElement = document.getElementById("cart-total");
    var cartSubtotal = 0.00;

    cartItems.forEach(function (item) {
        var row = document.createElement("tr");
        row.innerHTML = `
            <td><a href="#" onclick="removeFromCart(${cartItems.indexOf(item)})"><i class="far fa-times-circle"></i></a></td>
            <td><img src="${item.image}" alt=""></td>
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td class="height"><input type="number" value="${item.quantity}" 
                   onchange="updateCartItem(${cartItems.indexOf(item)}, this.value, ${item.price})"></td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        cartItemsContainer.appendChild(row);

        cartSubtotal += item.price * item.quantity;
    });

    cartSubtotalElement.textContent = "$" + cartSubtotal.toFixed(2);
    cartTotalElement.textContent = "$" + cartSubtotal.toFixed(2);
});

function removeFromCart(index) {
    var cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    location.reload(); 
}

function updateCartItem(index, newQuantity, price) {
    var cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems[index].quantity = parseInt(newQuantity);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    location.reload();
}
