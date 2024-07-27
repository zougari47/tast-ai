'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ISchema, schema } from './schema'
import * as v from 'valibot'
import { headers } from 'next/headers'

export const signUp = async (data: ISchema | FormData) => {
  let [email, password] = ['', '']
  const origin = headers().get('origin')

  if (data instanceof FormData) {
    email = data.get('email') as string
    password = data.get('password') as string
  } else {
    email = data.email
    password = data.password
  }

  // Backend validation
  const result = v.safeParse(schema, { email, password })
  if (!result.success) {
    return redirect(`/signup?message=${result.issues[0].message}`)
  }

  const supabase = createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    return redirect('/signup?message=Could not create user')
  }

  return redirect('/signup?success=Check email to continue sign in process')
}
