// User roles and permissions
const ROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    CASHIER: 'cashier'
};

// Sample users (in a real application, this would be in a database)
const users = [
    { username: 'admin', password: 'admin123', role: ROLES.ADMIN },
    { username: 'manager', password: 'manager123', role: ROLES.MANAGER },
    { username: 'cashier', password: 'cashier123', role: ROLES.CASHIER }
];

// DOM Elements
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

// Check if user is already logged in
function checkAuth() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        window.location.href = 'index.html';
    }
}

// Login function
function login(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        // Store user info in localStorage
        localStorage.setItem('currentUser', JSON.stringify({
            username: user.username,
            role: user.role
        }));
        return true;
    }
    return false;
}

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (login(username, password)) {
        window.location.href = 'index.html';
    } else {
        errorMessage.textContent = 'Invalid username or password';
    }
});

// Check authentication on page load
checkAuth(); 