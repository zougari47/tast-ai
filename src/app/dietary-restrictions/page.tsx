import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DietaryRestrictionsForm } from './form'

export default async function DietaryRestrictionsPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/signin')
  }

  return (
    <div>
      <DietaryRestrictionsForm />
    </div>
  )
}
