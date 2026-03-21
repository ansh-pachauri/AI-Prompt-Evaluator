'use client'

import { createClient } from '@/lib/supabase/client'

export default function LogoutButton() {
  const supabase = createClient()

  const logout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return <button onClick={logout}>Logout</button>
}