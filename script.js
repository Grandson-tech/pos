// Product data
const products = [
    { id: 'laptop', name: 'Laptop', price: 1000 },
    { id: 'mouse', name: 'Mouse', price: 20 }
];

// Cart array to store items
let cart = [];

// DOM Elements
const productSelect = document.getElementById('product');
const quantityInput = document.getElementById('quantity');
const addToCartBtn = document.getElementById('addToCart');
const cartItems = document.getElementById('cartItems');
const totalAmount = document.getElementById('totalAmount');
const checkoutBtn = document.getElementById('checkout');
const loyaltyPoints = document.getElementById('loyaltyPoints');
const addPointsBtn = document.getElementById('addPoints');

// Reports Section
const reportType = document.getElementById('reportType');
const generateReportBtn = document.getElementById('generateReport');
const totalSalesElement = document.getElementById('totalSales');
const transactionCountElement = document.getElementById('transactionCount');
const averageTransactionElement = document.getElementById('averageTransaction');
const dateRange = document.getElementById('dateRange');
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');
const customDateRange = document.querySelector('.custom-date-range');
const exportPDF = document.getElementById('exportPDF');
const exportExcel = document.getElementById('exportExcel');
const reportTableBody = document.getElementById('reportTableBody');
let salesChart = null;
let categoryChart = null;

// Sample sales data (in a real application, this would come from a database)
const salesData = {
    daily: {
        labels: ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'],
        sales: [100, 150, 200, 300, 250, 180, 220, 280, 320]
    },
    weekly: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        sales: [1200, 1500, 1800, 1600, 2000, 2500, 2200]
    },
    monthly: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        sales: [5000, 6000, 5500, 7000]
    }
};

// Sample report data (in a real application, this would come from a database)
const reportData = {
    sales: {
        daily: [
            { date: '2024-01-01', product: 'Laptop', quantity: 2, revenue: 2000 },
            { date: '2024-01-01', product: 'Mouse', quantity: 5, revenue: 100 },
            { date: '2024-01-02', product: 'Keyboard', quantity: 3, revenue: 150 }
        ],
        weekly: [
            { date: 'Week 1', product: 'Laptop', quantity: 10, revenue: 10000 },
            { date: 'Week 1', product: 'Mouse', quantity: 20, revenue: 400 },
            { date: 'Week 2', product: 'Keyboard', quantity: 15, revenue: 750 }
        ],
        monthly: [
            { date: 'January', product: 'Laptop', quantity: 40, revenue: 40000 },
            { date: 'January', product: 'Mouse', quantity: 80, revenue: 1600 },
            { date: 'January', product: 'Keyboard', quantity: 60, revenue: 3000 }
        ]
    }
};

// Enhanced Inventory Management
const inventorySearch = document.getElementById('inventorySearch');
const stockFilter = document.getElementById('stockFilter');
const addProductBtn = document.getElementById('addProduct');
const inventoryItems = document.getElementById('inventoryItems');

// Enhanced product data with more details
const enhancedProducts = [
    { id: 'laptop', name: 'Laptop', price: 1000, quantity: 5, category: 'Electronics', minStock: 3 },
    { id: 'mouse', name: 'Mouse', price: 20, quantity: 10, category: 'Accessories', minStock: 5 },
    { id: 'keyboard', name: 'Keyboard', price: 50, quantity: 8, category: 'Accessories', minStock: 4 },
    { id: 'monitor', name: 'Monitor', price: 300, quantity: 3, category: 'Electronics', minStock: 2 }
];

// Authentication Check
function checkAuth() {
    const user = localStorage.getItem('currentUser');
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    return JSON.parse(user);
}

// Role-specific Dashboard Data
const dashboardData = {
    admin: {
        totalRevenue: 15000,
        activeUsers: 5,
        systemStatus: 'Online'
    },
    manager: {
        todaySales: 2500,
        lowStockCount: 3,
        staffPerformance: 'Good'
    },
    cashier: {
        todayTransactions: 15,
        avgTransaction: 166.67,
        customerSatisfaction: 'High'
    }
};

// Update Dashboard based on role
function updateDashboard() {
    const user = checkAuth();
    if (!user) return;

    const data = dashboardData[user.role];
    if (!data) return;

    // Update role-specific dashboard elements
    Object.keys(data).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = typeof data[key] === 'number' && key.includes('Revenue') || key.includes('Sales') || key.includes('Transaction') 
                ? `$${data[key]}` 
                : data[key];
        }
    });
}

// Role-specific Functions
function manageUsers() {
    alert('User management functionality will be implemented here');
}

function systemSettings() {
    alert('System settings functionality will be implemented here');
}

function backupSystem() {
    alert('Backup system functionality will be implemented here');
}

function manageSchedule() {
    alert('Staff schedule management functionality will be implemented here');
}

function viewAlerts() {
    alert('Inventory alerts functionality will be implemented here');
}

function newTransaction() {
    // Scroll to transaction section
    document.getElementById('transactions').scrollIntoView({ behavior: 'smooth' });
}

function customerService() {
    alert('Customer service functionality will be implemented here');
}

// Real-time Manager Dashboard
let liveSalesChart = null;
let staffPerformanceChart = null;
let lastSalesValue = 0;

// Initialize real-time dashboard
function initializeManagerDashboard() {
    // Initialize charts
    initializeLiveCharts();
    
    // Start real-time updates
    startRealTimeUpdates();
}

// Initialize live charts
function initializeLiveCharts() {
    // Live Sales Chart
    const salesCtx = document.getElementById('liveSalesChart').getContext('2d');
    liveSalesChart = new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Live Sales',
                data: [],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => '$' + value
                    }
                }
            }
        }
    });

    // Staff Performance Chart
    const staffCtx = document.getElementById('staffPerformanceChart').getContext('2d');
    staffPerformanceChart = new Chart(staffCtx, {
        type: 'bar',
        data: {
            labels: ['John', 'Sarah', 'Mike', 'Lisa'],
            datasets: [{
                label: 'Transactions',
                data: [12, 15, 8, 10],
                backgroundColor: '#2ecc71'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Start real-time updates
function startRealTimeUpdates() {
    // Update every 5 seconds
    setInterval(() => {
        updateLiveSales();
        updateStaffStatus();
        updateInventoryAlerts();
    }, 5000);
}

// Update live sales
function updateLiveSales() {
    // Simulate new sales data (in a real application, this would come from a server)
    const newSale = Math.random() * 1000;
    const currentSales = parseFloat(document.getElementById('liveSales').textContent.replace('$', ''));
    const newTotal = currentSales + newSale;
    
    // Update sales value with animation
    const salesElement = document.getElementById('liveSales');
    salesElement.textContent = `$${newTotal.toFixed(2)}`;
    salesElement.classList.add('updated');
    setTimeout(() => salesElement.classList.remove('updated'), 500);
    
    // Update trend
    const trendElement = document.getElementById('salesTrend');
    const trend = ((newTotal - lastSalesValue) / lastSalesValue * 100).toFixed(1);
    trendElement.textContent = `${trend >= 0 ? '↑' : '↓'} ${Math.abs(trend)}%`;
    trendElement.className = `metric-trend ${trend >= 0 ? '' : 'down'}`;
    
    // Update chart
    const now = new Date().toLocaleTimeString();
    liveSalesChart.data.labels.push(now);
    liveSalesChart.data.datasets[0].data.push(newSale);
    
    // Keep only last 10 data points
    if (liveSalesChart.data.labels.length > 10) {
        liveSalesChart.data.labels.shift();
        liveSalesChart.data.datasets[0].data.shift();
    }
    
    liveSalesChart.update();
    lastSalesValue = newTotal;
}

// Update staff status
function updateStaffStatus() {
    const staffList = document.getElementById('staffList');
    const activeStaff = Math.floor(Math.random() * 4) + 1;
    document.getElementById('activeStaff').textContent = activeStaff;
    
    // Update staff list
    staffList.innerHTML = '';
    const staff = ['John', 'Sarah', 'Mike', 'Lisa'];
    for (let i = 0; i < activeStaff; i++) {
        const staffItem = document.createElement('div');
        staffItem.className = 'staff-item';
        staffItem.innerHTML = `
            <span>${staff[i]}</span>
            <span>${Math.floor(Math.random() * 10) + 1} transactions</span>
        `;
        staffList.appendChild(staffItem);
    }
}

// Update inventory alerts
function updateInventoryAlerts() {
    const alertsList = document.getElementById('inventoryAlerts');
    alertsList.innerHTML = '';
    
    // Simulate random alerts
    const products = ['Laptop', 'Mouse', 'Keyboard', 'Monitor'];
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const randomQuantity = Math.floor(Math.random() * 5) + 1;
    
    if (Math.random() > 0.7) { // 30% chance of alert
        const alertItem = document.createElement('div');
        alertItem.className = `alert-item ${randomQuantity <= 2 ? 'critical' : ''}`;
        alertItem.textContent = `Low stock alert: ${randomProduct} (${randomQuantity} remaining)`;
        alertsList.appendChild(alertItem);
    }
}

// View live transactions
function viewLiveTransactions() {
    // In a real application, this would show a modal with live transactions
    alert('Live transactions view will be implemented here');
}

// Initialize UI and Dashboard
function initializeUI() {
    const user = checkAuth();
    if (!user) return;

    // Update user info
    document.getElementById('userName').textContent = user.username;
    document.getElementById('userRole').textContent = user.role;

    // Show/hide elements based on role
    const adminSection = document.getElementById('adminSection');
    if (user.role === ROLES.ADMIN) {
        adminSection.style.display = 'block';
    }

    // Add role-based data attributes
    document.body.setAttribute('data-role', user.role);

    // Initialize manager dashboard if user is manager
    if (user.role === ROLES.MANAGER) {
        initializeManagerDashboard();
    }

    // Update dashboard
    updateDashboard();
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Event Listeners
document.getElementById('logoutBtn').addEventListener('click', logout);

// Add to Cart Function
function addToCart() {
    const productId = productSelect.value;
    const quantity = parseInt(quantityInput.value);

    if (!productId || quantity < 1) {
        alert('Please select a product and enter a valid quantity');
        return;
    }

    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: quantity
        });
    }

    updateCartDisplay();
    resetForm();
}

// Update Cart Display
function updateCartDisplay() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const row = document.createElement('tr');
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price}</td>
            <td>$${itemTotal}</td>
            <td><button class="btn" onclick="removeItem('${item.id}')">Remove</button></td>
        `;
        cartItems.appendChild(row);
    });

    totalAmount.textContent = total;
}

// Remove Item from Cart
function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

// Reset Form
function resetForm() {
    productSelect.value = '';
    quantityInput.value = 1;
}

// Checkout Function
function checkout() {
    if (cart.length === 0) {
        alert('Cart is empty!');
        return;
    }

    alert('Checkout successful!');
    cart = [];
    updateCartDisplay();
}

// Add Loyalty Points
function addLoyaltyPoints() {
    const currentPoints = parseInt(loyaltyPoints.textContent);
    loyaltyPoints.textContent = currentPoints + 10;
}

// Handle date range selection
dateRange.addEventListener('change', (e) => {
    if (e.target.value === 'custom') {
        customDateRange.style.display = 'grid';
    } else {
        customDateRange.style.display = 'none';
    }
});

// Generate Report Function
function generateReport() {
    const selectedType = reportType.value;
    const selectedRange = dateRange.value;
    
    // Get data based on selection
    const data = getReportData(selectedType, selectedRange);
    
    // Update summary statistics
    updateReportSummary(data);
    
    // Update charts
    updateCharts(data);
    
    // Update table
    updateReportTable(data);
}

// Get report data
function getReportData(type, range) {
    // In a real application, this would fetch data from a database
    return reportData[type][range] || [];
}

// Update report summary
function updateReportSummary(data) {
    const totalSales = data.reduce((sum, item) => sum + item.revenue, 0);
    const transactionCount = data.length;
    const averageTransaction = totalSales / transactionCount;
    const topProduct = data.reduce((max, item) => 
        item.revenue > max.revenue ? item : max, data[0]);

    document.getElementById('totalSales').textContent = `$${totalSales}`;
    document.getElementById('transactionCount').textContent = transactionCount;
    document.getElementById('averageTransaction').textContent = `$${Math.round(averageTransaction)}`;
    document.getElementById('topProduct').textContent = topProduct ? topProduct.product : '-';
}

// Update charts
function updateCharts(data) {
    // Sales Chart
    if (salesChart) {
        salesChart.destroy();
    }
    
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    salesChart = new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: data.map(item => item.date),
            datasets: [{
                label: 'Sales',
                data: data.map(item => item.revenue),
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Sales Trend'
                }
            }
        }
    });

    // Category Chart
    if (categoryChart) {
        categoryChart.destroy();
    }
    
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    categoryChart = new Chart(categoryCtx, {
        type: 'pie',
        data: {
            labels: data.map(item => item.product),
            datasets: [{
                data: data.map(item => item.revenue),
                backgroundColor: [
                    '#3498db',
                    '#2ecc71',
                    '#e74c3c',
                    '#f1c40f',
                    '#9b59b6'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Sales by Product'
                }
            }
        }
    });
}

// Update report table
function updateReportTable(data) {
    reportTableBody.innerHTML = '';
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.date}</td>
            <td>${item.product}</td>
            <td>${item.quantity}</td>
            <td>$${item.revenue}</td>
        `;
        reportTableBody.appendChild(row);
    });
}

// Export functions
function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Sales Report', 14, 20);
    
    // Add date range
    doc.setFontSize(12);
    doc.text(`Date Range: ${dateRange.value}`, 14, 30);
    
    // Add summary statistics
    doc.setFontSize(14);
    doc.text('Summary Statistics', 14, 40);
    doc.setFontSize(12);
    doc.text(`Total Sales: ${document.getElementById('totalSales').textContent}`, 14, 50);
    doc.text(`Number of Transactions: ${document.getElementById('transactionCount').textContent}`, 14, 60);
    doc.text(`Average Transaction: ${document.getElementById('averageTransaction').textContent}`, 14, 70);
    doc.text(`Top Product: ${document.getElementById('topProduct').textContent}`, 14, 80);
    
    // Add table
    const tableData = Array.from(reportTableBody.rows).map(row => 
        Array.from(row.cells).map(cell => cell.textContent)
    );
    
    doc.autoTable({
        head: [['Date', 'Product', 'Quantity', 'Revenue']],
        body: tableData,
        startY: 90,
        theme: 'grid',
        styles: {
            fontSize: 10,
            cellPadding: 5
        },
        headStyles: {
            fillColor: [52, 152, 219],
            textColor: 255
        }
    });
    
    // Add charts
    const salesChartImg = salesChart.toBase64Image();
    const categoryChartImg = categoryChart.toBase64Image();
    
    doc.addImage(salesChartImg, 'PNG', 14, doc.lastAutoTable.finalY + 10, 180, 100);
    doc.addImage(categoryChartImg, 'PNG', 14, doc.lastAutoTable.finalY + 120, 180, 100);
    
    // Save the PDF
    doc.save('sales-report.pdf');
}

function exportToExcel() {
    // Create workbook
    const wb = XLSX.utils.book_new();
    
    // Add summary sheet
    const summaryData = [
        ['Sales Report Summary'],
        ['Date Range', dateRange.value],
        ['Total Sales', document.getElementById('totalSales').textContent],
        ['Number of Transactions', document.getElementById('transactionCount').textContent],
        ['Average Transaction', document.getElementById('averageTransaction').textContent],
        ['Top Product', document.getElementById('topProduct').textContent],
        [],
        ['Detailed Sales Data']
    ];
    
    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');
    
    // Add detailed data sheet
    const tableData = Array.from(reportTableBody.rows).map(row => 
        Array.from(row.cells).map(cell => cell.textContent)
    );
    
    const dataSheet = XLSX.utils.aoa_to_sheet([
        ['Date', 'Product', 'Quantity', 'Revenue'],
        ...tableData
    ]);
    
    // Add some styling
    const range = XLSX.utils.decode_range(dataSheet['!ref']);
    for (let C = range.s.c; C <= range.e.c; ++C) {
        const address = XLSX.utils.encode_cell({ r: 0, c: C });
        if (!dataSheet[address]) continue;
        dataSheet[address].s = {
            font: { bold: true },
            fill: { fgColor: { rgb: "3498db" } },
            alignment: { horizontal: "center" }
        };
    }
    
    XLSX.utils.book_append_sheet(wb, dataSheet, 'Sales Data');
    
    // Save the Excel file
    XLSX.writeFile(wb, 'sales-report.xlsx');
}

// Event Listeners
addToCartBtn.addEventListener('click', addToCart);
checkoutBtn.addEventListener('click', checkout);
addPointsBtn.addEventListener('click', addLoyaltyPoints);
generateReportBtn.addEventListener('click', generateReport);
exportPDF.addEventListener('click', exportToPDF);
exportExcel.addEventListener('click', exportToExcel);

// Initialize
updateCartDisplay();
generateReport();

// Update inventory display
function updateInventoryDisplay() {
    const searchTerm = inventorySearch.value.toLowerCase();
    const filterValue = stockFilter.value;
    
    inventoryItems.innerHTML = '';
    
    const filteredProducts = enhancedProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesFilter = filterValue === 'all' || 
            (filterValue === 'low' && product.quantity <= product.minStock) ||
            (filterValue === 'out' && product.quantity === 0);
        
        return matchesSearch && matchesFilter;
    });
    
    filteredProducts.forEach(product => {
        const row = document.createElement('tr');
        const status = getStockStatus(product);
        
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>$${product.price}</td>
            <td><span class="status-indicator status-${status}">${status}</span></td>
            <td class="action-buttons">
                <button class="btn btn-edit" onclick="editProduct('${product.id}')">Edit</button>
                <button class="btn btn-delete" onclick="deleteProduct('${product.id}')">Delete</button>
            </td>
        `;
        inventoryItems.appendChild(row);
    });
}

// Get stock status
function getStockStatus(product) {
    if (product.quantity === 0) return 'out-of-stock';
    if (product.quantity <= product.minStock) return 'low-stock';
    return 'in-stock';
}

// Edit product
function editProduct(productId) {
    const product = enhancedProducts.find(p => p.id === productId);
    if (!product) return;
    
    const newQuantity = prompt('Enter new quantity:', product.quantity);
    if (newQuantity === null) return;
    
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 0) {
        alert('Please enter a valid quantity');
        return;
    }
    
    product.quantity = quantity;
    updateInventoryDisplay();
}

// Delete product
function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    const index = enhancedProducts.findIndex(p => p.id === productId);
    if (index !== -1) {
        enhancedProducts.splice(index, 1);
        updateInventoryDisplay();
    }
}

// Add new product
function addNewProduct() {
    const name = prompt('Enter product name:');
    if (!name) return;
    
    const price = prompt('Enter product price:');
    if (!price) return;
    
    const quantity = prompt('Enter initial quantity:');
    if (!quantity) return;
    
    const category = prompt('Enter product category:');
    if (!category) return;
    
    const minStock = prompt('Enter minimum stock level:');
    if (!minStock) return;
    
    const newProduct = {
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        category,
        minStock: parseInt(minStock)
    };
    
    enhancedProducts.push(newProduct);
    updateInventoryDisplay();
}

// Event Listeners
inventorySearch.addEventListener('input', updateInventoryDisplay);
stockFilter.addEventListener('change', updateInventoryDisplay);
addProductBtn.addEventListener('click', addNewProduct);

// Initialize inventory display
updateInventoryDisplay();

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        inventorySearch.focus();
    }
});

// Add local storage support
function saveToLocalStorage() {
    localStorage.setItem('posInventory', JSON.stringify(enhancedProducts));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('posInventory');
    if (saved) {
        enhancedProducts.length = 0;
        enhancedProducts.push(...JSON.parse(saved));
        updateInventoryDisplay();
    }
}

// Save changes to local storage
window.addEventListener('beforeunload', saveToLocalStorage);

// Load data on startup
loadFromLocalStorage();

// Initialize UI on page load
initializeUI(); 