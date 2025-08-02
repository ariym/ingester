import Database from 'better-sqlite3'

export interface File {
  id: number
  name?: string
  path: string
  ext: string
  size: number
  created_at: string // ISO
}

let db: Database.Database

/**
 * Initialize the SQLite database and ensure the files table exists.
 */
export function init(): void {
  try {
    db = new Database('./data/mydb.sqlite', { verbose: console.log })

    db.exec(`
      CREATE TABLE IF NOT EXISTS files (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        path        TEXT    UNIQUE NOT NULL,
        ext         TEXT    NOT NULL,
        size        INTEGER NOT NULL,
        created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)
  } catch (err) {
    console.error('❌ Failed to initialize database:', err)
    throw new Error('Database initialization error')
  }
}

/**
 * Insert a new file record.
 * @returns The newly inserted row info (including lastInsertRowid).
 */
export function addFile(input: {
  path: string
  ext: string
  size: number
}): { lastInsertRowid: number } {
  try {
    const stmt = db.prepare(`
      INSERT INTO files (path, ext, size)
      VALUES (@path, @ext, @size)
    `)

    const info = stmt.run({
      path:  input.path,
      ext:   input.ext,
      size:  input.size,
    })

    return { lastInsertRowid: info.lastInsertRowid as number }
  } catch (err: any) {
    // handle unique‐constraint violation separately if desired
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      throw new Error(`A file at path "${input.path}" already exists.`)
    }
    console.error('❌ Failed to add file:', err)
    throw new Error('Could not add file record')
  }
}

/**
 * Fetch all files.
 */
export function getFiles(): File[] {
  try {
    const stmt = db.prepare<File[]>(`
      SELECT id, path, ext, size, created_at
      FROM files
      ORDER BY created_at DESC
    `)
    return stmt.all()
  } catch (err) {
    console.error('❌ Failed to fetch files:', err)
    throw new Error('Could not retrieve file records')
  }
}

// Example usage:
// init()
// const { lastInsertRowid } = addFile({ path: '/foo.txt', ext: '.txt', size: 123 })
// console.log('Inserted file id:', lastInsertRowid)
// console.log(getFiles())
