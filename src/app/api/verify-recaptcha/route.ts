import { NextRequest, NextResponse } from 'next/server'
import { verifyRecaptcha } from '@/lib/recaptcha'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token tidak ditemukan' },
        { status: 400 }
      )
    }

    const verification = await verifyRecaptcha(token)

    if (!verification.success) {
      return NextResponse.json(
        { success: false, error: 'Verifikasi reCAPTCHA gagal', details: verification['error-codes'] },
        { status: 400 }
      )
    }

    // reCAPTCHA v3 memberikan score 0.0 - 1.0
    // Score tinggi = kemungkinan manusia, score rendah = kemungkinan bot
    const minScore = 0.5
    if (verification.score && verification.score < minScore) {
      return NextResponse.json(
        { success: false, error: 'Score reCAPTCHA terlalu rendah', score: verification.score },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      score: verification.score,
      message: 'Verifikasi reCAPTCHA berhasil'
    })
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error)
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan internal' },
      { status: 500 }
    )
  }
}