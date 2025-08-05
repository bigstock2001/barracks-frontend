import { supabase } from './supabase'

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL && 
         process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co' &&
         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'placeholder-key'
}

export const authService = {
  // Sign up new user
  async signUp(email, password, userData = {}) {
    if (!isSupabaseConfigured()) {
      return { user: null, error: 'Authentication service not configured. Please set up Supabase credentials.' }
    }
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name,
            tier: userData.tier || 'free'
          }
        }
      })
      
      if (error) throw error
      return { user: data.user, error: null }
    } catch (error) {
      return { user: null, error: error.message }
    }
  },

  // Sign in user
  async signIn(email, password) {
    if (!isSupabaseConfigured()) {
      return { user: null, session: null, error: 'Authentication service not configured. Please set up Supabase credentials.' }
    }
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) throw error
      return { user: data.user, session: data.session, error: null }
    } catch (error) {
      return { user: null, session: null, error: error.message }
    }
  },

  // Sign out user
  async signOut() {
    if (!isSupabaseConfigured()) {
      return { error: 'Authentication service not configured.' }
    }
    
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error.message }
    }
  },

  // Get current user
  async getCurrentUser() {
    if (!isSupabaseConfigured()) {
      return { user: null, error: 'Authentication service not configured.' }
    }
    
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      return { user, error: null }
    } catch (error) {
      return { user: null, error: error.message }
    }
  },

  // Get current session
  async getCurrentSession() {
    if (!isSupabaseConfigured()) {
      return { session: null, error: 'Authentication service not configured.' }
    }
    
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      return { session, error: null }
    } catch (error) {
      return { session: null, error: error.message }
    }
  },

  // Listen to auth changes
  onAuthStateChange(callback) {
    if (!isSupabaseConfigured()) {
      // Return a mock subscription that does nothing
      return { data: { subscription: { unsubscribe: () => {} } } }
    }
    
    return supabase.auth.onAuthStateChange(callback)
  }
}