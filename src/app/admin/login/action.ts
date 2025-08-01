'use server'

import { redirect } from 'next/navigation'
// import your auth library here (NextAuth, etc.)

export async function logout() {
  // Clear session/cookies here
  // await signOut() // if using NextAuth
  redirect('/admin/login')
}