import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import path from "node:path";

export type RegistrationInput = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  church: string;
  attending: number;
  receivedAt: string;
};

export type RegistrationRow = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  church: string;
  attending: number;
  received_at: string;
};

export type BreakdownRow = {
  key: string;
  count: number;
  attendees: number;
};

export type DailyCountRow = {
  day: string;
  count: number;
  attendees: number;
};

const dataDir = path.join(process.cwd(), "data");
mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, "registrations.db"));
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    country TEXT NOT NULL,
    church TEXT NOT NULL,
    attending INTEGER NOT NULL,
    received_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_registrations_received_at ON registrations(received_at);
  CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
`);

const insertStmt = db.prepare(`
  INSERT INTO registrations (full_name, email, phone, country, church, attending, received_at)
  VALUES (@fullName, @email, @phone, @country, @church, @attending, @receivedAt)
`);

const totalsStmt = db.prepare(`
  SELECT COUNT(*) AS count, COALESCE(SUM(attending), 0) AS attendees FROM registrations
`);

const allStmt = db.prepare(`
  SELECT * FROM registrations ORDER BY received_at DESC
`);

const dailyStmt = db.prepare(`
  SELECT date(received_at) AS day,
         COUNT(*) AS count,
         COALESCE(SUM(attending), 0) AS attendees
  FROM registrations
  GROUP BY day
  ORDER BY day ASC
`);

export function insertRegistration(input: RegistrationInput): void {
  insertStmt.run(input);
}

export function getTotals(): { count: number; attendees: number } {
  return totalsStmt.get() as { count: number; attendees: number };
}

export function getBreakdown(column: "country" | "church"): BreakdownRow[] {
  const stmt = db.prepare(
    `SELECT ${column} AS key,
            COUNT(*) AS count,
            COALESCE(SUM(attending), 0) AS attendees
     FROM registrations
     GROUP BY ${column}
     ORDER BY count DESC, key ASC`,
  );
  return stmt.all() as BreakdownRow[];
}

export function getDailyCounts(): DailyCountRow[] {
  return dailyStmt.all() as DailyCountRow[];
}

export function getAllRegistrations(): RegistrationRow[] {
  return allStmt.all() as RegistrationRow[];
}

export { db };
