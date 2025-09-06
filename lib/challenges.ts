import fs from 'fs'
import path from 'path'
import { Challenge, ChallengeCategory } from './types'

const DATA_DIR = path.join(process.cwd(), 'data')
const CHALLENGES_FILE = path.join(DATA_DIR, 'challenges.json')

export interface ChallengesDatabase {
  challenges: Challenge[]
  categories: ChallengeCategory[]
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

function readChallengesDatabase(): ChallengesDatabase {
  ensureDataDir()
  
  if (!fs.existsSync(CHALLENGES_FILE)) {
    const initialData: ChallengesDatabase = {
      challenges: [
        {
          id: '1',
          title: 'SQL Injection Basics',
          description: 'หาช่องโหว่ SQL Injection ในเว็บไซต์นี้',
          flag: 'CTF{SQL_INJECTION_101}',
          category: 'web',
          points: 100,
          difficulty: 'easy',
          hints: ['ลองใช้ single quote', 'ตรวจสอบ error message'],
          webLink: 'http://localhost:8080/challenge1',
          isActive: true,
          createdAt: new Date().toISOString(),
          solvedBy: []
        },
        {
          id: '2',
          title: 'Caesar Cipher',
          description: 'ถอดรหัสข้อความที่ถูกเข้ารหัสด้วย Caesar Cipher',
          flag: 'CTF{CAESAR_IS_EASY}',
          category: 'crypto',
          points: 50,
          difficulty: 'easy',
          hints: ['ลอง shift 1-25', 'ใช้ frequency analysis'],
          downloadLink: 'http://localhost:8080/files/caesar.txt',
          isActive: true,
          createdAt: new Date().toISOString(),
          solvedBy: []
        },
        {
          id: '3',
          title: 'Reverse Engineering 101',
          description: 'วิเคราะห์ binary file และหาฟังก์ชันที่ซ่อนอยู่',
          flag: 'CTF{REVERSE_ME}',
          category: 'reverse',
          points: 200,
          difficulty: 'medium',
          hints: ['ใช้ strings command', 'ตรวจสอบ main function'],
          downloadLink: 'http://localhost:8080/files/reverse.bin',
          isActive: true,
          createdAt: new Date().toISOString(),
          solvedBy: []
        },
        {
          id: '4',
          title: 'Memory Dump Analysis',
          description: 'วิเคราะห์ memory dump และหา flag ที่ซ่อนอยู่',
          flag: 'CTF{MEMORY_FORENSICS}',
          category: 'forensics',
          points: 150,
          difficulty: 'medium',
          hints: ['ใช้ volatility', 'หา process list'],
          downloadLink: 'http://localhost:8080/files/memory.dmp',
          isActive: true,
          createdAt: new Date().toISOString(),
          solvedBy: []
        },
        {
          id: '5',
          title: 'Buffer Overflow',
          description: 'ใช้ช่องโหว่ buffer overflow เพื่อควบคุม program flow',
          flag: 'CTF{BOF_SUCCESS}',
          category: 'pwn',
          points: 300,
          difficulty: 'hard',
          hints: ['ตรวจสอบ stack layout', 'ใช้ ROP chain'],
          downloadLink: 'http://localhost:8080/files/vuln_program',
          isActive: true,
          createdAt: new Date().toISOString(),
          solvedBy: []
        },
        {
          id: '6',
          title: 'Steganography',
          description: 'หา flag ที่ซ่อนอยู่ในรูปภาพ',
          flag: 'CTF{HIDDEN_IN_IMAGE}',
          category: 'misc',
          points: 75,
          difficulty: 'easy',
          hints: ['ใช้ stegsolve', 'ตรวจสอบ LSB'],
          downloadLink: 'http://localhost:8080/files/hidden.png',
          isActive: true,
          createdAt: new Date().toISOString(),
          solvedBy: []
        }
      ],
      categories: [
        {
          id: 'web',
          name: 'Web Security',
          description: 'โจทย์เกี่ยวกับความปลอดภัยเว็บไซต์',
          icon: 'GlobeAltIcon',
          color: 'text-red-500'
        },
        {
          id: 'crypto',
          name: 'Cryptography',
          description: 'การเข้ารหัสและถอดรหัส',
          icon: 'KeyIcon',
          color: 'text-yellow-500'
        },
        {
          id: 'reverse',
          name: 'Reverse Engineering',
          description: 'วิเคราะห์และแก้ไขโปรแกรม',
          icon: 'CodeBracketIcon',
          color: 'text-blue-500'
        },
        {
          id: 'forensics',
          name: 'Digital Forensics',
          description: 'การวิเคราะห์หลักฐานดิจิทัล',
          icon: 'MagnifyingGlassIcon',
          color: 'text-green-500'
        },
        {
          id: 'pwn',
          name: 'Binary Exploitation',
          description: 'การใช้ช่องโหว่ในโปรแกรม',
          icon: 'ExclamationTriangleIcon',
          color: 'text-purple-500'
        },
        {
          id: 'misc',
          name: 'Miscellaneous',
          description: 'โจทย์ประเภทอื่นๆ',
          icon: 'PuzzlePieceIcon',
          color: 'text-gray-500'
        }
      ]
    }
    writeChallengesDatabase(initialData)
    return initialData
  }

  try {
    const data = fs.readFileSync(CHALLENGES_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading challenges database:', error)
    return { challenges: [], categories: [] }
  }
}

function writeChallengesDatabase(data: ChallengesDatabase): void {
  ensureDataDir()
  fs.writeFileSync(CHALLENGES_FILE, JSON.stringify(data, null, 2))
}

export function getAllChallenges(): Challenge[] {
  const db = readChallengesDatabase()
  return db.challenges.filter(challenge => challenge.isActive)
}

export function getChallengesByCategory(category: string): Challenge[] {
  const db = readChallengesDatabase()
  return db.challenges.filter(challenge => 
    challenge.category === category && challenge.isActive
  )
}

export function getChallengeById(id: string): Challenge | null {
  const db = readChallengesDatabase()
  return db.challenges.find(challenge => challenge.id === id) || null
}

export function getAllCategories(): ChallengeCategory[] {
  const db = readChallengesDatabase()
  return db.categories
}

export function getCategoryById(id: string): ChallengeCategory | null {
  const db = readChallengesDatabase()
  return db.categories.find(category => category.id === id) || null
}

export function createChallenge(challengeData: Omit<Challenge, 'id' | 'createdAt' | 'solvedBy'>): Challenge {
  const db = readChallengesDatabase()
  const newChallenge: Challenge = {
    ...challengeData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    solvedBy: []
  }
  
  db.challenges.push(newChallenge)
  writeChallengesDatabase(db)
  return newChallenge
}

export function updateChallenge(challengeId: string, updates: Partial<Challenge>): Challenge | null {
  const db = readChallengesDatabase()
  const challengeIndex = db.challenges.findIndex(challenge => challenge.id === challengeId)
  
  if (challengeIndex === -1) return null
  
  db.challenges[challengeIndex] = { ...db.challenges[challengeIndex], ...updates }
  writeChallengesDatabase(db)
  return db.challenges[challengeIndex]
}

export function solveChallenge(challengeId: string, userId: string): boolean {
  const db = readChallengesDatabase()
  const challengeIndex = db.challenges.findIndex(challenge => challenge.id === challengeId)
  
  if (challengeIndex === -1) return false
  
  const challenge = db.challenges[challengeIndex]
  if (!challenge.solvedBy.includes(userId)) {
    challenge.solvedBy.push(userId)
    writeChallengesDatabase(db)
  }
  
  return true
}
