import { createExpense, deleteExpense, getExpenses } from "@/actions/expenses"
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server"

// All of this could also be done using NextJs' server actions
// but we're also offering the REST api option that just uses
// the server actions under the hood

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return Response.json({error: "Not logged in"}, {status: 403})
  }

  const expenses = await getExpenses(user.id)

  return Response.json(expenses)
}

export async function POST(req : NextRequest) {
  const user = await currentUser();

  if (!user) {
    return Response.json({error: "Not logged in"}, {status: 403})
  }

  const expense = await req.json()
  console.log("🚀 ~ SERVER expense:", expense);

  const newExpenses = await createExpense({...expense, user_id: user.id});

  return Response.json(newExpenses)
}

export async function DELETE(req : NextRequest) {
  const user = await currentUser();

  if (!user) {
    return Response.json({error: "Not logged in"}, {status: 403})
  }

  const expenseId = req.nextUrl.searchParams.get("id")

  if (!expenseId) {
    return Response.json({error: "No expense id provided"}, {status: 400})
  }

  const newExpenses = await deleteExpense(expenseId, user.id);

  return Response.json(newExpenses)
}
