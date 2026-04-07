# VetCare Plus - React Version

## 🎯 Overview
This is a React version of VetCare Plus using **React CDN** (no npm/build tools required) with **Google Sheets** as the backend via Google Apps Script.

---

## 📁 Project Structure

```
VetCarePlus-React/
├── index.html              # Main HTML file (loads React via CDN)
├── config.js               # API configuration
├── App.jsx                 # Main React app with routing
├── components/             # Reusable React components
│   ├── Navbar.jsx         # Navigation bar with hamburger menu
│   ├── FAB.jsx            # Floating Action Button
│   ├── FilterButtons.jsx  # Filter buttons component
│   ├── Modal.jsx          # Modal dialog component
│   └── Alert.jsx          # Alert/notification component
├── pages/                  # Page components
│   ├── Login.jsx          # Login page
│   ├── Dashboard.jsx      # Dashboard page
│   ├── Medicines.jsx      # Medicines management
│   ├── Sales.jsx          # Sales management
│   └── Vaccinations.jsx   # Vaccinations with smart filtering
├── services/               # Service layer
│   ├── api.js             # API calls to Google Apps Script
│   └── auth.js            # Authentication service
└── styles/
    └── common.css         # All styles (copied from original)
```

---

## 🚀 Setup Instructions

### 1. Configure Google Apps Script URL

Edit `config.js` and replace with your Google Apps Script Web App URL:

```javascript
const API_CONFIG = {
    API_URL: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
    // ...
};
```

### 2. Open in Browser

Simply open `index.html` in your browser. No build step required!

```bash
# Option 1: Double-click index.html

# Option 2: Use a local server (recommended)
python3 -m http.server 8000
# Then open: http://localhost:8000

# Option 3: Use VS Code Live Server extension
```

---

## 🎨 Features

### ✅ All Features from Original App
- Login/Logout
- Dashboard with statistics
- Medicines management
- Sales management
- Vaccinations with smart filtering
- Hamburger menu for mobile
- Floating Action Button (FAB)
- Horizontal scrolling tables on mobile
- Pagination ready

### ✅ React Benefits
- Component-based architecture
- Reusable components
- Better code organization
- State management with hooks
- Single Page Application (SPA)
- No page reloads

### ✅ Same Backend
- Google Apps Script (same Code.gs)
- Google Sheets (same data storage)
- Same API endpoints
- FREE forever!

---

## 📝 How It Works

### React with CDN (No npm!)

This project uses React via CDN, which means:
- ✅ No Node.js required
- ✅ No npm install
- ✅ No build step
- ✅ Just open HTML file
- ✅ Perfect for learning React

### Architecture

```
┌─────────────────────────────────┐
│     React Frontend (CDN)        │
│  - Components (Navbar, FAB)     │
│  - Pages (Login, Dashboard)     │
│  - State (useState, useEffect)  │
└────────────┬────────────────────┘
             │
             │ fetch() API calls
             │
┌────────────▼────────────────────┐
│   Google Apps Script Backend    │
│  - Code.gs (REST API)           │
│  - Google Sheets (Database)     │
└─────────────────────────────────┘
```

---

## 🔧 Development Guide

### Creating a New Page

1. Create file in `pages/` folder:

```jsx
// pages/MyPage.jsx
const { useState, useEffect } = React;

function MyPage() {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        loadData();
    }, []);
    
    async function loadData() {
        const response = await window.API.call('getData');
        if (response.success) {
            setData(response.data);
        }
    }
    
    return (
        <div className="container">
            <h1>My Page</h1>
            {/* Your content here */}
        </div>
    );
}

window.MyPage = MyPage;
```

2. Add to `index.html`:

```html
<script type="text/babel" src="pages/MyPage.jsx"></script>
```

3. Add route in `App.jsx`:

```jsx
case 'mypage':
    return <MyPage />;
```

### Creating a New Component

```jsx
// components/MyComponent.jsx
function MyComponent({ prop1, prop2 }) {
    return (
        <div className="my-component">
            {/* Component content */}
        </div>
    );
}

window.MyComponent = MyComponent;
```

---

## 📚 Example: Login Page

```jsx
// pages/Login.jsx
const { useState } = React;

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await window.AuthService.login(username, password);
        
        if (result.success) {
            onLogin();
        } else {
            setError(result.message);
        }
        
        setLoading(false);
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>VetCare Plus</h1>
                
                {error && <Alert message={error} type="error" />}
                
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}

window.Login = Login;
```

---

## 🎯 Main App Structure

```jsx
// App.jsx
const { useState, useEffect } = React;

function App() {
    const [currentPage, setCurrentPage] = useState('login');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if user is already logged in
        if (window.AuthService.isAuthenticated()) {
            setIsAuthenticated(true);
            setCurrentPage('dashboard');
        }
    }, []);

    function handleLogin() {
        setIsAuthenticated(true);
        setCurrentPage('dashboard');
    }

    function handleNavigate(page) {
        setCurrentPage(page);
    }

    // Render current page
    function renderPage() {
        if (!isAuthenticated && currentPage !== 'login') {
            return <Login onLogin={handleLogin} />;
        }

        switch (currentPage) {
            case 'login':
                return <Login onLogin={handleLogin} />;
            case 'dashboard':
                return <Dashboard />;
            case 'medicines':
                return <Medicines />;
            case 'sales':
                return <Sales />;
            case 'vaccinations':
                return <Vaccinations />;
            default:
                return <Dashboard />;
        }
    }

    return (
        <>
            {isAuthenticated && (
                <Navbar 
                    currentPage={currentPage} 
                    onNavigate={handleNavigate} 
                />
            )}
            
            <main className="main-content">
                {renderPage()}
            </main>
            
            {isAuthenticated && (
                <footer className="footer">
                    <div className="container">
                        <p>&copy; 2024 VetCare Plus System. All rights reserved.</p>
                    </div>
                </footer>
            )}
        </>
    );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

---

## 🔄 API Calls

### Using the API Service

```jsx
// Get all medicines
const response = await window.API.getAllMedicines();
if (response.success) {
    setMedicines(response.data);
}

// Save medicine
const result = await window.API.saveMedicine({
    name: 'Amoxicillin',
    quantity: 100,
    price: 50
});

// Delete medicine
await window.API.deleteMedicine(medicineId);
```

---

## 📱 Mobile Features

### Hamburger Menu
- Automatically collapses on mobile
- Smooth animations
- Touch-friendly

### FAB (Floating Action Button)
```jsx
<FAB 
    onClick={() => setModalOpen(true)} 
    icon="+" 
    title="Add Record" 
/>
```

### Filter Buttons
```jsx
<FilterButtons
    activeFilter={filter}
    onFilterChange={setFilter}
    filters={[
        { id: 'overdue', label: '⚠️ Overdue' },
        { id: 'upcoming', label: '📅 Upcoming' },
        { id: 'all', label: '📋 All' }
    ]}
/>
```

---

## 🎨 Styling

All styles are in `styles/common.css` (copied from original project):
- Responsive design
- Mobile-first approach
- Horizontal scrolling tables
- FAB styles
- Filter button styles
- Modal styles

---

## 🚀 Deployment

### GitHub Pages
1. Push to GitHub
2. Enable GitHub Pages
3. Done! (Static site, no build needed)

### Netlify
1. Drag & drop folder to Netlify
2. Done!

### Vercel
1. Import project
2. Deploy
3. Done!

---

## ✨ Benefits Over Vanilla JS Version

| Feature | Vanilla JS | React |
|---------|-----------|-------|
| Code Organization | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Reusability | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| State Management | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Maintainability | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Performance | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Learning Curve | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Setup Complexity | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ (CDN) |

---

## 📝 Next Steps

1. ✅ Structure created
2. ✅ Components created
3. ✅ Services created
4. ⏳ Complete all pages (Login, Dashboard, Medicines, Sales, Vaccinations)
5. ⏳ Test with Google Apps Script backend
6. ⏳ Deploy to GitHub Pages

---

## 🎯 Summary

This React version:
- ✅ Uses **same Google Sheets backend**
- ✅ **No npm/build tools** required (React CDN)
- ✅ **Better code organization** (components)
- ✅ **Same features** as vanilla JS version
- ✅ **FREE hosting** (GitHub Pages, Netlify, Vercel)
- ✅ **Easy to maintain** and extend

**Perfect for learning React while keeping your existing backend!** 🚀