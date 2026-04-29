class UIManager {
    constructor() {
        this.currentPage = 'dashboard';
    }

    renderLayout() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="sidebar">
                <div class="logo">
                    <div>✈️</div>
                    <div class="logo-text">
                        <strong>SPRINGFIELD CAP</strong>
                        <span class="unit">Civil Air Patrol</span>
                    </div>
                </div>
                <nav class="nav">
                    <li class="nav-item"><a class="nav-link active" data-page="dashboard">📊 Dashboard</a></li>
                    <li class="nav-item"><a class="nav-link" data-page="inventory">📦 Inventory</a></li>
                    <li class="nav-item"><a class="nav-link" data-page="report">📋 Report</a></li>
                    <li class="nav-item"><a class="nav-link" data-page="settings">⚙️ Settings</a></li>
                </nav>
            </div>
            <div class="main-content">
                <div id="dashboard" class="page active"></div>
                <div id="inventory" class="page"></div>
                <div id="report" class="page"></div>
                <div id="settings" class="page"></div>
            </div>
            <div id="modal" class="modal"></div>
        `;
        this.attachNavListeners();
    }

    attachNavListeners() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.switchPage(page);
            });
        });
    }

    switchPage(page) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.getElementById(page).classList.add('active');
        document.querySelector(`[data-page="${page}"]`).classList.add('active');
        this.currentPage = page;
        if (page === 'dashboard') this.renderDashboard();
        else if (page === 'inventory') this.renderInventory();
        else if (page === 'report') this.renderReport();
        else if (page === 'settings') this.renderSettings();
    }

    async renderDashboard() {
        const inventory = await storage.getInventory();
        const inStock = inventory.filter(i => i.onHand > i.reorderAt).length;
        const lowStock = inventory.filter(i => i.onHand > 0 && i.onHand <= i.reorderAt).length;
        const outStock = inventory.filter(i => i.onHand === 0).length;
        const page = document.getElementById('dashboard');
        page.innerHTML = `
            <h2 class="page-title">▸ Dashboard</h2>
            <div class="card">
                <h3 class="card-title">Quick Overview</h3>
                <div class="stats-grid">
                    <div class="stat-box"><div class="stat-value">${inventory.length}</div><div class="stat-label">Total Items</div></div>
                    <div class="stat-box"><div class="stat-value">${inStock}</div><div class="stat-label">In Stock</div></div>
                    <div class="stat-box"><div class="stat-value">${lowStock}</div><div class="stat-label">Low Stock</div></div>
                    <div class="stat-box"><div class="stat-value">${outStock}</div><div class="stat-label">Out of Stock</div></div>
                </div>
            </div>
        `;
    }

    async renderInventory() {
        const inventory = await storage.getInventory();
        const categories = await storage.getCategories();
        const page = document.getElementById('inventory');
        page.innerHTML = `
            <h2 class="page-title">▸ Inventory</h2>
            <div class="filters">
                <div class="filter-group">
                    <label>Category:</label>
                    <select id="category-filter">
                        <option>All Categories</option>
                        ${categories.map(cat => `<option>${cat}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Category</th>
                            <th>On Hand</th>
                            <th>Unit Cost</th>
                            <th>Vendor</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${inventory.map(item => `
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.category}</td>
                                <td>${item.onHand}</td>
                                <td>$${parseFloat(item.unitCost).toFixed(2)}</td>
                                <td>${item.vendor || '—'}</td>
                                <td>${item.location || '—'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    async renderReport() {
        const inventory = await storage.getInventory();
        const totalValue = inventory.reduce((sum, item) => sum + (item.onHand * parseFloat(item.unitCost || 0)), 0);
        const page = document.getElementById('report');
        page.innerHTML = `
            <h2 class="page-title">▸ Report</h2>
            <div class="btn-group" style="margin-bottom: 20px;">
                <button class="btn btn-primary" onclick="ui.exportCSV()">⬇ CSV</button>
                <button class="btn btn-primary" onclick="ui.exportJSON()">⬇ JSON</button>
                <button class="btn btn-primary" onclick="ui.printReport()">🖨 Print</button>
            </div>
            <p>Total Items: ${inventory.length} | Total Value: $${totalValue.toFixed(2)}</p>
        `;
    }

    async renderSettings() {
        const categories = await storage.getCategories();
        const page = document.getElementById('settings');
        page.innerHTML = `
            <h2 class="page-title">▸ Settings</h2>
            <div class="card">
                <h3 class="card-title">📥 Import Data</h3>
                <p style="margin-bottom: 16px;">Import your existing inventory from a JSON file.</p>
                <button class="btn btn-primary" onclick="ui.showImportDataModal()">📥 Import Existing Data</button>
            </div>
            <div class="card">
                <h3 class="card-title">Categories</h3>
                ${categories.map(cat => `<div style="padding: 8px 0; border-bottom: 1px solid #e0e4e8;">${cat}</div>`).join('')}
            </div>
            <div class="card">
                <h3 class="card-title">Data Management</h3>
                <div class="btn-group">
                    <button class="btn btn-secondary" onclick="ui.exportJSON()">⬇ Export JSON</button>
                    <button class="btn btn-secondary" onclick="ui.importJSON()">⬆ Import JSON</button>
                </div>
            </div>
        `;
    }

    async showImportDataModal() {
        const modal = document.getElementById('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">📥 Import Inventory Data</h2>
                    <button class="modal-close" onclick="document.getElementById('modal').classList.remove('active')">✕</button>
                </div>
                <input type="file" id="import-file" accept=".json" placeholder="Choose JSON file">
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="document.getElementById('modal').classList.remove('active')">Cancel</button>
                    <button class="btn btn-primary" onclick="ui.previewImportData()">Preview</button>
                    <button class="btn btn-success" onclick="ui.confirmImport()">Import</button>
                </div>
            </div>
        `;
        modal.classList.add('active');
    }

    async previewImportData() {
        const file = document.getElementById('import-file').files[0];
        if (!file) { alert('Please select a file'); return; }
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const data = JSON.parse(e.target.result);
                const items = Array.isArray(data) ? data : data.items;
                alert(`Ready to import ${items.length} items`);
            } catch (error) {
                alert('Error reading file: ' + error.message);
            }
        };
        reader.readAsText(file);
    }

    async confirmImport() {
        if (!confirm('Import all items?')) return;
        const file = document.getElementById('import-file').files[0];
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const data = JSON.parse(e.target.result);
                const items = Array.isArray(data) ? data : data.items;
                await storage.saveInventory(items);
                alert(`✅ Successfully imported ${items.length} items!`);
                document.getElementById('modal').classList.remove('active');
                this.renderInventory();
            } catch (error) {
                alert('Import failed: ' + error.message);
            }
        };
        reader.readAsText(file);
    }

    exportCSV() {
        const inventory = this.localData ? this.localData.inventory : [];
        let csv = 'Item,Category,On Hand,Unit Cost,Vendor,Location\n';
        inventory.forEach(item => {
            csv += `"${item.name}","${item.category}",${item.onHand},${item.unitCost},"${item.vendor || ''}","${item.location || ''}"\n`;
        });
        const link = document.createElement('a');
        link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
        link.download = `springfield-inventory-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    }

    async exportJSON() {
        const data = storage.exportData();
        const link = document.createElement('a');
        link.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
        link.download = `springfield-inventory-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }

    importJSON() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = async (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    await storage.importData(data);
                    alert('Data imported successfully!');
                    this.renderInventory();
                } catch (error) {
                    alert('Error importing file: ' + error.message);
                }
            };
            reader.readAsText(file);
        };
        input.click();
    }

    printReport() {
        window.print();
    }
}

const ui = new UIManager();
