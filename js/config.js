const CONFIG = {
    APP_NAME: 'Springfield CAP Inventory',
    VERSION: '1.0.0',
    SQUADRON: 'Springfield Civil Air Patrol',
    UNIT_MOTTO: 'Semper Vigilans — Always Vigilant',
    KV_API: process.env.REACT_APP_KV_URL || '/api/kv',
    KV_TOKEN: process.env.REACT_APP_KV_TOKEN || '',
    EMAILJS_PUBLIC_KEY: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '',
    EMAILJS_SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID || '',
    EMAILJS_TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '',
    DEFAULT_CATEGORIES: [
        'Office Supplies',
        'Communications Equipment',
        'Safety Equipment',
        'First Aid',
        'Maintenance Tools',
        'Flying Materials',
        'Administrative',
        'Other'
    ],
    STATUS_OPTIONS: {
        IN_STOCK: 'In Stock',
        LOW: 'Low Stock',
        OUT: 'Out of Stock'
    },
    REORDER_THRESHOLD: 5,
    STORAGE_KEYS: {
        INVENTORY: 'cap_springfield_inventory',
        CATEGORIES: 'cap_springfield_categories',
        CONFIG: 'cap_springfield_config',
        EMAIL_CONFIG: 'cap_springfield_email_config'
    }
};

window.CONFIG = CONFIG;
