'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { signIn } from './action'
import { ISchema, schema } from './schema'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message')

  const form = useForm<ISchema>({
    resolver: valibotResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: ISchema) {
    const result = await signIn(data)
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Sing In</CardTitle>
          <CardDescription>
            Use your email below to login your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {message && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {message}
            </div>
          )}

          <Form {...form}>
            <form
              action={signIn}
              onSubmit={form.handleSubmit(onSubmit)}
              id="login-form"
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="contact@example.com"
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="*******"
                        type="password"
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="grid gap-2">
          <Button
            className="w-full"
            type="submit"
            form="login-form"
            disabled={form.formState.isSubmitting}
          >
            Sign In
          </Button>

          <p className="text-center">
            don&apos;t have account?{' '}
            <Link
              href="/signup"
              className={cn(buttonVariants({ variant: 'link' }), 'p-0')}
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
