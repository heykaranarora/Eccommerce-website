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