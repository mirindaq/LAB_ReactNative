import { Expense } from "@/types/expense";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("expense.db");

// Promise để đảm bảo initDB chỉ chạy một lần
let initPromise: Promise<void> | null = null;

export const initDB = async () => {
  if (initPromise) {
    return initPromise;
  }

  initPromise = db.execAsync(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      amount REAL NOT NULL,
      type TEXT NOT NULL,   
      createdAt TEXT NOT NULL,
      isDeleted INTEGER DEFAULT 0
    );
  `);

  await initPromise;
};

// Hàm helper để đảm bảo DB được init trước khi thực thi
const ensureDBInitialized = async () => {
  await initDB();
};

export const addExpense = async (title: string, amount: number, type: string) => {
  await ensureDBInitialized();
  
  const createdAt = new Date().toISOString();
  await db.runAsync(
    "INSERT INTO expenses (title, amount, type, createdAt) VALUES (?, ?, ?, ?)",
    [title, amount, type, createdAt]
  );
};

export const getExpenses = async (): Promise<Expense[]> => {
  await ensureDBInitialized();
  
  if (!db) return [];

  const rows = await db.getAllAsync<Expense>(
    "SELECT * FROM expenses WHERE isDeleted = 0 ORDER BY createdAt DESC"
  );

  return rows;
};

export const updateExpense = async (
  id: number,
  title: string,
  amount: number,
  type: string
) => {
  await ensureDBInitialized();
  
  await db.runAsync(
    "UPDATE expenses SET title = ?, amount = ?, type = ? WHERE id = ?",
    [title, amount, type, id]
  );
};

export const deleteExpense = async (id: number) => {
  await ensureDBInitialized();
  
  await db.runAsync(
    "UPDATE expenses SET isDeleted = 1 WHERE id = ?",
    [id]
  );
};

export const getDeletedExpenses = async (): Promise<Expense[]> => {
  await ensureDBInitialized();
  
  if (!db) return [];

  const rows = await db.getAllAsync<Expense>(
    "SELECT * FROM expenses WHERE isDeleted = 1 ORDER BY createdAt DESC"
  );

  return rows;
};

