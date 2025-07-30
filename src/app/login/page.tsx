"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState } from "react"
import { loginAction } from "./actions"

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null)

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
        
        /* Mencegah scroll pada halaman */
        html, body {
          overflow: hidden;
          height: 100vh;
          margin: 0;
          padding: 0;
        }
        
        /* Memastikan container utama mengisi seluruh viewport */
        #__next {
          height: 100vh;
          overflow: hidden;
        }
      `}</style>
      
      <div className="h-screen w-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-6 relative overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
        
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #00A2E1 0%, transparent 70%)' }}></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-8" style={{ background: 'radial-gradient(circle, #00A2E1 0%, transparent 70%)' }}></div>
        
        <div className="w-full max-w-md relative z-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-6xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              MersifLab
            </h1>
          </div>

          {/* Login Card */}
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="pb-4 pt-6">
              <CardTitle className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Masuk ke Akun
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pb-6">
              <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="identifier" className="text-sm font-medium text-gray-700">
                    Email atau Username
                  </Label>
                  <div className="relative">
                    <Input
                      id="identifier"
                      name="identifier"
                      type="text"
                      placeholder="Masukkan email atau username"
                      required
                      className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-200 text-sm bg-gray-50/50 hover:bg-white focus:bg-white"
                      style={{ '--tw-ring-color': '#00A2E1' }}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <Link 
                      href="#" 
                      className="text-sm font-medium hover:underline transition-all duration-200"
                      style={{ color: '#00A2E1' }}
                    >
                      Lupa password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input 
                      id="password" 
                      name="password" 
                      type="password" 
                      placeholder="Masukkan password"
                      required 
                      className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-200 text-sm bg-gray-50/50 hover:bg-white focus:bg-white"
                      style={{ '--tw-ring-color': '#00A2E1' }}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {state?.message && (
                  <div className={`text-sm p-3 rounded-xl border ${
                    state.success 
                      ? "bg-green-50 text-green-700 border-green-200" 
                      : "bg-red-50 text-red-700 border-red-200"
                  }`}>
                    {state.message}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full font-medium py-2.5 px-4 rounded-xl transition-all duration-200 text-sm shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  style={{ 
                    backgroundColor: '#00A2E1',
                    borderColor: '#00A2E1'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#0089c7'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#00A2E1'}
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Memproses...</span>
                    </div>
                  ) : (
                    "Log In"
                  )}
                </Button>
              </form>

              <div className="mt-5 text-center">
                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">atau</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600">
                  Belum memiliki akun?{" "}
                  <Link 
                    href="/register" 
                    className="font-medium hover:underline transition-all duration-200"
                    style={{ color: '#00A2E1' }}
                  >
                    Buat akun baru
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-4">
             <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} MersifLab. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  )
}