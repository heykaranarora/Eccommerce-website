const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");

if (bar) {
    bar.addEventListener("click", () => {
        nav.classList.add("active");
    });
}

if (close) {
    close.addEventListener("click", () => {
        nav.classList.remove("active");
    });
}

//login
document.addEventListener("DOMContentLoaded", () => {
let signup = document.querySelector(".signupbtn");
let signin = document.querySelector(".signinbtn");
let name = document.querySelector(".namefield");
let title = document.querySelector(".title");
let underline = document.querySelector(".underline");
let text = document.getElementById("text");
signup.addEventListener('click', () => {
    name.style.maxHeight = "60px";   
    title.innerHTML = "Sign Up";
    text.innerHTML = "To Know More ";
    signin.classList.add("disable");
    signup.classList.remove("disable");
    underline.style.transform = "translateX(0)";
});
signin.addEventListener("click", () => {
    name.style.maxHeight = "0";
    title.innerHTML = "Sign In";
    text.innerHTML = "Forgot Password";
    signup.classList.add("disable");
    signin.classList.remove("disable");
    underline.style.transform = "translateX(35px)";
});

    // Function to store user data in local storage permanently
    function storeUserDataPermanently(name, email, password) {
        let userData = getPermanentUserData();
        userData.push({
            name: name,
            email: email,
            password: password
        });
        localStorage.setItem('permanentUserData', JSON.stringify(userData));
    }

    // Function to retrieve permanently stored user data from local storage
    function getPermanentUserData() {
        let userDataString = localStorage.getItem('permanentUserData');
        let userData = userDataString ? JSON.parse(userDataString) : [];
        if (!Array.isArray(userData)) {
            console.error("Stored user data is not an array. Resetting to an empty array.");
            userData = [];
        }
        return userData;
    }

    // Function to check if the provided email already exists in the stored user data
    function emailExists(email) {
        let userData = getPermanentUserData();
        return userData.some(user => user.email === email);
    }

    // Function to check if the provided email and password match with permanently stored user data
    function login(email, password) {
        let userData = getPermanentUserData();
        return userData.some(user => user.email === email && user.password === password);
    }

    let authForm = document.getElementById("authForm");

    authForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission from refreshing the page

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if (authForm.classList.contains("signin")) {
            // Sign-in logic
            if (login(email, password)) {
                alert("Sign in successful!");
                window.location.href = "index.html";
            } else {
                alert("Invalid email or password. Please try again.");
            }
        } else {
            // Sign-up logic
            if (emailExists(email)) {
                alert("User already exists. Please sign in.");
            } else {
                storeUserDataPermanently(name, email, password);
                alert("Sign up successful!");
                window.location.href = "index.html";
            }
        }
    });

    let signupbtn = document.querySelector(".signupbtn");
    let signinbtn = document.querySelector(".signinbtn");

    signupbtn.addEventListener("click", () => {
        authForm.classList.remove("signin");
        authForm.classList.add("signup");
        document.querySelector(".title").textContent = "Sign Up";
    });

    signinbtn.addEventListener("click", () => {
        authForm.classList.remove("signup");
        authForm.classList.add("signin");
        document.querySelector(".title").textContent = "Sign In";
    });
});


// search bar
document.addEventListener('DOMContentLoaded', function () {
    var input = document.getElementById("search-input");
    var button = document.getElementById("search-button");

    button.addEventListener("click", function () {
        search();
    });

    input.addEventListener("input", function () {
        search();
    });

    function search() {
        var searchTerm = input.value.trim(); // Trim whitespace from the input
        var products = document.querySelectorAll('.pro h5');

        if (searchTerm !== "") {
            products.forEach(function(product) {
                var productName = product.innerText.toLowerCase();
                if (productName.includes(searchTerm.toLowerCase())) {
                    product.closest('.pro').style.display = "block";
                } else {
                    product.closest('.pro').style.display = "none";
                }
            });
        } else {
            products.forEach(function(product) {
                product.closest('.pro').style.display = "block";
            });
        }
    }
});

// cart
document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById("search-input");
    const button = document.getElementById("search-button");
    const cartIcon = document.getElementById("lg-bag");
    const cart = document.getElementById('cart');
    const cartItemsContainer = document.getElementById('cart-items');

    button.addEventListener("click", search);
    input.addEventListener("input", search);
    cartIcon.addEventListener('click', toggleCartVisibility);

    document.addEventListener('click', function(event) {
        const isClickInsideCart = cart.contains(event.target);
        const isClickInsideCartIcon = cartIcon.contains(event.target);
        if (!isClickInsideCart && !isClickInsideCartIcon) {
            cart.style.display = 'none';
        }
    });


    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart-btn')) {
            addToCart(event.target);
        } else if (event.target.classList.contains('quantity-increase')) {
            increaseQuantity(event.target);
        } else if (event.target.classList.contains('quantity-decrease')) {
            decreaseQuantity(event.target);
        } else if (event.target.classList.contains('remove-btn')) {
            removeCartItem(event.target);
        }
    });

    // Retrieve cart items from local storage on page load
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
        cartItemsContainer.innerHTML = storedCartItems;
        updateCartTotal();
    }

    function search() {
        const searchTerm = input.value.trim().toLowerCase();
        const products = document.querySelectorAll('.pro');

        products.forEach(product => {
            const productName = product.querySelector('.des h5').innerText.toLowerCase();
            const productVisible = productName.includes(searchTerm);
            product.style.display = productVisible ? 'block' : 'none';
        });
    }

    function toggleCartVisibility() {
        if (cart.style.display === 'block') {
            cart.style.display = 'none'; // Close the cart only if it's open
        } else {
            cart.style.display = 'block'; // Open the cart if it's closed
        }
    }
    function addToCart(button) {
        const product = button.closest('.pro');
        const productName = product.querySelector('.des h5').innerText;
        const productPrice = parseFloat(product.querySelector('.des h4').innerText.replace('$', ''));

        const existingCartItem = cartItemsContainer.querySelector(`[data-name="${productName}"]`);
        if (existingCartItem) {
            const quantityElement = existingCartItem.querySelector('.quantity');
            const newQuantity = parseInt(quantityElement.innerText) + 1;
            quantityElement.innerText = newQuantity;
        } else {
            const productImgSrc = product.querySelector('img').src;
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.setAttribute('data-name', productName);
            cartItem.innerHTML = `
                <img src="${productImgSrc}" alt="${productName}">
                <div>
                    <h5>${productName}</h5>
                    <p>$${productPrice.toFixed(2)}</p>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-decrease">-</button>
                    <span class="quantity">1</span>
                    <button class="quantity-increase">+</button>
                </div>
                <i class="fas fa-trash remove-btn"></i>
                
            `;
            cartItemsContainer.appendChild(cartItem);
        }

        updateCartTotal();
        updateLocalStorage();
    }

    function increaseQuantity(button) {
        const quantityElement = button.parentElement.querySelector('.quantity');
        const newQuantity = parseInt(quantityElement.innerText) + 1;
        quantityElement.innerText = newQuantity;

        updateCartTotal();
        updateLocalStorage();
    }

    function decreaseQuantity(button) {
        const quantityElement = button.parentElement.querySelector('.quantity');
        let newQuantity = parseInt(quantityElement.innerText) - 1;
        if (newQuantity >= 0) {
            quantityElement.innerText = newQuantity;
            if (newQuantity === 0) {
                removeCartItem(button);
            }
            updateCartTotal();
            updateLocalStorage();
        }
    }

    function removeCartItem(button) {
        const cartItem = button.closest('.cart-item');
        cartItem.remove();
        updateCartTotal();
        updateLocalStorage();
    }

    function updateCartTotal() {
        const cartItems = cartItemsContainer.querySelectorAll('.cart-item');
        const totalItems = Array.from(cartItems).reduce((acc, item) => acc + parseInt(item.querySelector('.quantity').innerText), 0);
        const totalPrice = Array.from(cartItems).reduce((acc, item) => {
            const price = parseFloat(item.querySelector('p').innerText.replace('$', ''));
            const quantity = parseInt(item.querySelector('.quantity').innerText);
            return acc + (price * quantity);
        }, 0);

        document.getElementById('total-items').innerText = totalItems;
        document.getElementById('total-price').innerText = '$' + totalPrice.toFixed(2);
    }

    function updateLocalStorage() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartItemsHTML = cartItemsContainer.innerHTML;
        localStorage.setItem('cartItems', JSON.stringify(cartItemsHTML));
    }




    function toggleActiveState(btn) {
        const isActive = btn.classList.contains('active-filter');
        document.querySelectorAll('.filter-btn').forEach(filterBtn => {
            filterBtn.classList.remove('active-filter');
        });
        if (!isActive) {
            btn.classList.add('active-filter');
        }
    }
    
    
       // Function to sort products by name
function sortByName() {
    const productContainers = document.querySelectorAll('.pro');
    const sortedProducts = Array.from(productContainers).sort((a, b) => {
        const nameA = a.querySelector('.des h5').textContent.toLowerCase();
        const nameB = b.querySelector('.des h5').textContent.toLowerCase();
        return nameA.localeCompare(nameB);
    });
    const parent = document.querySelector('#product1');
    parent.innerHTML = ''; // Clear existing products
    sortedProducts.forEach(product => {
        parent.appendChild(product);
    });
}

// Function to sort products by price
function sortByPrice() {
    const productContainers = document.querySelectorAll('.pro');
    const sortedProducts = Array.from(productContainers).sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.des h4').textContent.replace('$', ''));
        const priceB = parseFloat(b.querySelector('.des h4').textContent.replace('$', ''));
        return priceA - priceB;
    });
    const parent = document.querySelector('#product1');
    parent.innerHTML = ''; // Clear existing products
    sortedProducts.forEach(product => {
        parent.appendChild(product);
    });
}

// Function to filter products by category
function filterByCategory(category) {
    const productContainers = document.querySelectorAll('.pro');
    productContainers.forEach(container => {
        const productCategory = container.classList.contains(category);
        if (!productCategory) {
            container.style.display = 'none'; // Hide products not in the selected category
        } else {
            container.style.display = ''; // Show products in the selected category
        }
    });
}

// Add event listeners to filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = this.dataset.filter;
        if (filter === 'name') {
            sortByName();
        } else if (filter === 'price') {
            sortByPrice();
        } else {
            // Toggle filter if already applied
            const isApplied = this.classList.contains('applied');
            if (isApplied) {
                // Remove filter
                this.classList.remove('applied');
                if (filter === 'men' || filter === 'women') {
                    // Show all products when removing category filter
                    const productContainers = document.querySelectorAll('.pro');
                    productContainers.forEach(container => {
                        container.style.display = '';
                    });
                }
            } else {
                // Apply filter
                this.classList.add('applied');
                if (filter === 'men' || filter === 'women') {
                    filterByCategory(filter === 'men' ? 'm' : 'w');
                }
            }
        }
        
    });
});

    
});