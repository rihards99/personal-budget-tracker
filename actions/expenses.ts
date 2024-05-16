'use server'

import { Expense } from '@/types';
import { sql } from '@vercel/postgres';

export const getExpenses = async (user_id: string) => {
  try {
    // Supposedly the template literal helps against SQL injection
    // as written in the NextJs docs
    const { rows } = await sql`
      SELECT id, user_id, date, amount, category, type, title, description
      FROM expenses
      WHERE user_id = ${user_id}
    `;

    return rows.map((row) => ({
      ...row,
      amount: +row.amount,
    }));

  } catch (error) {
    console.log("ERROR", error);
  }
}

export const createExpense = async ({user_id, date, category, type, amount, title, description}: Expense) => {
  try {
    await sql`
      INSERT INTO expenses (user_id, date, category, type, amount, title, description)
      VALUES (${user_id}, ${date}, ${category}, ${type}, ${amount}, ${title}, ${description});
    `;

    return await getExpenses(user_id);
  } catch (error) {
    console.log("ERROR", error);
  }
}

export const deleteExpense = async (expense_id: string, user_id: string) => {
  try {
    await sql`
      DELETE FROM expenses
      WHERE id = ${expense_id}
        AND user_id = ${user_id};
    `;

    return await getExpenses(user_id);
  } catch (error) {
    console.log("ERROR", error);
  }
};