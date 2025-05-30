import { useState, PropsWithChildren } from 'react'
import { AuthContext } from './AuthContext'
import { LOCAL_STORAGE_KEY } from '../constants/key'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { postSignin, postSignout } from '../apis/auth'
import { RequestSigninDto } from '../types/auth'

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const {
        getItem: getAccessTokenFromStorage,
        setItem: setAccessTokenInStorage,
        removeItem: removeAccessTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken)

    const {
        getItem: getRefreshTokenFromStorage,
        setItem: setRefreshTokenInStorage,
        removeItem: removeRefreshTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken)

    const [accessToken, setAccessToken] = useState<string | null>(
        getAccessTokenFromStorage() // 지연 초기화  lazy initialization
    )
    const [refreshToken, setRefreshToken] = useState<string | null>(
        getRefreshTokenFromStorage() // 지연 초기화  lazy initialization
    )

    const login = async (signinData: RequestSigninDto) => {
        try {
            const { data } = await postSignin(signinData)

            if (data) {
                const newAccessToken = data.accessToken
                const newRefreshToken = data.refreshToken

                setAccessTokenInStorage(newAccessToken)
                setRefreshTokenInStorage(newRefreshToken)

                setAccessToken(newAccessToken)
                setRefreshToken(newRefreshToken)

                alert('로그인 성공')
            }
        } catch (error) {
            console.error('로그인 오류', error)
        }
    }

    const logout = async () => {
        try {
            await postSignout()

            removeAccessTokenFromStorage()
            removeRefreshTokenFromStorage()

            alert('로그아웃 성공')
        } catch (error) {
            console.error('로그아웃 오류', error)
        }
    }

    return <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>{children}</AuthContext.Provider>
}
