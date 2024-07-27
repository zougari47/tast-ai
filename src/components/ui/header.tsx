import Link from 'next/link'

export function Header() {
  return (
    <div className="container p-4 bg-primary/10">
      <div className="flex justify-end gap-4 items-center">
        <Link href="/signup">Sing Up</Link>
        <Link href="/signin">Sing In</Link>
      </div>
    </div>
  )
}
