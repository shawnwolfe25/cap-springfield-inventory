// ═══════════════════════════════════════════════════════════════
// Springfield CAP Inventory — Vercel Serverless API
// api/items.js  —  handles all inventory CRUD operations
// Uses Vercel KV (free tier) for persistent shared storage
// ═══════════════════════════════════════════════════════════════

import { kv } from '@vercel/kv';

const ITEMS_KEY    = 'cap:items';
const SETTINGS_KEY = 'cap:settings';

// ── CORS headers (allow browser fetch from any origin) ──────────
function cors(res) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  return res;
}

export default async function handler(req, res) {
  cors(res);

  // Preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      return await handleGet(req, res);
    }
    if (req.method === 'POST') {
      return await handlePost(req, res);
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: err.message });
  }
}

// ── GET handler ──────────────────────────────────────────────────
async function handleGet(req, res) {
  const { action } = req.query;

  if (action === 'ping') {
    return res.json({ ok: true, message: 'CAP Inventory API running', ts: Date.now() });
  }

  if (action === 'getItems' || !action) {
    const items = (await kv.get(ITEMS_KEY)) || [];
    return res.json({ ok: true, items });
  }

  if (action === 'getSettings') {
    const settings = (await kv.get(SETTINGS_KEY)) || {};
    return res.json({ ok: true, settings });
  }

  return res.status(400).json({ error: 'Unknown action: ' + action });
}

// ── POST handler ─────────────────────────────────────────────────
async function handlePost(req, res) {
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const { action } = body;

  // ── Save single item (add or update) ──
  if (action === 'saveItem') {
    const item = body.item;
    if (!item || !item.id) return res.status(400).json({ error: 'Missing item or id' });

    let items = (await kv.get(ITEMS_KEY)) || [];
    const idx = items.findIndex(i => i.id === item.id);
    if (idx !== -1) {
      items[idx] = item;
      await kv.set(ITEMS_KEY, items);
      return res.json({ ok: true, action: 'updated' });
    } else {
      items.push(item);
      await kv.set(ITEMS_KEY, items);
      return res.json({ ok: true, action: 'added' });
    }
  }

  // ── Delete single item ──
  if (action === 'deleteItem') {
    const { id } = body;
    if (!id) return res.status(400).json({ error: 'Missing id' });

    let items = (await kv.get(ITEMS_KEY)) || [];
    const before = items.length;
    items = items.filter(i => i.id !== id);
    if (items.length === before) return res.status(404).json({ error: 'Item not found' });

    await kv.set(ITEMS_KEY, items);
    return res.json({ ok: true });
  }

  // ── Replace all items (bulk upload) ──
  if (action === 'saveAllItems') {
    const { items } = body;
    if (!Array.isArray(items)) return res.status(400).json({ error: 'items must be an array' });

    await kv.set(ITEMS_KEY, items);
    return res.json({ ok: true, count: items.length });
  }

  // ── Save settings ──
  if (action === 'saveSettings') {
    const { settings } = body;
    if (!settings) return res.status(400).json({ error: 'Missing settings' });

    await kv.set(SETTINGS_KEY, settings);
    return res.json({ ok: true });
  }

  return res.status(400).json({ error: 'Unknown action: ' + action });
}
