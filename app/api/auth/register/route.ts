import { NextRequest, NextResponse } from 'next/server'
import { getUserByUsername, createUser } from '@/lib/database'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { username, password, email } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' },
        { status: 400 }
      )
    }

    const existingUser = getUserByUsername(username)
    if (existingUser) {
      return NextResponse.json(
        { error: 'ชื่อผู้ใช้นี้มีอยู่แล้ว' },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    
    const newUser = createUser({
      username,
      password: hashedPassword,
      email: email || undefined
    })

    const response = NextResponse.json(
      { 
        message: 'สมัครสมาชิกสำเร็จ',
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email
        }
      },
      { status: 201 }
    )

    response.cookies.set('ctf_token', newUser.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    })

    return response
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในระบบ' },
      { status: 500 }
    )
  }
}
