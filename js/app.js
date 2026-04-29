// Springfield CAP Inventory - Main Application
class InventoryApp {
    constructor() {
        this.initialized = false;
    }

    async init() {
        if (this.initialized) return;
        ui.renderLayout();
        await storage.loadLocalData();
        await ui.renderDashboard();
        this.initialized = true;
        console.log(`${CONFIG.APP_NAME} v${CONFIG.VERSION} initialized`);
    }
}

const app = new InventoryApp();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}
