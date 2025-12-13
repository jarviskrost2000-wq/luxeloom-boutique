
// -------------------------
// INITIAL SETUP
// -------------------------

const menu = document.getElementById('menu');
const itemList = document.getElementById('itemList');
const cartContainer = document.getElementById('container');
const cartBtn = document.getElementById('btn1');   // View cart
const orderbtn = document.getElementById('btn2');  // Order via WhatsApp

let categories = ['clothing', 'footwear', 'accessories', 'fragrances'];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Clear menu first
menu.innerHTML = "";

// -------------------------
// CREATE CATEGORY BUTTONS
// -------------------------

categories.forEach(category => {
    const li = document.createElement('li');
    li.textContent = category.toUpperCase();
    li.addEventListener('click', () => display(category));
    menu.appendChild(li);
});


// -------------------------
// ITEM DATA
// -------------------------

const clothing = [
    { image: 'IMG-20251212-WA0073.jpg', price: 13000 },
    { image: 'IMG-20251212-WA0074.jpg', price: 13000 },
    { image: 'IMG-20251212-WA0075.jpg', price: 14000 },
    { image: 'IMG-20251212-WA0076.jpg', price: 13500 }
];

const footwear = [
    { image: 'IMG-20251212-WA0082.jpg', price: 51000, size: '42–46' },
    { image: 'IMG-20251212-WA0087.jpg', price: 32000, size: '42–46' },
    { image: 'IMG-20251212-WA0084.jpg', price: 25000, size: '37–42' },
    { image: 'IMG-20251212-WA0083.jpg', price: 18000, size: '38–41' }
];

const accessories = [
    { image: 'IMG-20251212-WA0077.jpg', price: 5000 },
    { image: 'IMG-20251212-WA0078.jpg', price: 5000 },
    { image: 'IMG-20251212-WA0080.jpg', price: 5000 },
    { image: 'IMG-20251212-WA0079.jpg', price: 5000 },
    { image: 'IMG-20251212-WA0081.jpg', price: 18500 },
    { image: 'IMG-20251212-WA0086.jpg', price: 6500 },
    { image: 'IMG-20251212-WA0085.jpg', price: 5000 }
];

const fragrances = [
    { image: 'https://via.placeholder.com/200?text=Perfume', price: 8000 },
    { image: 'https://via.placeholder.com/200?text=Cologne', price: 11000 },
    { image: 'https://via.placeholder.com/200?text=Body+Spray', price: 9000 }
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
        itemdiv.classList.add('product');

        itemdiv.innerHTML = `
            <img src="${item.image}" alt="product">
            <p>₦${item.price}</p>
            ${item.size ? `<p>Size: ${item.size}</p>` : ''}
            <button class="addBtn">ADD</button>
        `;

        const addBtn = itemdiv.querySelector('.addBtn');
        addBtn.addEventListener('click', () => addToCart(item, category));

        itemList.appendChild(itemdiv);
    });
}


// -------------------------
// ADD TO CART
// -------------------------

function addToCart(item, category) {
    cart.push({
        image: item.image,
        price: item.price,
        category: category
    });
    saveItem();
    alert("Item added to cart");
}


// -------------------------
// SHOW CART
// -------------------------

cartBtn.addEventListener('click', displayCart);

function displayCart() {
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty</p>";
        return;
    }

    cart.forEach((item, index) => {
        const cartdiv = document.createElement('div');
        cartdiv.classList.add('cart-item');

        cartdiv.innerHTML = `
            <img src="${item.image}">
            <span>${item.category}</span>
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
// ORDER VIA WHATSAPP
// -------------------------

orderbtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty");
        return;
    }

    let message = "🛍️ *New Order*\n\n";

    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.category.toUpperCase()}\n`;
        message += `Price: ₦${item.price}\n`;
        message += `Image: ${location.origin}/${item.image}\n\n`;
    });

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/2349068366743?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
});


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