// Serverless & Node.js handler for Telegram Registration Notifications
// SECURITY: Reads credentials exclusively from environment variables

export default async function handler(req, res) {
  // Allow only POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const token = process.env.TELEGRAM_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('Telegram configuration missing: TELEGRAM_TOKEN or TELEGRAM_CHAT_ID is not defined in environment variables.');
    return res.status(500).json({
      success: false,
      error: 'Telegram environment credentials not configured on server'
    });
  }

  try {
    const data = req.body || {};

    // Extract all student registration fields
    const fullName = data.fullName || data.name || 'N/A';
    const age = data.age || 'N/A';
    const gender = data.gender || 'N/A';
    const mobileNumber = data.whatsappNumber || data.whatsapp || data.mobile || data.phone || 'N/A';
    const country = data.country || 'N/A';
    const city = data.city || 'N/A';
    const highestEducation = data.highestEducation || data.education || 'N/A';
    const currentGermanLevel = data.currentLevel || data.currentGermanLevel || 'No German / Beginner';
    const courseLevel = data.targetLevel || data.courseLevel || data.level || 'A1';
    const batchTime = data.classTimeSlot || data.batchTime || data.batch || 'Morning Batch (10:00 AM – 11:00 AM)';
    const purpose = data.learningReason || data.purpose || 'Study in Germany';
    const registrationId = data.id || `DE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const submissionDate = data.createdAt ? new Date(data.createdAt).toLocaleString() : new Date().toLocaleString();

    // Format clean and structured Telegram message
    const message = `🎓 *NEW STUDENT REGISTRATION* 🇩🇪
━━━━━━━━━━━━━━━━━━━━━
👤 *Full Name:* ${fullName}
🎂 *Age:* ${age}
⚧ *Gender:* ${gender}
📱 *Mobile / WhatsApp:* ${mobileNumber}
🌍 *Country:* ${country}
🏙️ *City:* ${city}
🎓 *Highest Education:* ${highestEducation}
🗣️ *Current German Level:* ${currentGermanLevel}
📚 *Target Course Level:* Level ${courseLevel}
⏰ *Batch Time:* ${batchTime}
🎯 *Purpose (Why Learn German):* ${purpose}
━━━━━━━━━━━━━━━━━━━━━
🆔 *Registration ID:* \`${registrationId}\`
📅 *Date & Time:* ${submissionDate}
⚡ *Live Zoom App Classes Sponsored by Ahmed Rajput*`;

    // Secure fetch call to Telegram Bot API using environment token
    const telegramEndpoint = `https://api.telegram.org/bot${token}/sendMessage`;

    const response = await fetch(telegramEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      console.error('Telegram API error:', result);
      return res.status(502).json({
        success: false,
        error: result.description || 'Failed to dispatch notification to Telegram'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Student registration successfully sent to Telegram',
      registrationId
    });
  } catch (error) {
    console.error('Error handling /api/telegram:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error processing Telegram notification'
    });
  }
}
