'use client'

import { useState, useEffect } from 'react'
import { Card, CardBody, Button, Spacer, Chip } from '@nextui-org/react'
import Link from 'next/link'

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          const data = await response.json()
          setIsLoggedIn(true)
          setUsername(data.user.username)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      }
    }
    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (error) {
      console.error('Logout error:', error)
    }
    setIsLoggedIn(false)
    setUsername('')
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-htb-dark via-htb-gray to-htb-dark">
      <nav className="border-b border-htb-green/20 bg-htb-dark/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold terminal-text">CTF Platform</h1>
            </div>
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <Chip color="success" variant="flat">
                    {username}
                  </Chip>
                  <Button
                    color="danger"
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                  >
                    ออกจากระบบ
                  </Button>
                </>
              ) : (
                <Link href="/login">
                  <Button color="primary" variant="solid">
                    เข้าสู่ระบบ
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold terminal-text mb-4">
            ยินดีต้อนรับสู่ CTF Platform
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            แพลตฟอร์มแข่งขัน CTF ที่ท้าทายและน่าตื่นเต้น 
            พร้อมด้วยโจทย์หลากหลายประเภทและระบบการให้คะแนนที่ยุติธรรม
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="terminal-bg htb-border hover:htb-glow transition-all duration-300">
            <CardBody className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-htb-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔐</span>
                </div>
                <h3 className="text-xl font-semibold terminal-text mb-2">
                  Web Security
                </h3>
                <p className="text-gray-400 text-sm">
                  โจทย์เกี่ยวกับความปลอดภัยเว็บไซต์ SQL Injection, XSS, CSRF
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="terminal-bg htb-border hover:htb-glow transition-all duration-300">
            <CardBody className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-htb-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💻</span>
                </div>
                <h3 className="text-xl font-semibold terminal-text mb-2">
                  Reverse Engineering
                </h3>
                <p className="text-gray-400 text-sm">
                  วิเคราะห์และแก้ไขโปรแกรม binary, malware analysis
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="terminal-bg htb-border hover:htb-glow transition-all duration-300">
            <CardBody className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-htb-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔢</span>
                </div>
                <h3 className="text-xl font-semibold terminal-text mb-2">
                  Cryptography
                </h3>
                <p className="text-gray-400 text-sm">
                  การเข้ารหัสและถอดรหัส RSA, AES, Hash functions
                </p>
              </div>
            </CardBody>
          </Card>
        </div>

        {isLoggedIn ? (
          <div className="text-center">
            <Card className="terminal-bg htb-border max-w-2xl mx-auto">
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold terminal-text mb-4">
                  เริ่มการแข่งขัน
                </h2>
                <p className="text-gray-300 mb-6">
                  ยินดีต้อนรับ {username}! พร้อมที่จะเริ่มการแข่งขัน CTF แล้วหรือยัง?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    color="primary"
                    size="lg"
                    className="htb-gradient text-htb-dark font-semibold"
                  >
                    ดูโจทย์ทั้งหมด
                  </Button>
                  <Button
                    color="default"
                    variant="bordered"
                    size="lg"
                    className="htb-border"
                  >
                    ดูคะแนน
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        ) : (
          <div className="text-center">
            <Card className="terminal-bg htb-border max-w-2xl mx-auto">
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold terminal-text mb-4">
                  เริ่มต้นการแข่งขัน
                </h2>
                <p className="text-gray-300 mb-6">
                  เข้าสู่ระบบเพื่อเริ่มการแข่งขัน CTF และรับคะแนน
                </p>
                <Link href="/login">
                  <Button
                    color="primary"
                    size="lg"
                    className="htb-gradient text-htb-dark font-semibold"
                  >
                    เข้าสู่ระบบ
                  </Button>
                </Link>
              </CardBody>
            </Card>
          </div>
        )}

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-htb-green rounded-full animate-pulse"></div>
            <span>ระบบพร้อมใช้งาน 24/7</span>
          </div>
        </div>
      </main>
    </div>
  )
}
