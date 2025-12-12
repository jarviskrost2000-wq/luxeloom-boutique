// -------------------------
// INITIAL SETUP
// -------------------------

const menu = document.getElementById('menu');
const itemList = document.getElementById('itemList');
const cartContainer = document.getElementById('container');
const cartBtn = document.getElementById('btn');

let categories = ['clothing','footwear','accessories','fragrances'];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Clear menu first
menu.innerHTML = "";

// Create category buttons
categories.forEach(function (item) {
    const li = document.createElement('li');
    li.textContent = item.toUpperCase();
    li.addEventListener('click', function () {
        display(item);
    });
    menu.appendChild(li);
});


// -------------------------
// ITEM DATA WITH RELIABLE IMAGES
// -------------------------

const clothing = [
    { image: "https://via.placeholder.com/200x200.png?text=T-Shirt", price: 4500 },
    { image: "https://via.placeholder.com/200x200.png?text=Jeans", price: 6000 },
    { image: "https://via.placeholder.com/200x200.png?text=Jacket", price: 3500 }
];

const footwear = [
    { image: "https://via.placeholder.com/200x200.png?text=Sneakers", price: 7000 },
    { image: "https://via.placeholder.com/200x200.png?text=Boots", price: 12000 },
    { image: "https://via.placeholder.com/200x200.png?text=Sandals", price: 5000 }
];

const accessories = [
    { image: "https://via.placeholder.com/200x200.png?text=Watch", price: 2500 },
    { image: "https://via.placeholder.com/200x200.png?text=Bag", price: 2000 },
    { image: "https://via.placeholder.com/200x200.png?text=Hat", price: 1500 }
];

const fragrances = [
    { image: "https://via.placeholder.com/200x200.png?text=Perfume", price: 8000 },
    { image: "https://via.placeholder.com/200x200.png?text=Cologne", price: 11000 },
    { image: "https://via.placeholder.com/200x200.png?text=Body+Spray", price: 9000 }
];


// -------------------------
// DISPLAY ITEMS
// -------------------------

function display(category) {
    itemList.innerHTML = '';

    let items = [];

    if (category === 'clothing') items = clothing;
    if (category === 'footwear') items = footwear;
    if (category === 'accessories') items = accessories;
    if (category === 'fragrances') items = fragrances;

    items.forEach(item => {
        const itemdiv = document.createElement('div');
        itemdiv.classList.add("product");

        itemdiv.innerHTML = `
            <img src="${item.image}" alt="item">
            <p>₦${item.price}</p>
            <button class="addBtn">ADD</button>
        `;

        const addBtn = itemdiv.querySelector('.addBtn');
        addBtn.addEventListener('click', () => addToCart(item));

        itemList.appendChild(itemdiv);
    });
}


// -------------------------
// ADD TO CART
// -------------------------

function addToCart(item) {
    cart.push({ image: item.image, price: item.price });
    saveItem();
}


// -------------------------
// SHOW CART
// -------------------------

cartBtn.addEventListener('click', displayCart);

function displayCart() {
    cartContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const cartdiv = document.createElement('div');
        cartdiv.classList.add("cart-item");

        cartdiv.innerHTML = `
            <img src="${item.image}">
            <span>₦${item.price}</span>
        `;

        const delBtn = document.createElement('button');
        delBtn.textContent = "🗑️";
        delBtn.addEventListener('click', () => delItem(index));

        cartdiv.appendChild(delBtn);
        cartContainer.appendChild(cartdiv);
    });
}


// -------------------------
// DELETE & SAVE
// -------------------------

function delItem(index) {
    cart.splice(index, 1);
    saveItem();
    displayCart();
}

function saveItem() {
    localStorage.setItem('cart', JSON.stringify(cart));
}