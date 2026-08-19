import { neon } from '@neondatabase/serverless';

const DATABASE_URL = "postgresql://neondb_owner:npg_S45csCehbRlj@ep-soft-fire-awdzt58d-pooler.c-12.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require";
const sql = neon(DATABASE_URL);

async function initDb() {
  console.log("Creating expenses table...");
  await sql`
    CREATE TABLE IF NOT EXISTS expenses (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        date DATE NOT NULL,
        expense_from VARCHAR(100) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        expense_type VARCHAR(50) NOT NULL CHECK (expense_type IN ('Planned Expense', 'Unexpected')),
        note VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
    );
  `;

  console.log("Creating revenues table...");
  await sql`
    CREATE TABLE IF NOT EXISTS revenues (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        date DATE NOT NULL,
        product_service VARCHAR(100) NOT NULL,
        quantity INT DEFAULT 1 NOT NULL,
        unit_price DECIMAL(10, 2) NOT NULL,
        total_revenue DECIMAL(10, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
        customer_note VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
    );
  `;
  
  console.log("Database tables created successfully!");
}

initDb().catch(console.error);
