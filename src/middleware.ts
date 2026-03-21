import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function middleware(req: any) {
  const res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            req.cookies.set(name, value)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isRoot = req.nextUrl.pathname === '/';
  const isDashboard = req.nextUrl.pathname.startsWith('/dashboard');

  // Unauthenticated user trying to access the app → send to login
  if (!user && isDashboard) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Authenticated user on the landing page → send straight to the app
  if (user && isRoot) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res
}