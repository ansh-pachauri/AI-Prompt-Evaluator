import { createClient } from "@/src/lib/supabase/server"

export default async function LogedInState() {
  const supabase =await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <div>Hello {user?.email}</div>
}