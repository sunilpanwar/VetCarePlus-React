// Login Page Component
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
            setError(result.message || 'Login failed');
        }
        
        setLoading(false);
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-icon">💊</div>
                    <h1 className="login-title">VetCare Plus</h1>
                    <p className="login-subtitle">Management System</p>
                </div>

                {error && <Alert message={error} type="error" onClose={() => setError('')} />}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="login-form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="login-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className="login-form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="login-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="default-credentials">
                    <div className="default-credentials-title">📝 Default Login Credentials</div>
                    <div className="default-credentials-text">
                        <strong>Username:</strong> admin<br />
                        <strong>Password:</strong> admin123
                    </div>
                </div>

                <div className="login-footer">
                    <p>&copy; 2024 VetCare Plus System</p>
                </div>
            </div>
        </div>
    );
}

// Make it globally available
window.Login = Login;