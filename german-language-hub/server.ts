import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Persistent database file path
const DATA_DIR = path.resolve(__dirname, 'data');
const DB_FILE = path.resolve(DATA_DIR, 'registrations.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper to read registrations from file
function getRegistrations(): any[] {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content || '[]');
    }
  } catch (err) {
    console.error('Error reading registrations from DB:', err);
  }
  return [];
}

// Helper to save registrations to file
function saveRegistrations(data: any[]): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving registrations to DB:', err);
  }
}

// Optional Supabase Sync if user configures SUPABASE_URL and SUPABASE_KEY in Vercel / env
async function syncToSupabase(record: any): Promise<void> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return; // Supabase not configured, skip
  }

  try {
    const res = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/registrations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(record)
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      console.warn('Supabase sync notice:', res.status, errText);
    }
  } catch (err: any) {
    console.warn('Supabase sync skipped / network issue:', err?.message);
  }
}

// API: Verify Admin Password
app.post('/api/admin/verify', (req, res) => {
  const { password } = req.body || {};
  const expectedPassword = process.env.ADMIN_PASSWORD || 'admin0062';

  if (password === expectedPassword) {
    return res.status(200).json({ success: true, authenticated: true });
  }
  return res.status(401).json({ success: false, error: 'Incorrect admin password' });
});

// API: Get All Registrations
app.get('/api/registrations', (req, res) => {
  try {
    const list = getRegistrations();
    return res.status(200).json({
      success: true,
      totalCount: list.length,
      maxCapacity: 2000,
      registrations: list
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch registrations' });
  }
});

// API: Delete Registration
app.delete('/api/registrations/:id', (req, res) => {
  try {
    const id = req.params.id;
    const list = getRegistrations();
    const updated = list.filter((item: any) => item.id !== id);
    saveRegistrations(updated);
    return res.status(200).json({ success: true, message: 'Registration deleted successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to delete registration' });
  }
});

// API Route: /api/notify (Saves to Database + Sends Telegram notification)
app.post('/api/notify', async (req, res) => {
  try {
    const body = req.body || {};
    const studentName = body.fullName || body.name || 'N/A';
    const studentWhatsapp = body.whatsapp || body.whatsappNumber || 'N/A';
    const studentCity = body.city || 'N/A';
    const studentLevel = body.level || body.targetLevel || body.germanLevel || 'A1';
    const studentBatch = body.batch || body.classTimeSlot || body.zoomBatch || 'Morning Batch (10:00 AM – 11:00 AM)';
    const studentPurpose = body.purpose || body.learningReason || body.learningPurpose || 'Study in Germany (Bachelor / Master Degree)';

    const regId = body.id || `DE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRecord = {
      id: regId,
      fullName: studentName,
      age: body.age || 20,
      gender: body.gender || 'Male',
      whatsappNumber: studentWhatsapp,
      country: body.country || 'Pakistan',
      city: studentCity,
      highestEducation: body.highestEducation || 'Intermediate',
      currentLevel: body.currentLevel || 'No German / Beginner',
      targetLevel: studentLevel,
      classTimeSlot: studentBatch,
      learningReason: studentPurpose,
      createdAt: body.createdAt || new Date().toISOString(),
      paymentStatus: 'pending'
    };

    // 1. SAVE TO DATABASE (Capacity for 2000+ submissions)
    const currentList = getRegistrations();
    // Prepend to top of list
    const updatedList = [newRecord, ...currentList.filter(item => item.id !== regId)];
    saveRegistrations(updatedList);

    // 2. ASYNC SYNC TO SUPABASE IF CONFIGURED
    syncToSupabase(newRecord).catch(() => {});

    // 3. SEND TELEGRAM NOTIFICATION (If env configured)
    const botToken = process.env.TELEGRAM_BOT_TOKEN || '8243641679:AAE1IJ2h35b-j0YQJh-ZbbXbzsXev481Wec';
    const chatId = process.env.TELEGRAM_CHAT_ID || '8627852621';

    if (botToken && chatId) {
      const text = `🎓 New Registration\nName: ${studentName}\nWhatsApp: ${studentWhatsapp}\nCity: ${studentCity}\nLevel: ${studentLevel}\nBatch: ${studentBatch}\nPurpose: ${studentPurpose}`;

      try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text,
          }),
        });
      } catch (tgErr: any) {
        console.warn('Telegram send notice:', tgErr?.message);
      }
    }

    return res.status(200).json({
      ok: true,
      success: true,
      message: 'Registration saved successfully',
      registration: newRecord
    });
  } catch (error: any) {
    console.error('Error handling /api/notify:', error?.message);
    return res.status(500).json({ error: 'failed' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Application server running on port ${PORT}`);
  });
}

startServer();
