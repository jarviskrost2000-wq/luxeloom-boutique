// -------------------------
// INITIAL SETUP
// -------------------------

const menu = document.getElementById('menu');
const itemList = document.getElementById('itemList');
const cartContainer = document.getElementById('container');
const cartBtn = document.getElementById('btn1');
const orderbtn = document.getElementById('btn2');

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
    { image: 'IMG-20251212-WA0073.jpg', price: 13000 },
    { image: 'IMG-20251212-WA0074.jpg', price: 13000 },
    { image: 'IMG-20251212-WA0075.jpg', price: 14000 },
    { image: 'IMG-20251212-WA0076.jpg' , price: 13500}
    
];

const footwear = [
    { image: 'IMG-20251212-WA0082.jpg', price: 51000 , size:'42 to 46'},
    { image: 'IMG-20251212-WA0087.jpg', price: 32000, size:'42 to 46' },
    { image: 'IMG-20251212-WA0084.jpg', price: 25000, size:'37 to 42' },
    { image: 'IMG-20251212-WA0083.jpg', price: 18000, size: '38 to 41'}
];

const accessories = [
    { image: 'IMG-20251212-WA0077.jpg', price: 5000},
    { image: 'IMG-20251212-WA0078.jpg', price: 5000},
    { image: 'IMG-20251212-WA0080.jpg', price: 5000},
    { image: 'IMG-20251212-WA0079.jpg', price: 5000 },
    { image: 'IMG-20251212-WA0081.jpg', price: 18500 },
    { image: 'IMG-20251212-WA0086.jpg', price:6500},
    { image: 'IMG-20251212-WA0085.jpg', price:5000}
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
            <p>${item.size}</p>
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

             
orderBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty");
        return;
    }

    let message = "🛍️ *New Order*\n\n";

    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `   Price: ₦${item.price}\n`;
        message += `   Image: ${location.origin}/${item.image}\n\n`;
    });


    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/2349068366743?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
});

 cartdiv.appendChild(orderbtn);


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