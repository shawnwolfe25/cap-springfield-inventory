# Springfield CAP Inventory — Deployment Checklist

## Pre-Deployment Checklist

- [ ] Review complete file structure
- [ ] Verify all JavaScript files load without errors
- [ ] Test inventory add/edit/delete functions locally
- [ ] Verify CSS loads and displays correctly
- [ ] Check responsive design on mobile

## GitHub Setup

- [ ] Create/update repository: `cap-springfield-inventory`
- [ ] Clone the new file structure to your local machine:
  ```bash
  cd ~/Documents  # or your preferred location
  mkdir cap-springfield-inventory
  cd cap-springfield-inventory
  ```

- [ ] Copy all files from `/home/claude/cap-springfield-inventory/` to your local folder

- [ ] Initialize Git and push to GitHub:
  ```bash
  git init
  git add .
  git commit -m "Initial commit: Springfield CAP Inventory System"
  git branch -M main
  git remote add origin https://github.com/shawnwolfe25/cap-springfield-inventory.git
  git push -u origin main
  ```

## Vercel Deployment

### Step 1: Deploy Basic App
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Click **"Add New Project"**
- [ ] Select **"Import Git Repository"**
- [ ] Find and select `cap-springfield-inventory`
- [ ] Configure:
  - **Project Name:** `cap-springfield-inventory`
  - **Framework Preset:** Other (Static)
  - **Root Directory:** `./`
- [ ] Click **"Deploy"**
- [ ] Wait for deployment to complete
- [ ] Verify app works at: `https://cap-springfield-inventory.vercel.app/`

### Step 2: (Optional) Setup Vercel KV

For shared inventory data across all squadron members:

- [ ] In your Vercel project **Settings → Integrations**
- [ ] Click **"Add"** next to **Vercel KV**
- [ ] Follow prompts to create KV database
- [ ] Once created, your KV credentials appear
- [ ] Go to **Settings → Environment Variables**
- [ ] Add environment variables:
  ```
  REACT_APP_KV_URL=<your KV URL>
  REACT_APP_KV_TOKEN=<your KV token>
  ```
- [ ] Click **"Save"**
- [ ] Redeploy:
  - Go to **Deployments**
  - Click the latest deployment
  - Click **"Redeploy"**
- [ ] Test connection from app Settings page

### Step 3: (Optional) Setup EmailJS

For low-stock email notifications:

- [ ] Sign up at [emailjs.com](https://www.emailjs.com/)
- [ ] Create Email Service (e.g., Gmail)
- [ ] Create Email Template with variables:
  - `{{item_name}}`
  - `{{current_stock}}`
  - `{{reorder_level}}`
- [ ] Note your:
  - Public Key
  - Service ID
  - Template ID
- [ ] In Vercel **Settings → Environment Variables**, add:
  ```
  REACT_APP_EMAILJS_PUBLIC_KEY=<your public key>
  REACT_APP_EMAILJS_SERVICE_ID=<your service id>
  REACT_APP_EMAILJS_TEMPLATE_ID=<your template id>
  ```
- [ ] Redeploy from Vercel

## Post-Deployment Testing

- [ ] Visit deployed URL: https://cap-springfield-inventory.vercel.app/
- [ ] Test Dashboard page loads
- [ ] Add a test item
- [ ] Edit the test item
- [ ] Delete the test item
- [ ] Test filters by category
- [ ] Test filters by status
- [ ] Export as CSV
- [ ] Export as JSON
- [ ] Test all navigation
- [ ] Verify responsive design (mobile view)
- [ ] Test Settings page

## Testing Vercel KV (If Configured)

- [ ] Add an item
- [ ] Open app in a **different browser** or **private window**
- [ ] Verify the item appears (confirms KV sync)
- [ ] Edit item from first browser
- [ ] Refresh second browser (should see changes)

## Customization (Post-Deployment)

- [ ] Update contact email in README
- [ ] Update contact email in app Settings section
- [ ] Verify squadron name displays correctly
- [ ] Test categories match your squadron's needs
- [ ] Adjust color scheme if desired (edit `styles/main.css`)

## Documentation

- [ ] README.md reviewed and accurate
- [ ] Environment variables documented
- [ ] Contact information updated
- [ ] Deployment instructions clear

## Communication

- [ ] Share deployed URL with squadron members
- [ ] Provide instructions for accessing app
- [ ] Explain how to add items
- [ ] Show how to export reports
- [ ] Provide feedback email address

## Maintenance

- [ ] Regular data backups (use Export JSON)
- [ ] Monitor Vercel deployment logs
- [ ] Keep EmailJS config updated
- [ ] Update README with new features
- [ ] Review and archive old inventory reports

---

## Your Deployed URL

**https://cap-springfield-inventory.vercel.app/**

## Support Contact

**commander@springfield.cap.gov**

---

**Deployment Date:** _______________

**Deployed By:** _______________

**Notes:**
