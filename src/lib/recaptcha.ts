// src/lib/recaptcha.ts

export interface RecaptchaResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  score?: number;
  action?: string;
  'error-codes'?: string[];
}

/**
 * Verifikasi reCAPTCHA token dengan Google API
 * @param token - Token reCAPTCHA dari frontend
 * @param secretKey - Secret key dari Google reCAPTCHA (dari environment variable)
 * @returns Promise dengan hasil verifikasi
 */
export async function verifyRecaptcha(
  token: string,
  secretKey: string
): Promise<RecaptchaResponse> {
  const verifyURL = 'https://www.google.com/recaptcha/api/siteverify';
  
  const formData = new URLSearchParams();
  formData.append('secret', secretKey);
  formData.append('response', token);

  try {
    const response = await fetch(verifyURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: RecaptchaResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    throw new Error('Failed to verify reCAPTCHA');
  }
}

/**
 * Validasi hasil reCAPTCHA
 * @param recaptchaResponse - Response dari Google reCAPTCHA API
 * @param minScore - Minimum score untuk reCAPTCHA v3 (opsional, default: 0.5)
 * @returns boolean - true jika valid
 */
export function isRecaptchaValid(
  recaptchaResponse: RecaptchaResponse,
  minScore: number = 0.5
): boolean {
  // Cek apakah response sukses
  if (!recaptchaResponse.success) {
    return false;
  }

  // Untuk reCAPTCHA v3, cek score jika ada
  if (recaptchaResponse.score !== undefined) {
    return recaptchaResponse.score >= minScore;
  }

  // Untuk reCAPTCHA v2, cukup cek success saja
  return true;
}

/**
 * Get error message dari reCAPTCHA response
 * @param recaptchaResponse - Response dari Google reCAPTCHA API
 * @returns string - Error message
 */
export function getRecaptchaErrorMessage(recaptchaResponse: RecaptchaResponse): string {
  if (!recaptchaResponse['error-codes']) {
    return 'Unknown reCAPTCHA error';
  }

  const errorCode = recaptchaResponse['error-codes'][0];
  
  const errorMessages: { [key: string]: string } = {
    'missing-input-secret': 'The secret parameter is missing',
    'invalid-input-secret': 'The secret parameter is invalid or malformed',
    'missing-input-response': 'The response parameter is missing',
    'invalid-input-response': 'The response parameter is invalid or malformed',
    'bad-request': 'The request is invalid or malformed',
    'timeout-or-duplicate': 'The response is no longer valid: either is too old or has been used previously',
  };

  return errorMessages[errorCode] || `reCAPTCHA error: ${errorCode}`;
}