-- Enu Food House - Neon PostgreSQL Schema

-- 1. Expenses Table
CREATE TABLE expenses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    date DATE NOT NULL,
    expense_from VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    expense_type VARCHAR(50) NOT NULL CHECK (expense_type IN ('Planned Expense', 'Unexpected')),
    note VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 2. Revenues Table
CREATE TABLE revenues (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    date DATE NOT NULL,
    product_service VARCHAR(100) NOT NULL,
    quantity INT DEFAULT 1 NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_revenue DECIMAL(10, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    customer_note VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
