import type { Tables, TablesInsert, TablesUpdate } from './database.types'

export type Expense = Tables<'expenses'>
export type ExpenseInsert = TablesInsert<'expenses'>
export type ExpenseUpdate = TablesUpdate<'expenses'>
