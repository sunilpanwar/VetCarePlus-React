// Dashboard Page Component
const { useState, useEffect } = React;

function Dashboard() {
    const [stats, setStats] = useState({
        totalMedicines: 0,
        lowStockCount: 0,
        expiredCount: 0,
        expiringSoonCount: 0,
        totalRevenue: 0,
        totalSales: 0,
        totalVaccinations: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    async function loadDashboardData() {
        try {
            const response = await window.API.getDashboardData();
            if (response.success) {
                setStats(response.data);
            }
        } catch (error) {
            console.error('Error loading dashboard:', error);
        } finally {
            setLoading(false);
        }
    }

    function formatCurrency(amount) {
        return '₹' + parseFloat(amount || 0).toFixed(2);
    }

    if (loading) {
        return (
            <div className="container">
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="page-header">
                <h1>Dashboard</h1>
                <div className="header-actions">
                    <span className="welcome-text">Welcome back! 👋</span>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">📦</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.totalMedicines}</div>
                        <div className="stat-label">Total Medicines</div>
                    </div>
                </div>
                
                <div className="stat-card warning">
                    <div className="stat-icon">⚠️</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.lowStockCount}</div>
                        <div className="stat-label">Low Stock</div>
                    </div>
                </div>
                
                <div className="stat-card danger">
                    <div className="stat-icon">⏰</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.expiredCount}</div>
                        <div className="stat-label">Expired</div>
                    </div>
                </div>
                
                <div className="stat-card warning">
                    <div className="stat-icon">📅</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.expiringSoonCount}</div>
                        <div className="stat-label">Expiring Soon</div>
                    </div>
                </div>
            </div>

            {/* Sales & Vaccinations Stats */}
            <div className="stats-grid" style={{ marginTop: '1.5rem' }}>
                <div className="stat-card success">
                    <div className="stat-icon">💰</div>
                    <div className="stat-content">
                        <div className="stat-value">{formatCurrency(stats.totalRevenue)}</div>
                        <div className="stat-label">Total Revenue</div>
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon">🧾</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.totalSales}</div>
                        <div className="stat-label">Total Sales</div>
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon">💉</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.totalVaccinations}</div>
                        <div className="stat-label">Vaccinations</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Make it globally available
window.Dashboard = Dashboard;