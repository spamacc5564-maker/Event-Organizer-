'use client'

import Link from 'next/link'
import { useState, useTransition } from 'react'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signInWithEmail, signInWithGoogle, signUpWithEmail, type AuthResult } from '@/lib/auth-client'
import { cn } from '@/lib/utils'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.94l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.96 10.96 0 0 0 12 1 11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  )
}

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const isSignup = mode === 'signup'

  function handle(result: AuthResult) {
    if (!result.ok) {
      setError(result.message)
      toast.error(result.message)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Button
        type="button"
        variant="outline"
        size="xl"
        className="w-full font-semibold"
        disabled={pending}
        onClick={() => startTransition(async () => handle(await signInWithGoogle()))}
      >
        <GoogleIcon />
        Continue with Google
      </Button>

      <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or with email
        <span className="h-px flex-1 bg-border" />
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          setError(null)
          const data = new FormData(e.currentTarget)
          const email = String(data.get('email') ?? '')
          const password = String(data.get('password') ?? '')
          const name = String(data.get('name') ?? '')
          startTransition(async () =>
            handle(isSignup ? await signUpWithEmail(name, email, password) : await signInWithEmail(email, password)),
          )
        }}
      >
        {isSignup && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">First name</Label>
            <Input id="name" name="name" autoComplete="given-name" required placeholder="Maya" className="h-12 rounded-xl px-4 text-base" />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required placeholder="you@email.com" className="h-12 rounded-xl px-4 text-base" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {!isSignup && (
              <a href="#" className="text-sm font-semibold text-primary hover:underline">
                Forgot?
              </a>
            )}
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete={isSignup ? 'new-password' : 'current-password'}
            required
            minLength={8}
            placeholder="At least 8 characters"
            className="h-12 rounded-xl px-4 text-base"
          />
        </div>
        {error && (
          <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
            {error}
          </p>
        )}
        <Button type="submit" variant="cta" size="xl" className="w-full" disabled={pending}>
          {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {isSignup ? 'Create my account' : 'Log in'}
        </Button>
      </form>

      <Link
        href={isSignup ? '/onboarding' : '/home'}
        className={cn(buttonVariants({ variant: 'ghost', size: 'pill' }), 'self-center font-semibold')}
      >
        Explore the demo instead
      </Link>

      <p className="text-center text-sm text-muted-foreground">
        {isSignup ? 'Already have an account? ' : 'New to Sidequest? '}
        <Link href={isSignup ? '/login' : '/signup'} className="font-bold text-primary hover:underline">
          {isSignup ? 'Log in' : 'Sign up free'}
        </Link>
      </p>
    </div>
  )
}
