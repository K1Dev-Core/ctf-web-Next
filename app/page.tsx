'use client'

import { useState, useEffect } from 'react'
import { Card, CardBody, Button, Chip } from '@nextui-org/react'
import { UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
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
                  <Chip color="success" variant="flat" startContent={<UserIcon className="w-3 h-3" />}>
                    {username}
                  </Chip>
                  <Button
                    color="danger"
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    startContent={<ArrowRightOnRectangleIcon className="w-4 h-4" />}
                  >
                    ออกจากระบบ
                  </Button>
                </>
              ) : (
                <Link href="/login">
                  <Button color="primary" variant="solid" startContent={<UserIcon className="w-4 h-4" />}>
                    เข้าสู่ระบบ
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-8xl font-bold terminal-text mb-8">
            SOON
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            CTF Platform กำลังจะเปิดให้บริการ
          </p>
          
          {isLoggedIn ? (
            <div className="mt-8">
              <p className="text-htb-green text-lg mb-4">
                ยินดีต้อนรับ {username}
              </p>
              <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-htb-green rounded-full animate-pulse"></div>
                <span>ระบบพร้อมใช้งาน</span>
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <Link href="/login">
                <Button
                  color="primary"
                  size="lg"
                  className="htb-gradient text-htb-dark font-semibold"
                  startContent={<UserIcon className="w-5 h-5" />}
                >
                  เข้าสู่ระบบ
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
