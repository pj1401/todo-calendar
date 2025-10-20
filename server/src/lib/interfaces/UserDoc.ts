export interface UserDoc {
  id: string
  createdAt: Date
  updatedAt: Date
  email: string
  emailVerified: boolean
  name: string
  image?: string | null | undefined
  username?: string | null | undefined
  displayUsername?: string | null | undefined
}
