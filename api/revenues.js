import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // CORS Headers for Capacitor / Mobile App
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const sql = neon(process.env.DATABASE_URL);

  if (req.method === 'GET') {
    try {
      const revenues = await sql`SELECT * FROM revenues ORDER BY date DESC`;
      return res.status(200).json(revenues);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch revenues', details: error.message });
    }
  } 
  
  if (req.method === 'POST') {
    try {
      const { date, product_service, quantity, unit_price, customer_note } = req.body;
      
      const newRevenue = await sql`
        INSERT INTO revenues (date, product_service, quantity, unit_price, customer_note)
        VALUES (${date}, ${product_service}, ${quantity}, ${unit_price}, ${customer_note})
        RETURNING *
      `;
      
      return res.status(201).json(newRevenue[0]);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to add revenue', details: error.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id, date, product_service, quantity, unit_price, customer_note } = req.body;
      
      const updatedRevenue = await sql`
        UPDATE revenues 
        SET date = ${date}, product_service = ${product_service}, quantity = ${quantity}, unit_price = ${unit_price}, customer_note = ${customer_note}
        WHERE id = ${id}
        RETURNING *
      `;
      
      if (updatedRevenue.length === 0) {
        return res.status(404).json({ error: 'Revenue not found' });
      }
      return res.status(200).json(updatedRevenue[0]);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update revenue', details: error.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
