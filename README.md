# Springfield Civil Air Patrol — Inventory Management System

A web-based inventory tracking application for the Springfield CAP Squadron. Tracks ribbons, ribbon racks, insignia, uniforms, and supplies with automatic low-stock email alerts.

---

## Data Isolation

This application is fully isolated from the Bloomington squadron's inventory. Data separation is enforced at two levels:

1. **Separate Vercel project** — this app is deployed to its own URL with its own KV database instance.
2. **Namespaced keys** — even if both squadrons somehow shared a KV store, this app reads and writes only to keys prefixed `cap:springfield:*`. Bloomington uses `cap:*` with no squadron prefix.

Neither squadron can view, modify, or access the other's inventory data.

---

## Deployment Steps

### 1. Create the GitHub repository

1. Go to [github.com](https://github.com) and click **New repository**.
2. Name it `cap-springfield-inventory` (or similar).
3. Keep it **Private** if desired.
4. Click **Create repository**.
5. Upload all the files in this folder — `api/items.js`, `vercel.json`, `package.json`, `public/index.html`, and this `README.md`. Preserve the folder structure (`api/` and `public/` as subdirectories).

### 2. Create the Vercel project

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New → Project**.
3. Select the `cap-springfield-inventory` repository you just created.
4. Leave all default settings. Vercel will auto-detect the Node.js API functions.
5. Click **Deploy**.

### 3. Connect Vercel KV (the database)

1. In your Vercel project dashboard, click the **Storage** tab.
2. Click **Create Database → KV (Redis)**.
3. Name it `cap-springfield-kv` and select the region closest to Illinois (likely **Washington, D.C. — iad1**).
4. Click **Create**.
5. On the next screen, click **Connect Project** and choose `cap-springfield-inventory`.
6. Vercel will automatically add the required environment variables.
7. Go to the **Deployments** tab and click **Redeploy** on the most recent deployment so it picks up the new KV connection.

### 4. Open the app

Your app will be live at `https://cap-springfield-inventory.vercel.app` (or similar URL shown in Vercel). Bookmark it and share with squadron members.

---

## Using the App

- **Dashboard** — quick view of all inventory with status
- **Inventory** — add, edit, and adjust quantities
- **Report** — sortable report with PDF, CSV, and print export
- **Settings** — configure email recipients, EmailJS credentials, categories, and test the cloud connection

---

## Color Scheme

The interface uses the four official Civil Air Patrol colors per CAPR 110-3 Brand Identity Program:

| Color | Pantone | Hex |
|---|---|---|
| Ultramarine Blue | Reflex Blue C | `#001489` |
| Air Force Yellow | 116 C | `#FFCD00` |
| Pimento Red | 200 C | `#BA0C2F` |
| Silver Gray | 422 C | `#9EA2A2` |

---

## Cost

Free, within Vercel's Hobby tier limits (generous for squadron-level usage):
- 100 GB-hours of serverless function execution per month
- 30,000 KV commands per day
- Unlimited static site bandwidth (within fair use)

No credit card required.
