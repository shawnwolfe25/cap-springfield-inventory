// Springfield CAP Inventory - Import Utility
// Use this to convert and import your existing inventory data

class InventoryImporter {
    constructor() {
        this.itemsToImport = [];
    }

    /**
     * Convert data from old format to new format
     * Old format uses: id, name, category, qty, reorderAt, maxStock, unit, cost, vendor, vendorUrl, location, notes, updated
     * New format uses: id, name, category, onHand, reorderAt, unit, unitCost, vendor, vendorWebsite, location, notes, createdAt, updatedAt
     */
    convertOldToNew(oldItems) {
        return oldItems.map(item => ({
            id: item.id || this.generateId(),
            name: item.name,
            category: item.category || 'Other',
            onHand: parseInt(item.onHand || item.qty || 0),
            reorderAt: parseInt(item.reorderAt || 5),
            unit: item.unit || 'each',
            unitCost: parseFloat(item.unitCost || item.cost || 0),
            vendor: item.vendor || '',
            vendorWebsite: item.vendorWebsite || item.vendorUrl || '',
            location: item.location || '',
            notes: item.notes || '',
            createdAt: new Date().toISOString(),
            updatedAt: item.updatedAt || new Date().toISOString()
        }));
    }

    /**
     * Generate unique ID if not provided
     */
    generateId() {
        return Date.now().toString();
    }

    /**
     * Import items via JSON file
     */
    async importFromJSON(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    const items = Array.isArray(data) ? data : data.items;

                    if (!items || items.length === 0) {
                        reject(new Error('No items found in JSON file'));
                        return;
                    }

                    this.itemsToImport = this.convertOldToNew(items);
                    resolve({
                        success: true,
                        itemCount: this.itemsToImport.length,
                        categories: this.getCategories()
                    });
                } catch (error) {
                    reject(new Error(`JSON parsing error: ${error.message}`));
                }
            };

            reader.onerror = () => reject(new Error('File reading error'));
            reader.readAsText(file);
        });
    }

    /**
     * Get unique categories from imported items
     */
    getCategories() {
        const categories = new Set();
        this.itemsToImport.forEach(item => {
            if (item.category) {
                categories.add(item.category);
            }
        });
        return Array.from(categories).sort();
    }

    /**
     * Save imported items to storage
     */
    async saveImportedItems() {
        if (!storage) {
            throw new Error('Storage manager not initialized');
        }

        // Save all items
        await storage.saveInventory(this.itemsToImport);

        // Update categories
        const categories = this.getCategories();
        const existingCategories = await storage.getCategories();
        const mergedCategories = [...new Set([...existingCategories, ...categories])];
        await storage.saveCategories(mergedCategories);

        return {
            success: true,
            itemsImported: this.itemsToImport.length,
            categories: mergedCategories
        };
    }

    /**
     * Get import preview
     */
    getPreview(limit = 10) {
        return this.itemsToImport.slice(0, limit);
    }

    /**
     * Get import summary
     */
    getSummary() {
        const summary = {
            totalItems: this.itemsToImport.length,
            categories: {},
            totalValue: 0,
            itemsInStock: 0,
            itemsLowStock: 0,
            itemsOutOfStock: 0
        };

        this.itemsToImport.forEach(item => {
            // Category count
            summary.categories[item.category] = (summary.categories[item.category] || 0) + 1;

            // Total value
            summary.totalValue += (item.onHand * item.unitCost);

            // Stock status
            if (item.onHand === 0) {
                summary.itemsOutOfStock++;
            } else if (item.onHand <= item.reorderAt) {
                summary.itemsLowStock++;
            } else {
                summary.itemsInStock++;
            }
        });

        return summary;
    }

    /**
     * Validate imported data
     */
    validate() {
        const errors = [];

        this.itemsToImport.forEach((item, index) => {
            if (!item.name || item.name.trim() === '') {
                errors.push(`Row ${index + 1}: Missing item name`);
            }
            if (!item.category || item.category.trim() === '') {
                errors.push(`Row ${index + 1}: Missing category`);
            }
            if (typeof item.onHand !== 'number' || item.onHand < 0) {
                errors.push(`Row ${index + 1}: Invalid quantity`);
            }
        });

        return {
            valid: errors.length === 0,
            errors: errors
        };
    }
}

// Initialize importer globally
const importer = new InventoryImporter();
