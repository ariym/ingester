import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'

export interface File {
  id: number
  name: string
  path: string
  ext: string
  size: number
  created_at: string // ISO
}

let db: Database<sqlite3.Database, sqlite3.Statement>

export async function init() {
  db = await open({
    filename: './data/mydb.sqlite',
    driver: sqlite3.Database
  })

  // Create table if not exists
  await db.exec(`
    CREATE TABLE IF NOT EXISTS files (
      id    INTEGER PRIMARY KEY AUTOINCREMENT,
      path  TEXT UNIQUE NOT NULL,
      ext   TEXT NOT NULL,
      size  INTEGER NOT NULL,
      created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

export async function addFile({path, ext, size}): Promise<any> {
  const result = await db.run(
    `INSERT INTO Files (path, ext, size) VALUES (?, ?, ?)`,
    [path, ext, size]
  )

  return result
}

export async function getFiles(): Promise<File[]> {
  return db.all<File[]>(`SELECT * FROM Files`)
}
