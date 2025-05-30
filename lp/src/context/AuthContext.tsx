import { createContext } from 'react'
import { RequestSigninDto } from '../types/auth'

export type AuthContextType = {
    accessToken: string | null
    refreshToken: string | null
    login: (signinData: RequestSigninDto) => Promise<void>
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async () => {},
})
