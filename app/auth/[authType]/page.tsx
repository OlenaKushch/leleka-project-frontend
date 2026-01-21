import { AuthPage } from './AuthPage'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: Promise<{ authType: string }> }) {
  const { authType } = await params
  if (authType !== 'login' && authType !== 'register') {
    notFound()
  }

  return <AuthPage authType={authType} />
}
