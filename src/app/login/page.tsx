"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import Image from 'next/image';
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email: formData.identifier, // Kirim sebagai email field
        password: formData.password,
        redirect: false,
      })

      console.log('SignIn result:', result) // Debug log

      if (result?.error) {
        console.error('Login error:', result.error)
        toast.error('Login gagal. Periksa email/username dan password Anda.')
      } else {
        toast.success('Login berhasil!')
        
        // Get session to check user role
        const session = await getSession()
        console.log('Session after login:', session) // Debug log
        
        // Redirect based on role or callback URL
        if (session?.user?.role === 'admin') {
          router.push('/admin/dashboard')
        } else {
          router.push(callbackUrl)
        }
      }
    } catch (error) {
      console.error('Login catch error:', error)
      toast.error('Terjadi kesalahan saat login')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-6 relative overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #00A2E1 0%, transparent 70%)' }}></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-8" style={{ background: 'radial-gradient(circle, #00A2E1 0%, transparent 70%)' }}></div>
      
      <div className="w-full max-w-md relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
  <div className="flex items-center justify-center gap-2">
    <Image 
      src="/img/logomersiflab.png" 
      alt="MersifLab Logo" 
      width={120} 
      height={30} 
    />
  </div>
</div>


        {/* Login Card */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900">Masuk ke Akun Anda</CardTitle>
            <CardDescription className="text-gray-600">
              Masukkan email atau username dan password untuk melanjutkan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="identifier" className="text-gray-700 font-medium">Email atau Username</Label>
                <Input
                  id="identifier"
                  name="identifier"
                  type="text"
                  placeholder="Masukkan email atau username"
                  value={formData.identifier}
                  onChange={handleChange}
                  required
                  className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                disabled={loading}
              >
                {loading ? 'Memproses...' : 'Masuk'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Belum punya akun?{" "}
                <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                  Daftar di sini
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}