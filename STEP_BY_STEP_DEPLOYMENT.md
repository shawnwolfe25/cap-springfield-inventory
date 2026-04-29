# Springfield CAP Inventory — Complete Step-by-Step Deployment Guide

**Estimated Time: 30 minutes**  
**Difficulty: Beginner-friendly**  
**No coding required!**

---

## 🎯 What We're Doing

1. Create GitHub repository with your app code
2. Deploy to Vercel (hosting service)
3. Add your inventory data
4. Test the app
5. Share the URL with your squadron

---

## PHASE 1: Prepare Your Files

### Step 1.1: Create a Folder on Your Computer

1. **Open File Explorer** (Windows) or **Finder** (Mac)
2. Go to your Documents folder (or Desktop)
3. **Right-click** and select "New Folder"
4. Name it: `cap-springfield-inventory`
5. **Open this new folder**

**Your folder path should look like:**
- Windows: `C:\Users\YourName\Documents\cap-springfield-inventory`
- Mac: `/Users/YourName/Documents/cap-springfield-inventory`

### Step 1.2: Download Files from Claude

1. In the Claude outputs folder, download these files:
   - **index.html**
   - **vercel.json**
   - **.env.local.example**
   - **.gitignore**
   - **springfield_inventory_data.json**
   - **importer.js**
   - **IMPORT_CODE_FOR_UI.js**
   - All the markdown files (README.md, etc.)

2. **Extract the compressed archive** if you downloaded it:
   - Right-click `cap-springfield-inventory.tar.gz`
   - Select "Extract All"
   - Move all files to your folder

### Step 1.3: Create Folder Structure

Inside `cap-springfield-inventory`, you need these folders:

```
cap-springfield-inventory/
├── js/           ← Create this folder
├── styles/       ← Create this folder
└── (files go here in root)
```

**To create folders:**
- Right-click in the folder
- Select "New Folder"
- Name: `js`
- Create another: `styles`

### Step 1.4: Organize Your Files

**In the root folder** (cap-springfield-inventory):
- index.html
- vercel.json
- .env.local.example
- .gitignore
- springfield_inventory_data.json
- All README.md and DEPLOYMENT.md files

**In the js/ folder:**
- app.js
- config.js
- storage.js
- ui.js
- importer.js ← **NEW FILE** (from IMPORT_CODE_FOR_UI.js - we'll handle this)

**In the styles/ folder:**
- main.css

✅ **When done, your folder should look like:**
```
cap-springfield-inventory/
├── index.html
├── vercel.json
├── .gitignore
├── README.md
├── DEPLOYMENT.md
├── springfield_inventory_data.json
├── js/
│   ├── app.js
│   ├── config.js
│   ├── storage.js
│   ├── ui.js
│   └── importer.js
└── styles/
    └── main.css
```

---

## PHASE 2: Set Up GitHub

### Step 2.1: Create GitHub Account (If Needed)

**If you already have a GitHub account, skip to Step 2.3**

1. Go to https://github.com
2. Click "Sign up"
3. Enter your email: *your-email@example.com*
4. Create a password: *Use a strong password*
5. Enter username: *shawnwolfe25* (or similar)
6. Click "Create account"
7. Verify your email (check your inbox)
8. Complete the setup steps

### Step 2.2: Install Git (If Needed)

**If you already have Git installed, skip to Step 2.3**

**Windows:**
1. Go to https://git-scm.com/download/win
2. Download the latest version
3. Run the installer
4. Click "Next" through all screens (defaults are fine)
5. Click "Install"
6. Restart your computer

**Mac:**
1. Open Terminal (Applications → Utilities → Terminal)
2. Copy-paste this command:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. Wait for installation to complete
4. Then run:
   ```bash
   brew install git
   ```

**Verify Git is installed:**
1. Open Command Prompt (Windows) or Terminal (Mac)
2. Type: `git --version`
3. You should see: `git version X.X.X`

### Step 2.3: Create New GitHub Repository

1. Go to https://github.com/new
2. Fill in:
   - **Repository name:** `cap-springfield-inventory`
   - **Description:** Springfield CAP Inventory Management System
   - **Public:** Yes (so Vercel can access it)
   - Leave other options as default
3. Click "Create repository"
4. Copy the URL shown (looks like: `https://github.com/shawnwolfe25/cap-springfield-inventory.git`)

**Save this URL somewhere!** You'll need it in the next step.

### Step 2.4: Upload Files to GitHub

Now we'll upload your local files to GitHub.

**Open Command Prompt or Terminal:**

**Windows:**
1. Click Start menu
2. Type: `cmd`
3. Click "Command Prompt"

**Mac:**
1. Open Applications → Utilities → Terminal

**Navigate to your folder:**

Type this command (replace `YourName` with your username):

**Windows:**
```bash
cd Documents\cap-springfield-inventory
```

**Mac:**
```bash
cd Documents/cap-springfield-inventory
```

Press Enter.

**Initialize Git repository:**

```bash
git init
```

**Add all files:**

```bash
git add .
```

**Create first commit:**

```bash
git commit -m "Initial commit: Springfield CAP Inventory v1.0"
```

**Add GitHub remote** (replace URL with yours):

```bash
git remote add origin https://github.com/shawnwolfe25/cap-springfield-inventory.git
```

**Change branch name:**

```bash
git branch -M main
```

**Push to GitHub:**

```bash
git push -u origin main
```

It will ask for your GitHub username and password.
- **Username:** Your GitHub username
- **Password:** Your GitHub password (or personal access token if you have 2FA enabled)

**✅ Success if you see:** "Enumerating objects... done"

---

## PHASE 3: Set Up Vercel

### Step 3.1: Create Vercel Account (If Needed)

**If you already have a Vercel account, skip to Step 3.2**

1. Go to https://vercel.com
2. Click "Sign Up"
3. Click "Continue with GitHub"
4. Authorize Vercel to access your GitHub account
5. Complete the signup process

### Step 3.2: Deploy to Vercel

1. Go to https://vercel.com/new
2. You should see a prompt: "Create Git Repository"
3. Click "Continue with GitHub"
4. Search for: `cap-springfield-inventory`
5. Click "Import" next to your repository

**Configure the project:**

You should see a form with:
- **Project Name:** `cap-springfield-inventory`
- **Framework Preset:** `Other` (Static)
- **Root Directory:** `./`

Leave all settings as default and click **"Deploy"**

**⏳ Wait for deployment** (takes about 1-2 minutes)

You'll see:
- Building... (with progress bar)
- Success! (when done)

---

## PHASE 4: Test Your App

### Step 4.1: Visit Your Live App

When deployment completes, you'll see:

```
✓ Deployment successful!
Visit: https://cap-springfield-inventory.vercel.app/
```

**Click that link or copy-paste it into your browser.**

### Step 4.2: Test Basic Functionality

Your app should show:
- ✅ A dark sidebar on the left with "SPRINGFIELD CAP"
- ✅ Four navigation buttons: Dashboard, Inventory, Report, Settings
- ✅ Dashboard page with stats
- ✅ No error messages

**Test each page:**
1. Click "Dashboard" — should show overview stats
2. Click "Inventory" — should show empty table (we'll add data next)
3. Click "Report" — should show export buttons
4. Click "Settings" — should show various options

---

## PHASE 5: Import Your Data

### Step 5.1: Add Import Feature to App

**Your app is live, but we need to add the import feature first.**

We need to edit `js/ui.js` to add the import button and code.

**Open IMPORT_CODE_FOR_UI.js** from the downloaded files.

**Copy all the code** (select all, Ctrl+C or Cmd+C)

**Now edit your js/ui.js file:**

1. Open your `js/ui.js` file with a text editor (Notepad, VS Code, etc.)
2. Scroll to the very bottom
3. Find the last `}` (closing brace)
4. **Before that last `}`, paste the import code you copied**
5. Save the file

**Your js/ui.js should now end with:**
```javascript
    // ... existing code ...

    // New import methods start here
    async showImportDataModal() {
        // ... import code ...
    }

    // ... more import methods ...
}  // ← This is the closing brace of UIManager class
```

### Step 5.2: Add Import Button to Settings

In the same `js/ui.js` file, find the `renderSettings()` function.

Look for the line:
```javascript
<h3 class="card-title">Cloud Storage</h3>
```

**Before that line, add:**
```javascript
<div class="card">
    <h3 class="card-title">📥 Import Data</h3>
    <p style="margin-bottom: 16px;">Import your existing inventory from a JSON file.</p>
    <button class="btn btn-primary" onclick="ui.showImportDataModal()">
        📥 Import Existing Data
    </button>
</div>
```

### Step 5.3: Update index.html

Find this line in `index.html`:
```html
<script src="js/config.js"></script>
```

**Add this line right after it:**
```html
<script src="js/importer.js"></script>
```

### Step 5.4: Push Updated Files to GitHub

Open Command Prompt/Terminal again:

```bash
cd Documents/cap-springfield-inventory
```

```bash
git add .
```

```bash
git commit -m "Add import feature"
```

```bash
git push
```

### Step 5.5: Redeploy on Vercel

1. Go to https://vercel.com/dashboard
2. Click your project: `cap-springfield-inventory`
3. Click the "Deployments" tab
4. You should see your new commit automatically deploying
5. Wait for it to complete (1-2 minutes)
6. Click the deployment to open your app

### Step 5.6: Import Your Data

Your app is now live with the import feature!

1. **Go to your app:** https://cap-springfield-inventory.vercel.app/
2. **Click Settings** (⚙️ button in sidebar)
3. **Scroll down to "📥 Import Data" section**
4. **Click "Import Existing Data" button**
5. **Click "Select File"**
6. **Find and select: `springfield_inventory_data.json`**
7. **Click "Preview"**
   - Should show: "149 items to import"
   - Should list 8 categories
8. **Click "Import"**
9. **Wait for success message**
10. **Go to Inventory page**
11. **See all 149 items loaded!** 🎉

---

## PHASE 6: Final Testing

### Step 6.1: Test All Features

**Dashboard:**
- [ ] Shows 149 total items
- [ ] Shows stock counts
- [ ] Shows recent activity

**Inventory:**
- [ ] Shows all 149 items in table
- [ ] Can filter by category
- [ ] Can filter by status
- [ ] Can see vendor info
- [ ] Can see pricing

**Report:**
- [ ] Export CSV works
- [ ] Export JSON works
- [ ] Print works

**Settings:**
- [ ] Categories page shows 8 categories
- [ ] Can add new categories
- [ ] Import button still visible

### Step 6.2: Test on Mobile

1. Open your app on a phone or tablet
2. Make sure it looks good
3. Test navigation and buttons
4. Verify all text is readable

### Step 6.3: Share Your URL

Your app is live at:

**https://cap-springfield-inventory.vercel.app/**

Share this with your squadron members! They can:
- View inventory
- Filter items
- Export reports
- See dashboard

---

## 🎉 You're Done!

Congratulations! Your inventory system is:

✅ **Live on the internet**  
✅ **Loaded with 149 items**  
✅ **Ready for your squadron**  
✅ **Professionally designed**  
✅ **Fully functional**  

---

## 📞 Troubleshooting

### App shows blank page
- Press Ctrl+Shift+R (hard refresh)
- Wait 30 seconds
- Try again

### Import button missing
- Make sure you edited ui.js correctly
- Make sure you added the import code before the last `}`
- Make sure importer.js is in the js/ folder
- Redeploy (push to GitHub)

### Items not showing after import
- Check browser console (F12) for errors
- Make sure springfield_inventory_data.json uploaded
- Try importing again
- Contact: commander@springfield.cap.gov

### Deployment stuck
- Go to Vercel dashboard
- Click your project
- Check build logs for errors
- Try redeploying manually

---

## 🔧 Optional: Set Up Cloud Storage (Later)

Once everything is working, you can optionally add:

**Vercel KV (Shared Inventory):**
- All squadron members see the same inventory
- Updates sync instantly
- Takes 10 minutes to set up

**EmailJS (Low-Stock Alerts):**
- Get automatic email alerts when stock is low
- Takes 10 minutes to set up

See README.md for instructions.

---

## ✨ What's Next

### Immediate:
- [ ] Test the app
- [ ] Add a few more items
- [ ] Generate a report
- [ ] Share URL with squad

### This Week:
- [ ] Train squadron members
- [ ] Set up regular exports
- [ ] Customize if needed

### This Month:
- [ ] Set up Vercel KV (optional)
- [ ] Set up EmailJS (optional)
- [ ] Review and optimize

---

## 📊 Summary

| Step | Time | Status |
|------|------|--------|
| Prepare files | 10 min | ✅ Complete |
| Set up GitHub | 10 min | ✅ Complete |
| Deploy to Vercel | 5 min | ✅ Complete |
| Import data | 5 min | ✅ Complete |
| Testing | 5 min | ✅ Complete |
| **TOTAL** | **35 min** | **✅ DONE** |

---

## 🚀 Your Live URL

```
https://cap-springfield-inventory.vercel.app/
```

**Share this with your squadron!**

---

**Status: Deployed & Live** ✅  
**Items: 149 imported** ✅  
**Ready for use: YES** ✅  
**Motto: Semper Vigilans — Always Vigilant**
