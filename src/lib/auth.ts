import { useState, useEffect } from 'react'
import type { User, Session, AuthError } from '@supabase/supabase-js'

import { supabase } from './supabase.ts'

//#region ----- Auth state -----

type AuthState = {
  user: User | null
  session: Session | null
}

// Global auth state
const authState: AuthState = {
  user: null,
  session: null,
}

// Derive signed-in status
export function isSignedIn(): boolean {
  return authState.user !== null && authState.session !== null
}

// Initialize auth state from Supabase session
export async function initAuth(): Promise<void> {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (session) {
    authState.user = session.user
    authState.session = session
    notifyListeners()
  }

  // Listen for auth state changes
  supabase.auth.onAuthStateChange((_event, session) => {
    authState.user = session?.user ?? null
    authState.session = session
    notifyListeners()
  })
}

// Subscribers for reactivity
type Listener = (state: AuthState) => void
const listeners = new Set<Listener>()

function notifyListeners() {
  listeners.forEach(listener => listener({ ...authState }))
}

function subscribe(listener: Listener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

//#region ----- Auth operations -----

async function login(email: string, password: string): Promise<AuthError | null> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return error
  authState.user = data.user
  authState.session = data.session
  notifyListeners()
  return null
}

async function signup(email: string, password: string): Promise<AuthError | null> {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) return error
  authState.user = data.user
  authState.session = data.session
  notifyListeners()
  return null
}

async function logout(): Promise<AuthError | null> {
  const { error } = await supabase.auth.signOut()
  if (error) return error
  authState.user = null
  authState.session = null
  notifyListeners()
  return null
}

//#region ----- Custom hook -----

export function useAuth() {
  const [state, setState] = useState<AuthState>({ ...authState })

  useEffect(() => {
    return subscribe(setState)
  }, [])

  return {
    user: state.user,
    session: state.session,
    isSignedIn,
    login,
    signup,
    logout,
  }
}
