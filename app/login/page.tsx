'use client'

import { useState } from 'react'
import { Card, CardBody, Input, Button, Spacer } from '@nextui-org/react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('ctf_user', data.user.username)
        window.location.href = '/'
      } else {
        const errorData = await response.json()
        alert(errorData.error || 'เข้าสู่ระบบไม่สำเร็จ')
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
            CTF Platform
          </h1>
          <p className="text-htb-green text-sm">
            เข้าสู่ระบบเพื่อเริ่มการแข่งขัน
          </p>
        </div>

        <Card className="terminal-bg htb-border">
          <CardBody className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
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
                  type={isVisible ? "text" : "password"}
                  label="รหัสผ่าน"
                  placeholder="กรอกรหัสผ่าน"
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

              <Spacer y={4} />

              <Button
                type="submit"
                className="w-full htb-gradient text-htb-dark font-semibold"
                size="lg"
                isLoading={isLoading}
                disabled={!username || !password}
              >
                {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                ยังไม่มีบัญชี?{' '}
                <Link href="/register" className="text-htb-green hover:underline">
                  สมัครสมาชิก
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
