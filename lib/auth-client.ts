export type AuthResult = { ok: true } | { ok: false; message: string }

/**
 * Supabase Auth integration point.
 * Replace these bodies with `supabase.auth.signInWithPassword`, `signUp`
 * and `signInWithOAuth({ provider: 'google' })` once Supabase is connected.
 */
const notConnected: AuthResult = {
  ok: false,
  message: 'Supabase Auth is not connected yet. Use "Explore the demo" to look around.',
}

export async function signInWithEmail(_email: string, _password: string): Promise<AuthResult> {
  return notConnected
}

export async function signUpWithEmail(_name: string, _email: string, _password: string): Promise<AuthResult> {
  return notConnected
}

export async function signInWithGoogle(): Promise<AuthResult> {
  return notConnected
}
