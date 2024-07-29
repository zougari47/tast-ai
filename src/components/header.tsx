import Link from 'next/link'
import AuthButton from './auth-btn'

export function Header() {
  return (
    <div className="container p-4 bg-primary/10 flex jusitify-between items-center">
      <AuthButton />
    </div>
  )
}
