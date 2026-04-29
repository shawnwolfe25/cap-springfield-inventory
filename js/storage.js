class StorageManager {
    constructor() {
        this.useRemote = !!CONFIG.KV_TOKEN;
        this.localData = this.loadLocalData();
    }

    loadLocalData() {
        try {
            const inventory = localStorage.getItem(CONFIG.STORAGE_KEYS.INVENTORY);
            const categories = localStorage.getItem(CONFIG.STORAGE_KEYS.CATEGORIES);
            return {
                inventory: inventory ? JSON.parse(inventory) : [],
                categories: categories ? JSON.parse(categories) : CONFIG.DEFAULT_CATEGORIES,
            };
        } catch (error) {
            console.error('Error loading local data:', error);
            return { inventory: [], categories: CONFIG.DEFAULT_CATEGORIES };
        }
    }

    saveLocal(key, data) {
        try {
            localStorage.setItem(CONFIG.STORAGE_KEYS[key], JSON.stringify(data));
            return true;
        } catch (error) {
            console.error(`Error saving ${key}:`, error);
            return false;
        }
    }

    async getInventory() {
        return this.localData.inventory;
    }

    async saveInventory(items) {
        this.localData.inventory = items;
        this.saveLocal('INVENTORY', items);
        return true;
    }

    async getCategories() {
        return this.localData.categories;
    }

    async saveCategories(categories) {
        this.localData.categories = categories;
        this.saveLocal('CATEGORIES', categories);
        return true;
    }

    async addItem(item) {
        const inventory = await this.getInventory();
        item.id = Date.now().toString();
        item.createdAt = new Date().toISOString();
        inventory.push(item);
        await this.saveInventory(inventory);
        return item;
    }

    async updateItem(id, updates) {
        const inventory = await this.getInventory();
        const index = inventory.findIndex(item => item.id === id);
        if (index !== -1) {
            inventory[index] = { ...inventory[index], ...updates, updatedAt: new Date().toISOString() };
            await this.saveInventory(inventory);
            return inventory[index];
        }
        throw new Error('Item not found');
    }

    async deleteItem(id) {
        const inventory = await this.getInventory();
        const filtered = inventory.filter(item => item.id !== id);
        await this.saveInventory(filtered);
    }

    exportData() {
        return {
            inventory: this.localData.inventory,
            categories: this.localData.categories,
            exportedAt: new Date().toISOString()
        };
    }

    async importData(data) {
        try {
            if (data.inventory) await this.saveInventory(data.inventory);
            if (data.categories) await this.saveCategories(data.categories);
            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    }

    async resetData() {
        await this.saveInventory([]);
        await this.saveCategories(CONFIG.DEFAULT_CATEGORIES);
        return true;
    }
}

const storage = new StorageManager();
