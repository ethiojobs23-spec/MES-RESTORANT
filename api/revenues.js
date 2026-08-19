import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
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

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
