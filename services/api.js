// API Service Layer
// All API calls to Google Apps Script backend

const API = {
    // Helper function to call API
    async call(action, params = {}) {
        return await window.API_CONFIG.callAPI(action, params);
    },

    // Authentication
    async login(username, password) {
        return await this.call('login', { username, password });
    },

    async logout() {
        return await this.call('logout');
    },

    // Dashboard
    async getDashboardData() {
        return await this.call('getDashboardData');
    },

    // Medicines
    async getAllMedicines() {
        return await this.call('getMedicines');
    },

    async saveMedicine(medicineData) {
        return await this.call('saveMedicine', medicineData);
    },

    async deleteMedicine(id) {
        return await this.call('deleteMedicine', { id });
    },

    // Sales
    async getAllSales() {
        return await this.call('getSales');
    },

    async saveSale(saleData) {
        // Stringify items array for URL parameters
        if (saleData.items) {
            saleData.items = JSON.stringify(saleData.items);
        }
        return await this.call('saveSale', saleData);
    },

    // Vaccinations
    async getAllVaccinations() {
        return await this.call('getAllVaccinations');
    },

    async saveVaccination(vaccinationData) {
        return await this.call('saveVaccination', vaccinationData);
    }
};

// Make it globally available
window.API = API;