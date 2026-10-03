export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    // If Supabase is available, query it, otherwise return sample/mock or empty
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const resp = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/registrations?select=*&order=createdAt.desc`, {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
          }
        });
        if (resp.ok) {
          const data = await resp.json();
          return res.status(200).json({
            success: true,
            totalCount: data.length,
            maxCapacity: 2000,
            registrations: data
          });
        }
      } catch (err) {
        console.warn('Supabase query error in /api/registrations:', err);
      }
    }

    return res.status(200).json({
      success: true,
      totalCount: 0,
      maxCapacity: 2000,
      registrations: []
    });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query || {};
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey && id) {
      try {
        await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/registrations?id=eq.${id}`, {
          method: 'DELETE',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
          }
        });
      } catch (err) {
        // ignore
      }
    }
    return res.status(200).json({ success: true, message: 'Deleted' });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
