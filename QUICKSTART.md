# Springfield CAP Inventory — Quick Reference

## 🚀 Deploy in 5 Minutes

1. **Clone to local machine:**
   ```bash
   mkdir cap-springfield-inventory && cd cap-springfield-inventory
   # Copy all files from the backup location
   ```

2. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Springfield CAP Inventory v1.0"
   git remote add origin https://github.com/shawnwolfe25/cap-springfield-inventory.git
   git push -u origin main
   ```

3. **Deploy to Vercel:**
   - Go to vercel.com → "Add New Project"
   - Import the GitHub repo
   - Click "Deploy"

4. **Access your app:**
   - https://cap-springfield-inventory.vercel.app/

---

## 📁 Project Structure at a Glance

```
cap-springfield-inventory/
├── index.html                    ← Main entry point
├── README.md                     ← Full documentation
├── DEPLOYMENT.md                 ← Step-by-step deployment
├── SYSTEM_SUMMARY.md            ← Technical overview
├── .env.local.example           ← Environment template
├── .gitignore                   ← Git ignore file
├── vercel.json                  ← Vercel config
│
├── styles/
│   └── main.css                 ← All styling (650+ lines)
│
└── js/
    ├── config.js                ← App configuration
    ├── storage.js               ← Data management (Vercel KV + Local)
    ├── ui.js                    ← All UI & rendering
    └── app.js                   ← App initialization
```

---

## 🎯 What Each File Does

| File | Purpose | Lines |
|------|---------|-------|
| `index.html` | Entry point, loads CSS/JS | 12 |
| `styles/main.css` | Complete design system | 650+ |
| `js/config.js` | App settings & defaults | 40 |
| `js/storage.js` | Data storage (cloud + local) | 300+ |
| `js/ui.js` | All UI pages & interactions | 700+ |
| `js/app.js` | App startup | 30 |

---

## 🔧 Configuration

### Basic Setup (No Config Needed)
- App works immediately
- Data stored locally in browser
- Perfect for single-user testing

### Cloud Setup (Vercel KV)
Enable shared data across all squadron members:

1. Add Vercel KV integration in Vercel dashboard
2. Get credentials (URL + Token)
3. Add to Vercel environment variables:
   ```
   REACT_APP_KV_URL=<your_url>
   REACT_APP_KV_TOKEN=<your_token>
   ```
4. Redeploy

### Email Setup (EmailJS - Optional)
Enable automatic low-stock alerts:

1. Sign up at emailjs.com
2. Create email service + template
3. Get credentials (Public Key, Service ID, Template ID)
4. Add to Vercel environment variables
5. Test from Settings page

---

## 💡 Features Summary

### Pages
- **Dashboard:** Overview stats + recent activity
- **Inventory:** Add/edit/delete items with filters
- **Report:** View & export inventory data
- **Settings:** Configure storage, email, categories, backup data

### Actions
- ✅ Add items (name, category, quantity, cost, vendor, location)
- ✅ Edit items
- ✅ Delete items (with confirmation)
- ✅ Filter by category or stock status
- ✅ Export CSV (for Excel/Sheets)
- ✅ Export JSON (for backup)
- ✅ Import JSON (restore backup)
- ✅ Print inventory
- ✅ Reset to defaults
- ✅ Sync with cloud (if Vercel KV enabled)

### Stock Management
- **In Stock:** Items above reorder level (green)
- **Low Stock:** Items below reorder level (yellow)
- **Out of Stock:** Zero items (red)

---

## 📊 Using the App

### Add Item
1. Click **"+ Add Item"** button
2. Fill in item details
3. Click **"Save"**

### Edit Item
1. Find item in Inventory table
2. Click **"Edit"** button
3. Update details
4. Click **"Save"**

### Delete Item
1. Click **"Delete"** button next to item
2. Confirm deletion

### Export Data
1. Go to **Report** or **Settings**
2. Click **"⬇ CSV"** or **"⬇ JSON"**
3. File downloads to computer

### Backup & Restore
1. Go to **Settings → Data Management**
2. Click **"⬇ Export JSON"** to backup
3. Click **"⬆ Import JSON"** to restore

---

## 🎨 Customization Checklist

- [ ] Update `SQUADRON` name in `js/config.js`
- [ ] Update contact email in `README.md`
- [ ] Update contact email in `js/ui.js` (Settings page)
- [ ] Verify default categories match your needs
- [ ] Customize colors in `styles/main.css` if desired

---

## ⚡ Performance & Technology

- **No Build Tools Needed** — Pure HTML/CSS/JavaScript
- **Fast Loading** — Static files hosted on Vercel CDN
- **Works Offline** — Fallback to local storage
- **Mobile Responsive** — Works on all devices
- **Modern Browser Features** — ES6+ JavaScript

---

## 🔒 Data & Security

### Data Location
- **Without Vercel KV:** Browser localStorage only
- **With Vercel KV:** Encrypted cloud storage + local backup

### Data Ownership
- All data stays with your squadron
- No third-party analytics
- No tracking
- You control all backups

### Backup Strategy
1. Regular exports (Settings → Data Management)
2. Keep JSON backups
3. Store in Google Drive or shared location
4. Import if needed

---

## 🐛 Troubleshooting

### App shows blank page
- Check browser console (F12) for errors
- Verify all files are present
- Try hard refresh (Ctrl+Shift+R)

### Data not saving
- Check localStorage is enabled
- Verify KV_TOKEN is set (if cloud enabled)
- Try exporting data as JSON

### Vercel deployment failed
- Check GitHub repo is public
- Verify `index.html` exists at root
- Check Vercel logs for errors

---

## 📞 Support

**Documentation:** `README.md`  
**Deployment:** `DEPLOYMENT.md`  
**Technical:** `SYSTEM_SUMMARY.md`  
**Contact:** commander@springfield.cap.gov

---

## 🚀 Ready to Go!

All files are created and tested. You're ready to:
1. Copy to your machine
2. Push to GitHub
3. Deploy to Vercel
4. Share with squadron members

For detailed instructions, see `DEPLOYMENT.md`

---

**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Motto:** Semper Vigilans — Always Vigilant
