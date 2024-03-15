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

    // signup data in local storage
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
        event.preventDefault();

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
            if (name === "" ) {
                alert("Please Enter Your Name");
            }else if (password === "") {
                alert("Please enter your password.");
            }
            else if (emailExists(email)) {
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
        var searchTerm = input.value.trim();
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
            cart.style.display = 'none'; 
        } else {
            cart.style.display = 'block';
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
                    <button class="quantity-decrease">+</button>
                    <span class="quantity">1</span>
                    <button class="quantity-increase">-</button>
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




    
    
// Function to sort products by name
function sortByName() {
    const productContainers = document.querySelectorAll('.pro');
    const sortedProducts = Array.from(productContainers).sort((a, b) => {
        const nameA = a.querySelector('.des h5').textContent.toLowerCase();
        const nameB = b.querySelector('.des h5').textContent.toLowerCase();
        return nameA.localeCompare(nameB);
    });
    const parent = document.querySelector('#product1');
    parent.innerHTML = '';
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
    parent.innerHTML = '';
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
            container.style.display = 'none';
        } else {
            container.style.display = '';
        }
    });
}
const appliedFilters = {
    name: false,
    price: false,
    men: false,
    tshirts: false
};

// Add event listeners to filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = this.dataset.filter;
        // Check the type of filter
        if (filter === 'name') {
            sortByName();
        } else if (filter === 'price') {
            sortByPrice();
        } else {
            // Toggle filter
            const isApplied = this.classList.contains('applied');
            if (isApplied) {
                this.classList.remove('applied');
            } else {
                this.classList.add('applied');
            }
            filterByCategory(filter === 'shirts' ? 'shirt' : 'w');
        }

        // Toggle applied class for the clicked button
        if (filter !== 'name' && filter !== 'price') {
            this.classList.toggle('applied');
        }
    });
});

    
});




// slider
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  slides.forEach((slide) => {
    slide.style.display = 'none';
  });
  dots.forEach((dot) => {
    dot.classList.remove('act');
  });
  slides[index].style.display = 'block';
  dots[index].classList.add('act');
}

function nextSlide() {
  slideIndex++;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  showSlide(slideIndex);
}

function currentSlide(index) {
  slideIndex = index;
  showSlide(slideIndex);
}

document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide(index);
  });
});

function autoSlide() {
  nextSlide();
}
setInterval(autoSlide, 3000);

// whatsapp redirection

document.getElementById('whatsappBtn').addEventListener('click', function() {
    var whatsappNumber = '8168430617';
    var predefinedMessage = 'Hello, I have a query.';
    var whatsappUrl = 'https://api.whatsapp.com/send?phone=' + whatsappNumber;
    if (predefinedMessage) {
      whatsappUrl += '&text=' + encodeURIComponent(predefinedMessage);
    }
    window.location.href = whatsappUrl;
  });

