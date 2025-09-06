import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const USERS_FILE = path.join(DATA_DIR, 'users.json')

export interface User {
  id: string
  username: string
  password: string
  email?: string
  createdAt: string
  lastLogin?: string
  score: number
  solvedChallenges: string[]
}

export interface Database {
  users: User[]
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

function readDatabase(): Database {
  ensureDataDir()
  
  if (!fs.existsSync(USERS_FILE)) {
    const initialData: Database = {
      users: [
        {
          id: '1',
          username: 'admin',
          password: 'admin123',
          email: 'admin@ctf.local',
          createdAt: new Date().toISOString(),
          score: 0,
          solvedChallenges: []
        }
      ]
    }
    writeDatabase(initialData)
    return initialData
  }

  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading database:', error)
    return { users: [] }
  }
}

function writeDatabase(data: Database): void {
  ensureDataDir()
  fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2))
}

export function getUserByUsername(username: string): User | null {
  const db = readDatabase()
  return db.users.find(user => user.username === username) || null
}

export function createUser(userData: Omit<User, 'id' | 'createdAt' | 'score' | 'solvedChallenges'>): User {
  const db = readDatabase()
  const newUser: User = {
    ...userData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    score: 0,
    solvedChallenges: []
  }
  
  db.users.push(newUser)
  writeDatabase(db)
  return newUser
}

export function updateUser(userId: string, updates: Partial<User>): User | null {
  const db = readDatabase()
  const userIndex = db.users.findIndex(user => user.id === userId)
  
  if (userIndex === -1) return null
  
  db.users[userIndex] = { ...db.users[userIndex], ...updates }
  writeDatabase(db)
  return db.users[userIndex]
}

export function getAllUsers(): User[] {
  const db = readDatabase()
  return db.users
}

export function deleteUser(userId: string): boolean {
  const db = readDatabase()
  const userIndex = db.users.findIndex(user => user.id === userId)
  
  if (userIndex === -1) return false
  
  db.users.splice(userIndex, 1)
  writeDatabase(db)
  return true
}
