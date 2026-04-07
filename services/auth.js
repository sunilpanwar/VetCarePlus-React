// Authentication Service
const AuthService = {
    // Check if user is authenticated
    isAuthenticated() {
        return sessionStorage.getItem('authenticated') === 'true';
    },

    // Get current user
    getUser() {
        const userStr = sessionStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    // Set authentication
    setAuth(user) {
        sessionStorage.setItem('authenticated', 'true');
        sessionStorage.setItem('user', JSON.stringify(user));
    },

    // Clear authentication
    clearAuth() {
        sessionStorage.removeItem('authenticated');
        sessionStorage.removeItem('user');
    },

    // Login
    async login(username, password) {
        try {
            const response = await window.API.login(username, password);
            if (response.success) {
                this.setAuth(response.user);
                return { success: true, user: response.user };
            }
            return { success: false, message: response.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    // Logout
    async logout() {
        try {
            await window.API.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            this.clearAuth();
        }
    }
};

// Make it globally available
window.AuthService = AuthService;