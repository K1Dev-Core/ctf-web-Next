'use client'

import { useState } from 'react'
import { Card, CardBody, Input, Button, Spacer } from '@nextui-org/react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      alert('รหัสผ่านไม่ตรงกัน')
      return
    }

    if (password.length < 6) {
      alert('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร')
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('ctf_user', data.user.username)
        alert('สมัครสมาชิกสำเร็จ!')
        window.location.href = '/'
      } else {
        const data = await response.json()
        alert(data.error || 'สมัครสมาชิกไม่สำเร็จ')
      }
    } catch (error) {
      alert('เกิดข้อผิดพลาด')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-htb-dark via-htb-gray to-htb-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold terminal-text mb-2">
            สมัครสมาชิก
          </h1>
          <p className="text-htb-green text-sm">
            สร้างบัญชีใหม่เพื่อเริ่มการแข่งขัน
          </p>
        </div>

        <Card className="terminal-bg htb-border">
          <CardBody className="p-8">
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <Input
                  type="text"
                  label="ชื่อผู้ใช้"
                  placeholder="กรอกชื่อผู้ใช้"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="terminal-text"
                  classNames={{
                    input: "text-htb-green",
                    inputWrapper: "htb-border bg-htb-dark"
                  }}
                />
              </div>

              <div>
                <Input
                  type="email"
                  label="อีเมล (ไม่บังคับ)"
                  placeholder="กรอกอีเมล"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="terminal-text"
                  classNames={{
                    input: "text-htb-green",
                    inputWrapper: "htb-border bg-htb-dark"
                  }}
                />
              </div>

              <div>
                <Input
                  type={isVisible ? "text" : "password"}
                  label="รหัสผ่าน"
                  placeholder="กรอกรหัสผ่าน (อย่างน้อย 6 ตัวอักษร)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="terminal-text"
                  classNames={{
                    input: "text-htb-green",
                    inputWrapper: "htb-border bg-htb-dark"
                  }}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => setIsVisible(!isVisible)}
                    >
                      {isVisible ? (
                        <EyeSlashIcon className="w-4 h-4 text-htb-green" />
                      ) : (
                        <EyeIcon className="w-4 h-4 text-htb-green" />
                      )}
                    </button>
                  }
                />
              </div>

              <div>
                <Input
                  type={isVisible ? "text" : "password"}
                  label="ยืนยันรหัสผ่าน"
                  placeholder="กรอกรหัสผ่านอีกครั้ง"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="terminal-text"
                  classNames={{
                    input: "text-htb-green",
                    inputWrapper: "htb-border bg-htb-dark"
                  }}
                />
              </div>

              <Spacer y={4} />

              <Button
                type="submit"
                className="w-full htb-gradient text-htb-dark font-semibold"
                size="lg"
                isLoading={isLoading}
                disabled={!username || !password || !confirmPassword}
              >
                {isLoading ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                มีบัญชีแล้ว?{' '}
                <Link href="/login" className="text-htb-green hover:underline">
                  เข้าสู่ระบบ
                </Link>
              </p>
            </div>
          </CardBody>
        </Card>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 text-xs text-gray-500">
            <div className="w-2 h-2 bg-htb-green rounded-full animate-pulse"></div>
            <span>ระบบพร้อมใช้งาน</span>
          </div>
        </div>
      </div>
    </div>
  )
}
