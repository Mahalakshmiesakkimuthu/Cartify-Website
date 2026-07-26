
function addtocart(button) {

    let card = button.parentElement;

    let product = {
        image: card.querySelector("img").src,
        name: card.querySelector("h3").innerText,
        price: card.querySelector(".price").innerText,
        quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let found = cart.find(item => item.name === product.name);

    if (found) {
        found.quantity++;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    button.innerHTML = "Added ";
    button.disabled = true;

    alert("Product Added to Cart");
}


function togglewishlist(icon) {

    let card = icon.parentElement.parentElement;

    let product = {
        image: card.querySelector("img").src,
        name: card.querySelector("h3").innerText,
        price: card.querySelector(".price").innerText
    };

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    let index = wishlist.findIndex(item => item.name === product.name);

    if (index == -1) {

        wishlist.push(product);

        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
        icon.style.color = "red";

    } else {

        wishlist.splice(index,1);

        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
        icon.style.color = "black";
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

}

function displayCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartItems = document.getElementById("cartItems");

    if (!cartItems) return;

    if (cart.length == 0) {

        cartItems.innerHTML = "<h2>Your Cart is Empty</h2>";
        document.getElementById("totalPrice").innerHTML = "";
        return;
    }

    let output = "";
    let total = 0;

    cart.forEach((item, index) => {

        let price = Number(item.price.replace(/[₹,]/g, ""));

        total += price * item.quantity;

        output += `

        <div class="card">

            <img src="${item.image}" width="150">

            <h3>${item.name}</h3>

            <p>${item.price}</p>

            <div class="cart-controls">

    <button class="qty-btn" onclick="decreaseQuantity(${index})">−</button>

    <span class="qty">${item.quantity}</span>

    <button class="qty-btn" onclick="increaseQuantity(${index})">+</button>

    <button class="remove-btn" onclick="removeItem(${index})">
        Remove
    </button>

</div>

        </div>

        

        `;
    });

    cartItems.innerHTML = output;

    document.getElementById("totalPrice").innerHTML =
        "Total : ₹" + total.toLocaleString();

}



function increaseQuantity(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}


function decreaseQuantity(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index,1);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}



function removeItem(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index,1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}



displayCart();



function displayWishlist() {

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    let wishlistItems = document.getElementById("wishlistItems");

    if (!wishlistItems) return;

    if (wishlist.length == 0) {

        wishlistItems.innerHTML = "<h2>Your Wishlist is Empty ❤️</h2>";

        return;
    }

    let output = "";

    wishlist.forEach((item,index)=>{

        output += `

        <div class="card">

            <img src="${item.image}" width="150">

            <h3>${item.name}</h3>

            <p>${item.price}</p>

            <button onclick="moveToCart(${index})">
                Add to Cart
            </button>

            <button onclick="removeWishlist(${index})">
                Remove
            </button>

        </div>

        

        `;

    });

    wishlistItems.innerHTML = output;

}



function removeWishlist(index){

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlist.splice(index,1);

    localStorage.setItem("wishlist",JSON.stringify(wishlist));

    displayWishlist();

}




function moveToCart(index){

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let product = wishlist[index];

    product.quantity = 1;

    let found = cart.find(item => item.name === product.name);

    if(found){

        found.quantity++;

    }else{

        cart.push(product);

    }

    wishlist.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    localStorage.setItem("wishlist",JSON.stringify(wishlist));

    displayWishlist();

}



displayWishlist();



console.log("tsedee")