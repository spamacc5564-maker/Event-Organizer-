import type { Metadata } from 'next'
import { AuthForm } from '@/components/auth/auth-form'
import { AuthShell } from '@/components/auth/auth-shell'

export const metadata: Metadata = { title: 'Sign up' }

export default function SignupPage() {
  return (
    <AuthShell title="Start your first sidequest" subtitle="Free forever. Takes less than a minute.">
      <AuthForm mode="signup" />
    </AuthShell>
  )
}
