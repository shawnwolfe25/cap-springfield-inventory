// ═══════════════════════════════════════════════════════════════
// Springfield CAP Inventory — Vercel Serverless API
// api/items.js  —  handles all inventory CRUD operations
// Uses Vercel KV (free tier) for persistent shared storage
//
// DATA ISOLATION:
// This squadron uses KV keys prefixed with 'cap:springfield:'.
// Bloomington uses 'cap:bloomington:' (squadron prefixed). Data is fully
// separated even if both deployments were to share a KV store.
// ═══════════════════════════════════════════════════════════════

import { kv } from '@vercel/kv';

const SQUADRON     = 'springfield';
const ITEMS_KEY    = `cap:${SQUADRON}:items`;
const SETTINGS_KEY = `cap:${SQUADRON}:settings`;

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
    if (req.method === 'GET')  return await handleGet(req, res);
    if (req.method === 'POST') return await handlePost(req, res);
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
    return res.json({ ok: true, squadron: SQUADRON, message: 'Springfield CAP Inventory API running', ts: Date.now() });
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
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  const { action } = body;

  if (action === 'saveItems') {
    if (!Array.isArray(body.items)) {
      return res.status(400).json({ error: 'items must be an array' });
    }
    await kv.set(ITEMS_KEY, body.items);
    return res.json({ ok: true, count: body.items.length });
  }

  if (action === 'saveSettings') {
    if (!body.settings || typeof body.settings !== 'object') {
      return res.status(400).json({ error: 'settings must be an object' });
    }
    await kv.set(SETTINGS_KEY, body.settings);
    return res.json({ ok: true });
  }

  if (action === 'saveItem') {
    // Upsert a single item
    if (!body.item || !body.item.id) {
      return res.status(400).json({ error: 'item with id required' });
    }
    const items = (await kv.get(ITEMS_KEY)) || [];
    const idx = items.findIndex(i => i.id === body.item.id);
    if (idx >= 0) items[idx] = body.item;
    else items.push(body.item);
    await kv.set(ITEMS_KEY, items);
    return res.json({ ok: true, item: body.item });
  }

  if (action === 'deleteItem') {
    if (!body.id) return res.status(400).json({ error: 'id required' });
    const items = (await kv.get(ITEMS_KEY)) || [];
    const filtered = items.filter(i => i.id !== body.id);
    await kv.set(ITEMS_KEY, filtered);
    return res.json({ ok: true, removed: items.length - filtered.length });
  }

  if (action === 'reset') {
    await kv.del(ITEMS_KEY);
    return res.json({ ok: true, message: 'Inventory cleared' });
  }

  return res.status(400).json({ error: 'Unknown action: ' + action });
}
