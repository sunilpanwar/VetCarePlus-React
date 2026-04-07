// Main App Component
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

// Render the app when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
});