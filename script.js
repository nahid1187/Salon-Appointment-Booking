
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded - DOM ready');
    
   
    const showPasswordLogin = document.getElementById('showPasswordLogin');
    const loginPassword = document.getElementById('loginPassword');
    
    if (showPasswordLogin && loginPassword) {
        showPasswordLogin.addEventListener('change', function() {
            if (this.checked) {
                loginPassword.type = 'text';
            } else {
                loginPassword.type = 'password';
            }
        });
    }
    
    const showPasswordRegister = document.getElementById('showPasswordRegister');
    const registerPassword = document.getElementById('password');
    
    if (showPasswordRegister && registerPassword) {
        showPasswordRegister.addEventListener('change', function() {
            if (this.checked) {
                registerPassword.type = 'text';
            } else {
                registerPassword.type = 'password';
            }
        });
    }
    
    const loginBox = document.getElementById('loginBox');
    const registerBox = document.getElementById('registerBox');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    console.log('Initial state - Login active:', loginBox.classList.contains('active'));
    console.log('Initial state - Register active:', registerBox.classList.contains('active'));
    
    showRegisterLink.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Clicked: Show Register Form');
        
        loginBox.classList.remove('active');
        registerBox.classList.add('active');
        
        console.log('After click - Login active:', loginBox.classList.contains('active'));
        console.log('After click - Register active:', registerBox.classList.contains('active'));
    });
    
    showLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Clicked: Show Login Form');
        
        
        registerBox.classList.remove('active');
        loginBox.classList.add('active');
    });
    
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Login form submitted');
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const messageDiv = document.getElementById('loginMessage');
        
        
        if (!email || !password) {
            showMessage(messageDiv, 'Please enter email and password', 'error');
            return;
        }
        
       
        const users = JSON.parse(localStorage.getItem('salonUsers')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
           
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            showMessage(messageDiv, `Login successful! Welcome ${user.name}`, 'success');
            loginForm.reset();
            
            
            setTimeout(() => {
                alert(`Welcome ${user.name}!\nRole: ${user.role}\nEmail: ${user.email}`);
            }, 1000);
        } else {
            showMessage(messageDiv, 'Invalid email or password', 'error');
        }
    });
    
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Register form submitted');
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;
        const messageDiv = document.getElementById('registerMessage');
        
     
        if (!name || !email || !password) {
            showMessage(messageDiv, 'Please fill all fields', 'error');
            return;
        }
        
        if (password.length < 6) {
            showMessage(messageDiv, 'Password must be at least 6 characters', 'error');
            return;
        }
        
        
        let users = JSON.parse(localStorage.getItem('salonUsers')) || [];
        
        if (users.some(user => user.email === email)) {
            showMessage(messageDiv, 'Email already registered', 'error');
            return;
        }
        
       
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password,
            role: role,
            createdAt: new Date().toISOString()
        };
        
       
        users.push(newUser);
        localStorage.setItem('salonUsers', JSON.stringify(users));
        
        showMessage(messageDiv, `Registration successful! Welcome ${name}`, 'success');
        registerForm.reset();
        
      
        setTimeout(() => {
            registerBox.classList.remove('active');
            loginBox.classList.add('active');
            showMessage(document.getElementById('loginMessage'), 
                       'Registration complete! Please login', 'success');
        }, 2000);
    });
    
    function showMessage(element, text, type) {
        element.textContent = text;
        element.className = 'message ' + type;
        element.style.display = 'block';
        
        setTimeout(() => {
            element.style.display = 'none';
        }, 3000);
    }
    
  
    const users = JSON.parse(localStorage.getItem('salonUsers')) || [];
    console.log('Users in localStorage:', users);
});