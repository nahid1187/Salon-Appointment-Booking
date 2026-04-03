document.addEventListener("DOMContentLoaded", function() {

const loginBox = document.getElementById("loginBox");
const registerBox = document.getElementById("registerBox");
const forgotBox = document.getElementById("forgotBox");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");
const forgotLink = document.getElementById("forgotPasswordLink");
const backToLogin = document.getElementById("backToLogin");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// SWITCH FORMS
showRegister.onclick = () => {
loginBox.classList.remove("active");
registerBox.classList.add("active");
forgotBox.classList.remove("active");
};

showLogin.onclick = () => {
registerBox.classList.remove("active");
loginBox.classList.add("active");
forgotBox.classList.remove("active");
};

forgotLink.onclick = () => {
loginBox.classList.remove("active");
forgotBox.classList.add("active");
};

backToLogin.onclick = () => {
forgotBox.classList.remove("active");
loginBox.classList.add("active");
};

// SHOW PASSWORD
document.getElementById("showPasswordLogin").onchange = function(){
document.getElementById("loginPassword").type =
this.checked ? "text" : "password";
};

document.getElementById("showPasswordRegister").onchange = function(){
document.getElementById("password").type =
this.checked ? "text" : "password";
};

// AUTO LOGIN (REMEMBER ME)
const rememberedUser = JSON.parse(localStorage.getItem("rememberUser"));

if (rememberedUser) {
localStorage.setItem("currentUser", JSON.stringify(rememberedUser));

if (rememberedUser.role === "customer") {
window.location.href = "customer.html";
} else if (rememberedUser.role === "salon") {
window.location.href = "salon.html";
} else if (rememberedUser.role === "admin") {
window.location.href = "admin.html";
}
}

// LOGIN
loginForm.onsubmit = function(e) {
e.preventDefault();

const email = document.getElementById("loginEmail").value;
const password = document.getElementById("loginPassword").value;
const rememberMe = document.getElementById("rememberMe").checked;

// ADMIN LOGIN
if (email === "admin@gmail.com" && password === "123456") {

const adminUser = {
name: "Admin",
email,
role: "admin"
};

localStorage.setItem("currentUser", JSON.stringify(adminUser));

if (rememberMe) {
localStorage.setItem("rememberUser", JSON.stringify(adminUser));
}

window.location.href = "admin.html";
return;
}

// NORMAL USERS
const users = JSON.parse(localStorage.getItem("salonUsers")) || [];

const foundUser = users.find(u =>
u.email === email && u.password === password
);

if (!foundUser) {
alert("Invalid email or password!");
return;
}

localStorage.setItem("currentUser", JSON.stringify(foundUser));

if (rememberMe) {
localStorage.setItem("rememberUser", JSON.stringify(foundUser));
}

if (foundUser.role === "customer") {
window.location.href = "customer.html";
} else {
window.location.href = "salon.html";
}
};

// REGISTER
registerForm.onsubmit = function(e) {
e.preventDefault();

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const role = document.getElementById("role").value;

let users = JSON.parse(localStorage.getItem("salonUsers")) || [];

if (users.find(u => u.email === email)) {
alert("Email already exists!");
return;
}

users.push({ name, email, password, role });

localStorage.setItem("salonUsers", JSON.stringify(users));

alert("Registered successfully!");

registerBox.classList.remove("active");
loginBox.classList.add("active");
};

// RESET PASSWORD
document.getElementById("resetBtn").onclick = function(){

const email = document.getElementById("resetEmail").value;
const newPassword = document.getElementById("newPassword").value;

let users = JSON.parse(localStorage.getItem("salonUsers")) || [];

const user = users.find(u => u.email === email);

if (!user) {
alert("User not found!");
return;
}

user.password = newPassword;

localStorage.setItem("salonUsers", JSON.stringify(users));

alert("Password updated!");

forgotBox.classList.remove("active");
loginBox.classList.add("active");
};

});