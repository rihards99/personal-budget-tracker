export type Expense = {
  id: string;
  user_id: string;
  date: string;
  category: ExpenseCategory;
  type: ExpenseType;
  title: string;
  description: string;
  amount: number;
  created_at: string;
}

export enum ExpenseType {
  income = "income",
  expense = "expense",
}

export enum ExpenseCategory {
  food = "food",
  housing = "housing",
  transportation = "transportation",
  other = "other",
  homePayment = "home payment",
  healthcare = "healthcare",
}

export const CATEGORY_COLORS = {
  [ExpenseCategory.food]: "#f5a623",
  [ExpenseCategory.housing]: "#007bff",
  [ExpenseCategory.transportation]: "#ffc107",
  [ExpenseCategory.other]: "#6c757d",
  [ExpenseCategory.homePayment]: "#dc3545",
  [ExpenseCategory.healthcare]: "#28a745",
}

export const CATEGORY_BORDER_COLORS = {
  [ExpenseCategory.food]: "#d48e1b",
  [ExpenseCategory.housing]: "#005aa1",
  [ExpenseCategory.transportation]: "#d49b00",
  [ExpenseCategory.other]: "#576267",
  [ExpenseCategory.homePayment]: "#b32437",
  [ExpenseCategory.healthcare]: "#1f7d35",
}