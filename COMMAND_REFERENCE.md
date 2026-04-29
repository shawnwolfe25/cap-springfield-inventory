# 🚀 Deployment Command Reference

**Copy and paste these commands ONE AT A TIME into Command Prompt**

---

## Before You Start

1. ✅ Git is installed (`git --version` works)
2. ✅ Files organized in `cap-springfield-inventory` folder
3. ✅ GitHub repository created at `https://github.com/shawnwolfe25/cap-springfield-inventory`
4. ✅ You're logged into GitHub
5. ✅ You're logged into Vercel

---

## Phase 1: Initialize Git & Upload to GitHub

### Open Command Prompt

**Windows:**
1. Click Start menu
2. Type: `cmd`
3. Click "Command Prompt"

**Then navigate to your folder:**

```bash
cd Documents\cap-springfield-inventory
```

(If your folder is somewhere else, navigate there instead)

**Verify you're in the right folder:**
```bash
dir
```

You should see `index.html`, `js` folder, `styles` folder, etc.

### Run These Commands (ONE AT A TIME)

**Command 1: Initialize Git**
```bash
git init
```

**Command 2: Add all files**
```bash
git add .
```

**Command 3: Create first commit**
```bash
git commit -m "Initial commit: Springfield CAP Inventory v1.0"
```

**Command 4: Add GitHub remote** (Replace URL with yours)
```bash
git remote add origin https://github.com/shawnwolfe25/cap-springfield-inventory.git
```

**Command 5: Rename branch to main**
```bash
git branch -M main
```

**Command 6: Push to GitHub**
```bash
git push -u origin main
```

**When prompted:**
- Username: `shawnwolfe25` (your GitHub username)
- Password: Your GitHub password

**✅ Success if you see:** 
```
Enumerating objects... done.
```

---

## Phase 2: Deploy to Vercel

**Go to:** https://vercel.com/new

1. Click: "Continue with GitHub"
2. Search: "cap-springfield-inventory"
3. Click: "Import"
4. Leave all settings as default
5. Click: "Deploy"
6. Wait 1-2 minutes

**✅ You'll see your live URL:**
```
https://cap-springfield-inventory.vercel.app/
```

---

## Phase 3: Update Files & Redeploy

### Edit Files (Use a text editor like Notepad or VS Code)

**File 1: Update index.html**

Find this line:
```html
<script src="js/config.js"></script>
```

Add after it:
```html
<script src="js/importer.js"></script>
```

Save.

**File 2: Update js/ui.js**

Find the end of the file (the last `}`)

Before it, paste all the code from `IMPORT_CODE_FOR_UI.js`

Save.

**File 3: Add import button to Settings**

In `js/ui.js`, find:
```javascript
<h3 class="card-title">Cloud Storage</h3>
```

Before it, add:
```javascript
<div class="card">
    <h3 class="card-title">📥 Import Data</h3>
    <p style="margin-bottom: 16px;">Import your existing inventory from a JSON file.</p>
    <button class="btn btn-primary" onclick="ui.showImportDataModal()">
        📥 Import Existing Data
    </button>
</div>
```

Save.

### Push Updates to GitHub

**In Command Prompt (still in your folder):**

```bash
git add .
```

```bash
git commit -m "Add import feature"
```

```bash
git push
```

**Vercel will automatically redeploy** (1-2 minutes)

---

## Phase 4: Import Your Data

1. Open your app: https://cap-springfield-inventory.vercel.app/
2. Click Settings (⚙️)
3. Click "📥 Import Existing Data"
4. Click "Select File"
5. Choose: `springfield_inventory_data.json`
6. Click "Preview"
7. Click "Import"

**✅ You should see:** "Successfully imported 149 items!"

---

## Quick Reference: All Commands

```bash
# Initialize
git init
git add .
git commit -m "Initial commit: Springfield CAP Inventory v1.0"
git remote add origin https://github.com/shawnwolfe25/cap-springfield-inventory.git
git branch -M main
git push -u origin main

# Updates
git add .
git commit -m "Add import feature"
git push
```

---

## 📌 Important Files & URLs

**Your GitHub repo:**
```
https://github.com/shawnwolfe25/cap-springfield-inventory
```

**Your live app:**
```
https://cap-springfield-inventory.vercel.app/
```

**Your local folder:**
```
C:\Users\YourName\Documents\cap-springfield-inventory
```

---

## 🆘 Troubleshooting Commands

**Check Git is working:**
```bash
git --version
```

**Check you're in the right folder:**
```bash
dir
```

**Check GitHub connection:**
```bash
git remote -v
```

**See what files are ready to commit:**
```bash
git status
```

---

## ✅ You're Ready!

Once you've:
1. Installed Git
2. Organized your files
3. Run all the commands above
4. Deployed to Vercel
5. Imported your data

Your app will be live and ready!

---

**Share your URL:**
```
https://cap-springfield-inventory.vercel.app/
```

**Congratulations!** 🎉
