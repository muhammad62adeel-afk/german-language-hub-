import { NextResponse } from 'next/server';

export async function POST(req: Request) {
 try {
  const { fullName, whatsapp, city, level, batch, purpose } = await req.json();
  const token = process.env.TELEGRAM_BOT_TOKEN!;
  const chatId = process.env.TELEGRAM_CHAT_ID!;
  const text = `🎓 New Registration\nName: ${fullName}\nWhatsApp: ${whatsapp}\nCity: ${city}\nLevel: ${level}\nBatch: ${batch}\nPurpose: ${purpose}`;
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
   method: 'POST',
   headers: {'Content-Type':'application/json'},
   body: JSON.stringify({ chat_id: chatId, text })
  });
  if(!res.ok) throw new Error('telegram failed');
  return NextResponse.json({ok:true});
 } catch(e){ return NextResponse.json({error:'failed'}, {status:500}) }
}
