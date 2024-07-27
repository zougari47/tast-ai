'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import * as v from 'valibot'
import { ISchema, schema } from './schema'

export const signIn = async (data: ISchema | FormData) => {
  let [email, password] = ['', '']

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
    return redirect(`/signin?message=${result.issues[0].message}`)
  }

  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect('/signin?message=Could not authenticate user')
  }

  return redirect('/protected')
}
