"use client"

import type React from "react"

import Image from 'next/image';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useRef, useTransition } from "react"
import { useRouter } from "next/navigation"
import { registerAction } from "./actions"
import ReCAPTCHA from "react-google-recaptcha"
import Swal from "sweetalert2"
import { Eye, EyeOff } from "lucide-react"

export default function RegisterPage() {
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")
  const [passwordMatchError, setPasswordMatchError] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPasswordMatchError(false)

    if (password !== rePassword) {
      setPasswordMatchError(true)
      return
    }

    // Disable ReCAPTCHA check for now
    // if (!recaptchaToken) {
    //   Swal.fire({
    //     icon: "warning",
    //     title: "Verifikasi Diperlukan",
    //     text: "Harap selesaikan verifikasi reCAPTCHA terlebih dahulu.",
    //     confirmButtonColor: "#007bff",
    //   })
    //   return
    // }

    const formData = new FormData(e.currentTarget)
    // formData.append("recaptcha-token", recaptchaToken)
    formData.append("recaptcha-token", "disabled") // Dummy token

    startTransition(async () => {
      try {
        const result = await registerAction(null, formData)

        // Reset reCAPTCHA after submission
        // if (recaptchaRef.current) {
        //   recaptchaRef.current.reset()
        //   setRecaptchaToken(null)
        // }

        // Handle success with SweetAlert2
        if (result.success) {
          await Swal.fire({
            icon: "success",
            title: "Pendaftaran Berhasil!",
            text: "Akun Anda telah berhasil dibuat. Silakan login untuk melanjutkan.",
            confirmButtonText: "Login Sekarang",
            confirmButtonColor: "#007bff",
            allowOutsideClick: false,
            allowEscapeKey: false,
          })
          router.push("/login")
        } else {
          // Handle error with SweetAlert2
          Swal.fire({
            icon: "error",
            title: "Pendaftaran Gagal",
            text: result.message,
            confirmButtonColor: "#007bff",
          })
        }
      } catch (error) {
        console.error("Registration error:", error)
        Swal.fire({
          icon: "error",
          title: "Terjadi Kesalahan",
          text: "Terjadi kesalahan yang tidak terduga. Silakan coba lagi.",
          confirmButtonColor: "#007bff",
        })
      }
    })
  }

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token)
  }

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleRePasswordVisibility = () => {
    setShowRePassword(!showRePassword)
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="space-y-1 text-center">
          <CardTitle style={{ fontFamily: "Poppins, sans-serif" }} className="text-2xl font-bold">Daftar Akun Baru</CardTitle>
          <CardDescription>Buat akun MersifLab Anda untuk memulai.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegisterSubmit} className="grid gap-4" style={{ fontFamily: "Inter, sans-serif" }}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="nama@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" type="text" placeholder="Masukkan username" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="re-password">Ulangi Password</Label>
              <div className="relative">
                <Input
                  id="re-password"
                  name="re-password"
                  type={showRePassword ? "text" : "password"}
                  required
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={toggleRePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showRePassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {passwordMatchError && <p className="text-sm text-red-600">Password tidak cocok.</p>}
            </div>

            {/* Google ReCAPTCHA - Disabled for now */}
            {/* <div className="flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                onChange={handleRecaptchaChange}
                onExpired={handleRecaptchaExpired}
              />
            </div> */}

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full"
              disabled={isPending}
              style={{ backgroundColor: "#007bff" }}
            >
              {isPending ? "Mendaftar..." : "Daftar"}
            </Button>
          </form>
          
          <div style={{ fontFamily: "Inter, sans-serif" }} className="mt-4 text-center text-sm">
            Sudah punya akun?{" "}
            <Link href="/login" className="underline text-[#007bff]">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}