import type { Tables, TablesInsert, TablesUpdate } from './database.types'

export type Expenses = Tables<'expenses'>
export type ExpensesInsert = TablesInsert<'expenses'>
export type ExpensesUpdate = TablesUpdate<'expenses'>
