import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import useGetUserInfo from '../../hooks/queries/useGetMyInfo'

export default function Navbar() {
    const { accessToken, logout } = useAuth()
    const { data: user } = useGetUserInfo(accessToken)

    const handleLogout = async () => {
        await logout()
        window.location.reload()
    }

    return (
        <header className="flex flex-row justify-between items-center w-full px-10 py-7 border-b border-gray-500 bg-gray-200">
            {/* left */}
            <Link to="/" className="text-2xl text-gray-800 font-bold">
                gom
            </Link>

            {/* right */}
            <div className="flex flex-row items-center space-x-2 text-sm whitespace-nowrap">
                {accessToken === null && (
                    <>
                        <Link to="/signin" className="btn px-3 py-1 border-none">
                            <span>로그인</span>
                        </Link>
                        <Link to="/signup" className="p-1 border-b">
                            <span className="p-1 transition duration-300 ease-in-out hover:bg-rose-300">
                                회원가입... 🏠
                            </span>
                        </Link>
                    </>
                )}

                {accessToken !== null && (
                    <>
                        <p>{user?.name}님 환영합니다!</p>
                        <button onClick={handleLogout} className="btn px-3 py-1 border-none">
                            로그아웃
                        </button>
                    </>
                )}
            </div>
        </header>
    )
}
