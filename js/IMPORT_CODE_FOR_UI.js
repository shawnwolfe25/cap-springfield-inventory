// ============================================================================
// ADD THIS TO ui.js - INSERT BEFORE THE FINAL CLOSING BRACE OF UIManager CLASS
// ============================================================================

/**
 * Show import data modal
 */
async showImportDataModal() {
    const modal = document.getElementById('modal');
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h2 class="modal-title">📥 Import Inventory Data</h2>
                <button class="modal-close" onclick="document.getElementById('modal').classList.remove('active')">✕</button>
            </div>

            <div style="margin-bottom: 20px;">
                <p style="margin-bottom: 12px; font-size: 14px; color: var(--text-secondary);">
                    Import your existing inventory from a JSON file. This will add all items from your backup to the current inventory.
                </p>
            </div>

            <div class="form-group">
                <label>Select JSON File</label>
                <input type="file" id="import-file" accept=".json" placeholder="Choose JSON file">
                <p style="font-size: 12px; color: var(--text-secondary); margin-top: 8px;">
                    📁 Format: JSON file exported from backup or converted from spreadsheet
                </p>
            </div>

            <div id="import-preview" style="display: none; margin: 20px 0; padding: 16px; background: var(--bg-main); border-radius: var(--radius); border: 1px solid var(--border);">
                <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600;">Import Preview</h4>
                <div id="preview-content" style="font-size: 13px; color: var(--text-secondary);">
                    <!-- Preview will appear here -->
                </div>
            </div>

            <div id="import-errors" style="display: none; margin: 16px 0; padding: 12px; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: var(--radius); color: #721c24;">
                <strong>⚠ Validation Errors:</strong>
                <ul id="error-list" style="margin: 8px 0 0 20px;"></ul>
            </div>

            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="document.getElementById('modal').classList.remove('active')">Cancel</button>
                <button class="btn btn-primary" id="import-preview-btn" onclick="ui.previewImportData()" disabled>
                    👁 Preview
                </button>
                <button class="btn btn-success" id="import-confirm-btn" onclick="ui.confirmImport()" disabled>
                    ✓ Import
                </button>
            </div>
        </div>
    `;

    modal.classList.add('active');

    // Add file change listener
    document.getElementById('import-file').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            document.getElementById('import-preview-btn').disabled = false;
        }
    });
}

/**
 * Preview import data
 */
async previewImportData() {
    const file = document.getElementById('import-file').files[0];
    if (!file) {
        alert('Please select a file');
        return;
    }

    try {
        const result = await importer.importFromJSON(file);

        // Validate
        const validation = importer.validate();
        if (!validation.valid) {
            const errorList = document.getElementById('error-list');
            errorList.innerHTML = validation.errors.map(err => `<li>${err}</li>`).join('');
            document.getElementById('import-errors').style.display = 'block';
            return;
        }

        // Show preview
        const summary = importer.getSummary();
        const preview = importer.getPreview(5);

        let previewHTML = `
            <div style="margin-bottom: 16px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
                    <div>
                        <div style="font-weight: 600; font-size: 18px; color: var(--primary);">${summary.totalItems}</div>
                        <div style="font-size: 12px; color: var(--text-secondary);">Items to Import</div>
                    </div>
                    <div>
                        <div style="font-weight: 600; font-size: 18px; color: var(--success);">$${summary.totalValue.toFixed(2)}</div>
                        <div style="font-size: 12px; color: var(--text-secondary);">Total Value</div>
                    </div>
                </div>

                <div style="font-size: 12px; color: var(--text-secondary);">
                    <div>📦 ${summary.itemsInStock} In Stock</div>
                    <div>⚠ ${summary.itemsLowStock} Low Stock</div>
                    <div>❌ ${summary.itemsOutOfStock} Out of Stock</div>
                </div>
            </div>

            <hr style="border: none; border-top: 1px solid var(--border); margin: 12px 0;">

            <div style="font-size: 12px; margin-bottom: 12px;">
                <strong>Sample Items:</strong>
            </div>
        `;

        preview.forEach(item => {
            previewHTML += `
                <div style="padding: 8px; background: white; border-radius: 4px; margin-bottom: 8px; border-left: 3px solid var(--primary);">
                    <div style="font-weight: 500; margin-bottom: 4px;">${item.name}</div>
                    <div style="font-size: 12px; color: var(--text-secondary);">
                        ${item.category} • Qty: ${item.onHand} • \$${item.unitCost}
                    </div>
                </div>
            `;
        });

        document.getElementById('preview-content').innerHTML = previewHTML;
        document.getElementById('import-preview').style.display = 'block';
        document.getElementById('import-errors').style.display = 'none';
        document.getElementById('import-confirm-btn').disabled = false;

    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

/**
 * Confirm and execute import
 */
async confirmImport() {
    if (!confirm('Import all items? This will add them to your current inventory.')) {
        return;
    }

    const confirmBtn = document.getElementById('import-confirm-btn');
    const originalText = confirmBtn.textContent;
    confirmBtn.disabled = true;
    confirmBtn.textContent = '⏳ Importing...';

    try {
        const result = await importer.saveImportedItems();

        alert(`✅ Successfully imported ${result.itemsImported} items!\n\nNew categories added: ${result.categories.join(', ')}`);

        document.getElementById('modal').classList.remove('active');

        // Refresh inventory view
        await this.renderInventory();
        this.switchPage('inventory');

    } catch (error) {
        alert(`Import failed: ${error.message}`);
    } finally {
        confirmBtn.disabled = false;
        confirmBtn.textContent = originalText;
    }
}

// ============================================================================
// END OF CODE TO ADD TO ui.js
// ============================================================================
