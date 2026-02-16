document.addEventListener("DOMContentLoaded", function() {
    const loginBox = document.getElementById("loginBox");
    const registerBox = document.getElementById("registerBox");
    const showRegister = document.getElementById("showRegister");
    const showLogin = document.getElementById("showLogin");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const loginMessage = document.getElementById("loginMessage");
    const registerMessage = document.getElementById("registerMessage");

    const showPasswordLogin = document.getElementById("showPasswordLogin");
    const showPasswordRegister = document.getElementById("showPasswordRegister");
    
    if (showPasswordLogin) {
        showPasswordLogin.addEventListener("change", function() {
            const loginPassword = document.getElementById("loginPassword");
            loginPassword.type = this.checked ? "text" : "password";
        });
    }

    if (showPasswordRegister) {
        showPasswordRegister.addEventListener("change", function() {
            const registerPassword = document.getElementById("password");
            registerPassword.type = this.checked ? "text" : "password";
        });
    }

    showRegister.onclick = function() {
        loginBox.classList.remove("active");
        registerBox.classList.add("active");
        clearMessages();
    };

    showLogin.onclick = function() {
        registerBox.classList.remove("active");
        loginBox.classList.add("active");
        clearMessages();
    };

    function clearMessages() {
        if (loginMessage) loginMessage.style.display = "none";
        if (registerMessage) registerMessage.style.display = "none";
    }

    function showMessage(element, text, type) {
        if (!element) return;
        element.textContent = text;
        element.className = "message " + type;
        element.style.display = "block";
        
        setTimeout(function() {
            element.style.display = "none";
        }, 3000);
    }
    loginForm.onsubmit = function(e) {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        
        const users = JSON.parse(localStorage.getItem("salonUsers")) || [];
        
        let foundUser = null;
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === email && users[i].password === password) {
                foundUser = users[i];
                break;
            }
        }

        if (!foundUser) {
            alert("Invalid email or password!");
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        
        alert("Login successful! Redirecting...");

        if (foundUser.role === "customer") {
            window.location.href = "customer.html";
        } else if (foundUser.role === "salon") {
            window.location.href = "salon.html";
        } else if (foundUser.role === "stylist") {
            window.location.href = "stylist.html";
        }
    };

    registerForm.onsubmit = function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const role = document.getElementById("role").value;

        if (name.length < 2) {
            alert("Name must be at least 2 characters!");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters!");
            return;
        }

        const users = JSON.parse(localStorage.getItem("salonUsers")) || [];

        for (let i = 0; i < users.length; i++) {
            if (users[i].email === email) {
                alert("Email already registered!");
                return;
            }
        }

        users.push({
            name: name,
            email: email,
            password: password,
            role: role
        });

        localStorage.setItem("salonUsers", JSON.stringify(users));

        alert("Registration successful! Please login.");

        registerForm.reset();

        registerBox.classList.remove("active");
        loginBox.classList.add("active");
    };
});
