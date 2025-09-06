import { NextRequest, NextResponse } from 'next/server'
import { getAllUsers } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('ctf_token')
    
    if (!token) {
      return NextResponse.json(
        { error: 'ไม่พบ token' },
        { status: 401 }
      )
    }

    const users = getAllUsers()
    const user = users.find(u => u.id === token.value)
    
    if (!user) {
      return NextResponse.json(
        { error: 'ไม่พบผู้ใช้' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        score: user.score,
        solvedChallenges: user.solvedChallenges
      }
    })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในระบบ' },
      { status: 500 }
    )
  }
}
