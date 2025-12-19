import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { Session } from '@/types/auth'

interface JwtPayload {
  sub: string
  email: string
  name: string
}

const JWT_SECRET = process.env.JWT_SECRET!

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) return null

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload

    return {
      user: {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
      },
    }
  } catch {
    return null
  }
}
