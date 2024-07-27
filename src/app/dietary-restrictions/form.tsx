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
import { cn } from '@/lib/utils'
import { valibotResolver } from '@hookform/resolvers/valibot'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { schema } from './schema'

interface ISchema {}

export function DietaryRestrictionsForm() {
  const form = useForm<ISchema>({
    resolver: valibotResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

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
