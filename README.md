# SMEasyPOS - Point of Sale System

A modern, responsive Point of Sale (POS) system designed for small and medium-sized businesses (SMEs). Built with HTML, CSS, and JavaScript, this system provides a user-friendly interface with real-time functionality and role-based access control.

## Features

### User Authentication
- Role-based access (Admin, Manager, Cashier)
- Secure login system
- Session management

### Dashboard
- Role-specific dashboards
- Real-time metrics
- Interactive charts
- Quick actions

### Sales Management
- Real-time sales tracking
- Transaction history
- Cart management
- Checkout process

### Inventory Management
- Product tracking
- Stock alerts
- Search and filter functionality
- Add/Edit/Delete products

### Reporting
- Advanced reporting system
- Multiple report types
- Date range selection
- Export to PDF and Excel
- Interactive charts

### Real-time Features
- Live sales updates
- Staff performance tracking
- Inventory alerts
- Dynamic charts

## Technologies Used
- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript (ES6+)
- Chart.js for visualizations
- jsPDF for PDF generation
- SheetJS for Excel export

## Getting Started

### Prerequisites
- Modern web browser
- Local development server (optional)

### Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/smeasypos.git
```

2. Navigate to the project directory:
```bash
cd smeasypos
```

3. Open `index.html` in your web browser or set up a local server.

### Default Login Credentials
- Admin: username: `admin`, password: `admin123`
- Manager: username: `manager`, password: `manager123`
- Cashier: username: `cashier`, password: `cashier123`

## Project Structure
```
smeasypos/
├── index.html          # Main application page
├── login.html          # Login page
├── styles.css          # Main styles
├── auth.css           # Authentication styles
├── script.js          # Main application logic
├── auth.js            # Authentication logic
└── README.md          # Project documentation
```

## Features by Role

### Admin
- Full system access
- User management
- System settings
- Backup and restore

### Manager
- Real-time sales monitoring
- Staff performance tracking
- Inventory management
- Advanced reporting

### Cashier
- Transaction processing
- Basic inventory view
- Customer service tools
- Quick actions

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Chart.js for visualization
- jsPDF for PDF generation
- SheetJS for Excel export 