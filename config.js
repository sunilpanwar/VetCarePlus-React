// API Configuration
// Replace this URL with your Google Apps Script Web App URL
const API_CONFIG = {
    // Your Google Apps Script Web App URL
    API_URL: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
    
    // API call helper function
    async callAPI(action, params = {}) {
        try {
            const url = new URL(this.API_URL);
            url.searchParams.append('action', action);
            
            // Add all parameters to URL
            Object.keys(params).forEach(key => {
                if (params[key] !== null && params[key] !== undefined && params[key] !== 'null') {
                    url.searchParams.append(key, params[key]);
                }
            });
            
            console.log('API Call:', action, params);
            
            const response = await fetch(url.toString());
            const data = await response.json();
            
            console.log('API Response:', data);
            
            return data;
        } catch (error) {
            console.error('API Error:', error);
            return {
                success: false,
                message: 'Network error: ' + error.message
            };
        }
    }
};

// Make it globally available
window.API_CONFIG = API_CONFIG;