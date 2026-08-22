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

  // Initialize the Neon client using the DATABASE_URL environment variable
  const sql = neon(process.env.DATABASE_URL);

  if (req.method === 'GET') {
    try {
      // Fetch all expenses from the Neon database
      const expenses = await sql`SELECT * FROM expenses ORDER BY date DESC`;
      return res.status(200).json(expenses);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch expenses', details: error.message });
    }
  } 
  
  if (req.method === 'POST') {
    try {
      // Extract data from the request body
      const { date, expense_from, amount, expense_type, note } = req.body;
      
      // Insert new expense into the Neon database
      const newExpense = await sql`
        INSERT INTO expenses (date, expense_from, amount, expense_type, note)
        VALUES (${date}, ${expense_from}, ${amount}, ${expense_type}, ${note})
        RETURNING *
      `;
      
      return res.status(201).json(newExpense[0]);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to add expense', details: error.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id, date, expense_from, amount, expense_type, note } = req.body;
      
      const updatedExpense = await sql`
        UPDATE expenses 
        SET date = ${date}, expense_from = ${expense_from}, amount = ${amount}, expense_type = ${expense_type}, note = ${note}
        WHERE id = ${id}
        RETURNING *
      `;
      
      if (updatedExpense.length === 0) {
        return res.status(404).json({ error: 'Expense not found' });
      }
      return res.status(200).json(updatedExpense[0]);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update expense', details: error.message });
    }
  }

  // Handle unsupported HTTP methods
  res.setHeader('Allow', ['GET', 'POST', 'PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
