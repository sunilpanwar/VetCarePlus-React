// Navbar Component
const { useState } = React;

function Navbar({ currentPage, onNavigate }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleNavigation = (page) => {
        onNavigate(page);
        setMenuOpen(false); // Close menu after navigation
    };

    const handleLogout = async () => {
        if (confirm('Are you sure you want to logout?')) {
            await window.AuthService.logout();
            onNavigate('login');
        }
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-brand">
                    <a onClick={() => handleNavigation('dashboard')} className="brand-link">
                        <span className="brand-icon">💊</span>
                        <span className="brand-text">VetCare Plus</span>
                    </a>
                </div>
                
                <button 
                    className={`navbar-toggle ${menuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                >
                    <div className="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>
                
                <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
                    <a 
                        onClick={() => handleNavigation('dashboard')}
                        className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
                    >
                        Dashboard
                    </a>
                    <a 
                        onClick={() => handleNavigation('medicines')}
                        className={`nav-link ${currentPage === 'medicines' ? 'active' : ''}`}
                    >
                        Medicines
                    </a>
                    <a 
                        onClick={() => handleNavigation('sales')}
                        className={`nav-link ${currentPage === 'sales' ? 'active' : ''}`}
                    >
                        Sales
                    </a>
                    <a 
                        onClick={() => handleNavigation('vaccinations')}
                        className={`nav-link ${currentPage === 'vaccinations' ? 'active' : ''}`}
                    >
                        Vaccinations
                    </a>
                    <button onClick={handleLogout} className="nav-link">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

// Make it globally available
window.Navbar = Navbar;