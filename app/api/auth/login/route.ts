import { NextRequest, NextResponse } from 'next/server'
import { getUserByUsername, updateUser, createUser } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json()

    if (!username) {
      return NextResponse.json(
        { error: 'กรุณากรอกชื่อผู้ใช้' },
        { status: 400 }
      )
    }

    let user = getUserByUsername(username)
    
    if (!user) {
      user = createUser({
        username,
        password: '',
        email: undefined
      })
    }

    updateUser(user.id, { lastLogin: new Date().toISOString() })

    const response = NextResponse.json(
      { 
        message: 'เข้าสู่ระบบสำเร็จ',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          score: user.score
        }
      },
      { status: 200 }
    )

    response.cookies.set('ctf_token', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในระบบ' },
      { status: 500 }
    )
  }
}
