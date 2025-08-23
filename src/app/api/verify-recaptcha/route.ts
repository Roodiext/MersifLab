// src/app/api/verify-recaptcha/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { verifyRecaptcha, isRecaptchaValid, getRecaptchaErrorMessage } from '@/lib/recaptcha';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    // Validasi input
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'reCAPTCHA token is required' },
        { status: 400 }
      );
    }

    // Ambil secret key dari environment variable
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY is not set in environment variables');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Verifikasi reCAPTCHA dengan Google
    const recaptchaResponse = await verifyRecaptcha(token, secretKey);

    // Validasi hasil
    const isValid = isRecaptchaValid(recaptchaResponse);

    if (isValid) {
      return NextResponse.json({
        success: true,
        message: 'reCAPTCHA verified successfully',
        score: recaptchaResponse.score, // Untuk reCAPTCHA v3
      });
    } else {
      const errorMessage = getRecaptchaErrorMessage(recaptchaResponse);
      return NextResponse.json(
        {
          success: false,
          error: 'reCAPTCHA verification failed',
          details: errorMessage,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error in reCAPTCHA verification:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Jika Anda ingin menambahkan method GET untuk testing
export async function GET() {
  return NextResponse.json({
    message: 'reCAPTCHA verification endpoint',
    methods: ['POST'],
  });
}