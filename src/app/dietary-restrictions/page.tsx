import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DietaryRestrictionsPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/signin')
  }

  return <div>Hello america</div>
}
