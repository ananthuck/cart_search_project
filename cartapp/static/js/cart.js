const products = [
    { id: 0, image: 'static/img.jpg', title: 'Z Flip Foldable Mobile', price: 150000 },
    { id: 1, image: 'static/img.jpg', title: 'Air Pods Pro', price: 20000 },
    { id: 2, image: 'static/img.jpg', title: 'Iphone 15', price: 120000 },
    { id: 3, image: 'static/img.jpg', title: 'Oneplus Buds', price: 10000 }
];

let cart = [];

// Add to cart function
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        const cartItem = cart.find(item => item.id === id);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        displayCart();
    }
}

// Display cart function
function displayCart() {
    const cartContainer = document.getElementById('cartitem');
    if (cart.length === 0) {
        cartContainer.innerHTML = "Your cart is empty";
    } else {
        cartContainer.innerHTML = cart.map((item, index) => `
            <div class='cart-item'>
                <div class='row-img'>
                    <img class='rowimg' src='${item.image}'>
                </div>
                <p style='font-size:12px;'>${item.title}</p>
                <h2 style='font-size: 15px;'>Rs ${item.price}.00</h2>
                <div class='quantity-controls'>
                    <button onclick='changeQuantity(${index}, -1)'>-</button>
                    <span>${item.quantity}</span>
                    <button onclick='changeQuantity(${index}, 1)'>+</button>
                </div>
                <i class='fa-solid fa-trash' onclick='removeFromCart(${index})'></i>
            </div>
        `).join('');
    }
    updateTotal();
}

// Change quantity function
function changeQuantity(index, delta) {
    const cartItem = cart[index];
    cartItem.quantity += delta;
    if (cartItem.quantity <= 0) {
        cart.splice(index, 1);
    }
    displayCart();
}

// Remove from cart function
function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

// Update total function
function updateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('total').innerText = `Rs ${total}.00`;
    document.getElementById('count').innerHTML = `<i class="fa-solid fa-cart-shopping"></i><span>${cart.length}</span>`;
}

// Display products function
function displayProducts(productsToDisplay) {
    document.getElementById('root').innerHTML = productsToDisplay.map(item => `
        <div class='box'>
            <div class='img-box'>
                <img class='images' src='${item.image}'></img>
            </div>
            <div class='bottom'>
                <p>${item.title}</p>
                <h2>Rs ${item.price}.00</h2>
                <button onclick='addToCart(${item.id})'>Add to cart</button>
            </div>
        </div>
    `).join('');
}

// Search functionality
function searchbox() {
    document.getElementById("searchbox").style.display = "flex";
    document.querySelectorAll('.box').forEach(box => box.style.display = "none");
}

function searchboxclose() {
    document.getElementById("searchbox").style.display = "none";
    document.getElementById("input-box").value = "";
    displayProducts(products);
}

const inputBox = document.getElementById("input-box");
inputBox.onkeyup = function() {
    const input = inputBox.value.toLowerCase();
    const result = products.filter(product => product.title.toLowerCase().includes(input));
    displaySearchResults(result.map(product => product.title));
};

function displaySearchResults(results) {
    document.querySelector(".result-box").innerHTML = `<ul>${results.map(r => `<li onclick='selectInput("${r}")'>${r}</li>`).join('')}</ul>`;
}

function selectInput(value) {
    inputBox.value = value;
    document.querySelector(".result-box").innerHTML = "";
}

function performSearch(event) {
    event.preventDefault();
    const searchInput = document.getElementById('input-box').value.toLowerCase();
    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchInput));
    displayProducts(filteredProducts);
}

// Initialize display of products
displayProducts(products);
