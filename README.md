# Springfield CAP Inventory Management System

Civil Air Patrol Squadron Inventory Management System for tracking squadron supplies, equipment, and resources.

**Version:** 1.0.0  
**Deployed on:** Vercel  
**Data Storage:** Vercel KV (with local fallback)  
**Motto:** Semper Vigilans — Always Vigilant

---

## Features

✅ **Real-Time Inventory Tracking** — Add, edit, and manage inventory items  
✅ **Smart Categorization** — Organize items by custom categories  
✅ **Stock Alerts** — Automatic low-stock and out-of-stock alerts  
✅ **Reporting** — Generate CSV, JSON, and printable reports  
✅ **Cloud Storage** — Shared data across all squadron members via Vercel KV  
✅ **Email Notifications** — Optional EmailJS integration for low-stock alerts  
✅ **Data Export/Import** — Backup and restore inventory data  
✅ **Responsive Design** — Works on desktop, tablet, and mobile devices

---

## Quick Start

### Prerequisites

- GitHub account
- Vercel account (free tier available)
- Git installed locally

### Deployment Steps

#### 1. Fork or Clone the Repository

```bash
git clone https://github.com/shawnwolfe25/cap-springfield-inventory.git
cd cap-springfield-inventory
```

#### 2. Push to GitHub

```bash
git remote add origin https://github.com/shawnwolfe25/cap-springfield-inventory.git
git branch -M main
git push -u origin main
```

#### 3. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Select **"Import Git Repository"**
4. Choose `shawnwolfe25/cap-springfield-inventory`
5. Configure project:
   - **Project Name:** `cap-springfield-inventory`
   - **Framework Preset:** Other (Static)
   - **Root Directory:** `./`
6. Click **"Deploy"**

Your app will be live at: **https://cap-springfield-inventory.vercel.app/**

---

## Setup Instructions

### Configure Vercel KV (Optional but Recommended)

For shared, persistent data across all squadron members:

1. In your Vercel project, go to **Settings → Integrations**
2. Add **Vercel KV** (or Upstash Redis)
3. Copy your KV credentials
4. In Vercel **Settings → Environment Variables**, add:
   - `REACT_APP_KV_URL` = your KV API URL
   - `REACT_APP_KV_TOKEN` = your KV token

### Configure EmailJS (Optional)

For automatic low-stock email notifications:

1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Create an email service and template
3. Add environment variables:
   - `REACT_APP_EMAILJS_PUBLIC_KEY`
   - `REACT_APP_EMAILJS_SERVICE_ID`
   - `REACT_APP_EMAILJS_TEMPLATE_ID`

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/shawnwolfe25/cap-springfield-inventory.git
cd cap-springfield-inventory
```

2. Open `index.html` in a browser or use a local server:
```bash
python -m http.server 8000
# or
npx http-server
```

3. Navigate to `http://localhost:8000`

---

## Usage

### Dashboard
Quick overview of inventory status with key metrics:
- Total items
- In stock count
- Low stock items
- Out of stock items

### Inventory
Manage your squadron's items:
- Add new items with details (name, category, quantity, cost, vendor, location)
- Edit existing items
- Delete items
- Filter by category or stock status
- View detailed item information

### Report
Generate and export reports:
- View complete inventory table
- Export as CSV for spreadsheet software
- Export as JSON for backup
- Print formatted inventory
- Calculate total inventory value

### Settings
Configure the app:
- **Cloud Storage:** Test Vercel KV connection
- **Email Notifications:** Configure EmailJS for alerts
- **Categories:** Add or remove custom item categories
- **Data Management:** Export backups, import data, reset to defaults
- **About:** View app version and contact information

---

## File Structure

```
cap-springfield-inventory/
├── index.html                 # Main HTML entry point
├── .env.local.example         # Environment variables template
├── vercel.json               # Vercel deployment config
├── README.md                 # This file
├── styles/
│   └── main.css             # All styling
└── js/
    ├── config.js            # Application configuration
    ├── storage.js           # Vercel KV & localStorage management
    ├── ui.js                # UI rendering and interactions
    └── app.js               # Main application initialization
```

---

## How It Works

### Data Storage Architecture

**Without Vercel KV (Local Mode):**
- Data stored in browser localStorage
- Each user has separate inventory
- Data persists on device

**With Vercel KV (Cloud Mode):**
- All squadron members see the same inventory
- Real-time synchronization
- Data accessible from any device
- Automatic backup in cloud

### Workflow

1. **StorageManager** (`js/storage.js`) handles all data operations
2. **UIManager** (`js/ui.js`) renders pages and handles user interactions
3. **Config** (`js/config.js`) stores app settings and defaults
4. **App** (`js/app.js`) initializes everything on page load

---

## Customization

### Change Squadron Name

Edit `js/config.js`:
```javascript
SQUADRON: 'Springfield Civil Air Patrol'
```

### Add Custom Categories

Via the Settings page in the app, or edit `js/config.js`:
```javascript
DEFAULT_CATEGORIES: [
    'Office Supplies',
    'Your Category Here',
    // ...
]
```

### Update Colors & Theme

Edit CSS variables in `styles/main.css`:
```css
:root {
    --primary: #1e3a5f;      /* Main blue */
    --accent: #c41e3a;       /* Red accent */
    /* ... other colors */
}
```

### Update Contact Email

Edit `js/ui.js` in the Settings section:
```javascript
<a href="mailto:commander@springfield.cap.gov?subject=...">
```

---

## Troubleshooting

### App Shows 404 on Vercel

1. Check that GitHub Pages is **disabled** (Settings → Pages)
2. Ensure `index.html` is at the root directory
3. Re-deploy from Vercel dashboard

### Data Not Persisting

- **Local mode:** Browser localStorage may be cleared. Try exporting data as JSON backup.
- **Cloud mode:** Check that `REACT_APP_KV_TOKEN` is set in Vercel environment variables

### EmailJS Not Sending

1. Verify environment variables are set correctly
2. Test connection from Settings page
3. Check EmailJS dashboard for sent emails
4. Ensure email recipients are configured

---

## Support & Feedback

For suggestions or issues, contact:  
**commander@springfield.cap.gov**

---

## License

Civil Air Patrol - Springfield Squadron  
For internal squadron use only.

---

**Last Updated:** April 2026  
**Maintained by:** Springfield Civil Air Patrol Squadron  
**Version:** 1.0.0
