export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

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

    // 1. Sync to Supabase if configured in Vercel env
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey) {
      try {
        await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/registrations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify(newRecord)
        });
      } catch (err) {
        console.warn('Supabase sync notice in api/notify:', err);
      }
    }

    // 2. Telegram Notification
    const token = process.env.TELEGRAM_BOT_TOKEN || '8243641679:AAE1IJ2h35b-j0YQJh-ZbbXbzsXev481Wec';
    const chatId = process.env.TELEGRAM_CHAT_ID || '8627852621';

    if (token && chatId) {
      const text = `🎓 New Registration\nName: ${studentName}\nWhatsApp: ${studentWhatsapp}\nCity: ${studentCity}\nLevel: ${studentLevel}\nBatch: ${studentBatch}\nPurpose: ${studentPurpose}`;

      try {
        const tgRes = await fetch(
          `https://api.telegram.org/bot${token}/sendMessage`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: chatId,
              text,
            }),
          }
        );
        if (!tgRes.ok) {
          console.warn('Telegram API response not ok:', tgRes.status);
        }
      } catch (tgErr) {
        console.warn('Telegram notification notice:', tgErr);
      }
    }

    return res.status(200).json({
      ok: true,
      success: true,
      message: 'Notification sent and registration saved',
      registration: newRecord
    });
  } catch (error: any) {
    console.error('Error handling /api/notify:', error?.message);
    return res.status(500).json({ error: 'failed' });
  }
}
