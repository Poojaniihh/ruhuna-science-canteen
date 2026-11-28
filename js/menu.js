
// ========================================
// DAILY MENU DATA
// ========================================

const menuItems = [

    {
        id: 1,
        name: "Chicken Fried Rice",
        category: "Lunch",
        price: 350,
        veg: false,
        available: true,
        desc: "Wok-fried rice with roast chicken, egg and spicy chili paste.",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=700&q=85"
    },

    {
        id: 2,
        name: "Rice & Curry (Fish)",
        category: "Lunch",
        price: 220,
        veg: false,
        available: true,
        desc: "Traditional rice with fish curry, dhal and fresh mallum.",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=700&q=85"
    },

    {
        id: 3,
        name: "Rice & Curry (Veg)",
        category: "Lunch",
        price: 180,
        veg: true,
        available: true,
        desc: "Steamed rice with vegetable curries, dhal and papadam.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&q=85"
    },

    {
        id: 4,
        name: "Chicken Kottu",
        category: "Lunch",
        price: 380,
        veg: false,
        available: false,
        desc: "Chopped godamba roti stir-fried with chicken and vegetables.",
        image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=700&q=85"
    },

    {
        id: 5,
        name: "String Hoppers",
        category: "Breakfast",
        price: 150,
        veg: true,
        available: true,
        desc: "Steamed string hoppers served with kiri hodi and pol sambol.",
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=700&q=85"
    },

    {
        id: 6,
        name: "Fish Bun",
        category: "Short Eats",
        price: 80,
        veg: false,
        available: true,
        desc: "Freshly baked bun filled with a mildly spiced fish mixture.",
        image: "https://images.unsplash.com/photo-1608198093002-ad4e005484d3?w=700&q=85"
    },

    {
        id: 7,
        name: "Vegetable Roti",
        category: "Short Eats",
        price: 140,
        veg: true,
        available: true,
        desc: "Grilled roti stuffed with spiced potato and vegetable filling.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=700&q=85"
    },

    {
        id: 8,
        name: "Iced Coffee",
        category: "Beverages",
        price: 120,
        veg: true,
        available: true,
        desc: "Chilled creamy iced coffee, perfect for an afternoon break.",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=700&q=85"
    },

    {
        id: 9,
        name: "Plain Tea",
        category: "Beverages",
        price: 50,
        veg: true,
        available: true,
        desc: "A warm cup of classic Ceylon tea.",
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=700&q=85"
    }

];


// ========================================
// VARIABLES
// ========================================

let selectedCategory = "All";

let cart = [];

let toastTimer;


// ========================================
// HTML ELEMENTS
// ========================================

const foodGrid = document.getElementById("foodGrid");

const searchInput = document.getElementById("searchInput");

const vegOnly = document.getElementById("vegOnly");

const availableOnly = document.getElementById("availableOnly");

const cartItems = document.getElementById("cartItems");

const toast = document.getElementById("toast");


// ========================================
// FORMAT PRICE
// ========================================

function money(value) {

    return "Rs. " + value.toFixed(2);

}


// ========================================
// TOAST NOTIFICATION
// ========================================

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2400);

}


// ========================================
// RENDER MENU
// ========================================

function renderMenu() {

    const query = searchInput.value.trim().toLowerCase();

    const filteredItems = menuItems.filter(item => {

        const matchesCategory =
            selectedCategory === "All" ||
            item.category === selectedCategory;

        const matchesSearch =
            item.name.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query) ||
            item.desc.toLowerCase().includes(query);

        const matchesVegetarian =
            !vegOnly.checked || item.veg;

        const matchesAvailability =
            !availableOnly.checked || item.available;

        return (
            matchesCategory &&
            matchesSearch &&
            matchesVegetarian &&
            matchesAvailability
        );

    });


    // Result Count

    document.getElementById("resultCount").textContent =
        filteredItems.length +
        (filteredItems.length === 1 ? " item" : " items") +
        " found";


    // Empty State

    document.getElementById("emptyState").hidden =
        filteredItems.length !== 0;


    // Generate Food Cards

    foodGrid.innerHTML = filteredItems.map(item => `

        <article class="food-card">

            <div class="food-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    loading="lazy"
                >

                <span class="food-badge ${item.available ? "" : "sold"}">

                    ${item.available ? "Available" : "Sold Out"}

                </span>

            </div>

            <h3>

                ${item.veg ? '<span class="veg-dot"></span>' : ""}

                ${item.name}

            </h3>

            <p class="description">

                ${item.desc}

            </p>

            <p class="food-type">

                ${item.category} ·
                ${item.veg ? "Vegetarian" : "Non-vegetarian"}

            </p>

            <div class="food-bottom">

                <strong class="food-price">

                    ${money(item.price)}

                </strong>

                <button
                    class="add-btn"
                    data-add="${item.id}"
                    ${item.available ? "" : "disabled"}
                >

                    ${item.available ? "+ Add" : "Unavailable"}

                </button>

            </div>

        </article>

    `).join("");


    // Image Fallback

    foodGrid.querySelectorAll("img").forEach(img => {

        function showFallback() {

            const fallback = document.createElement("span");

            fallback.className = "image-fallback";

            fallback.textContent = "🍽️";

            fallback.setAttribute("aria-label", img.alt);

            img.replaceWith(fallback);

        }

        img.addEventListener("error", showFallback, {
            once: true
        });

        if (img.complete && img.naturalWidth === 0) {

            showFallback();

        }

    });

}


// ========================================
// ADD ITEM TO CART
// ========================================

function addToCart(id) {

    const item = menuItems.find(food => food.id === id);

    if (!item || !item.available) return;

    const existingItem = cart.find(food => food.id === id);

    if (existingItem) {

        existingItem.qty++;

    } else {

        cart.push({

            ...item,

            qty: 1

        });

    }

    renderCart();

    showToast(item.name + " added to your pre-order");

}


// ========================================
// CHANGE QUANTITY
// ========================================

function changeQuantity(id, change) {

    const item = cart.find(food => food.id === id);

    if (!item) return;

    item.qty += change;

    if (item.qty <= 0) {

        cart = cart.filter(food => food.id !== id);

    }

    renderCart();

}


// ========================================
// RENDER CART
// ========================================

function renderCart() {

    const count = cart.reduce(

        (sum, item) => sum + item.qty,

        0

    );

    const total = cart.reduce(

        (sum, item) => sum + item.price * item.qty,

        0

    );


    // Cart Count

    document.getElementById("cartCount").textContent =
        count + (count === 1 ? " item" : " items");


    // Cart Total

    document.getElementById("subtotal").textContent =
        money(total);

    document.getElementById("total").textContent =
        money(total);


    // Checkout Button

    document.getElementById("checkoutBtn").disabled =
        cart.length === 0;


    // Empty Cart

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="cart-empty">

                <div style="font-size:32px; margin-bottom:8px;">
                    🛒
                </div>

                Your cart is empty.

                <br>

                <small>Add a meal to get started.</small>

            </div>

        `;

        return;

    }


    // Generate Cart Items

    cartItems.innerHTML = cart.map(item => `

        <div class="cart-item">

            <div>

                <h4>${item.name}</h4>

                <p>${money(item.price * item.qty)}</p>

            </div>

            <div class="qty-control">

                <button
                    data-qty="${item.id}"
                    data-change="-1"
                    aria-label="Decrease quantity"
                >
                    −
                </button>

                <span>${item.qty}</span>

                <button
                    data-qty="${item.id}"
                    data-change="1"
                    aria-label="Increase quantity"
                >
                    +
                </button>

            </div>

        </div>

    `).join("");

}


// ========================================
// CATEGORY FILTERING
// ========================================

document.getElementById("categoryTabs")
    .addEventListener("click", event => {

        const button = event.target.closest("[data-category]");

        if (!button) return;

        selectedCategory = button.dataset.category;

        document.querySelectorAll("[data-category]")
            .forEach(tab => {

                tab.classList.toggle("active", tab === button);

            });

        renderMenu();

    });


// ========================================
// ADD FOOD TO CART
// ========================================

foodGrid.addEventListener("click", event => {

    const button = event.target.closest("[data-add]");

    if (!button || button.disabled) return;

    addToCart(Number(button.dataset.add));

});


// ========================================
// CART QUANTITY CONTROLS
// ========================================

cartItems.addEventListener("click", event => {

    const button = event.target.closest("[data-qty]");

    if (!button) return;

    const id = Number(button.dataset.qty);

    const change = Number(button.dataset.change);

    changeQuantity(id, change);

});


// ========================================
// SEARCH AND FILTERS
// ========================================

searchInput.addEventListener("input", renderMenu);

vegOnly.addEventListener("change", renderMenu);

availableOnly.addEventListener("change", renderMenu);


// ========================================
// TODAY'S SPECIAL
// ========================================

document.getElementById("specialAdd")
    .addEventListener("click", () => {

        addToCart(1);

    });


// ========================================
// PICKUP TIME SELECTION
// ========================================

document.querySelectorAll("[data-slot]").forEach(button => {

    button.addEventListener("click", () => {

        document.getElementById("pickupSlot").value =
            button.dataset.slot;

        document.querySelectorAll("[data-slot]")
            .forEach(slot => {

                const isSelected = slot === button;

                slot.classList.toggle(
                    "selected",
                    isSelected
                );

                slot.setAttribute(
                    "aria-pressed",
                    String(isSelected)
                );

            });

    });

});


// ========================================
// CHECKOUT
// ========================================

document.getElementById("checkoutBtn")
    .addEventListener("click", () => {

        if (cart.length === 0) return;

        const total = cart.reduce(

            (sum, item) => sum + item.price * item.qty,

            0

        );

        const pickupSlot =
            document.getElementById("pickupSlot").value;

        const payment =
            document.querySelector(
                'input[name="payment"]:checked'
            ).value;

        const orderSummary = cart.map(item => {

            return item.qty + " x " + item.name;

        }).join("\n");

        alert(
            "Demo Order Confirmed!\n\n" +
            orderSummary +
            "\n\nPickup Time: " + pickupSlot +
            "\nPayment: " + payment +
            "\nTotal: " + money(total) +
            "\n\nThis is a frontend demonstration only."
        );

        cart = [];

        renderCart();

        showToast("Demo order placed successfully!");

    });


// ========================================
// DISPLAY TODAY'S DATE
// ========================================

document.getElementById("todayDate").textContent =

    new Intl.DateTimeFormat("en-LK", {

        timeZone: "Asia/Colombo",
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"

    }).format(new Date());


// ========================================
// INITIALIZE
// ========================================

renderMenu();

renderCart();
