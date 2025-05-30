import { FcGoogle } from 'react-icons/fc'

const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_SERVER_API_URL + '/v1/auth/google/login'
}

export const GoogleSignIn = () => {
    return (
        <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn w-full grid grid-cols-8 items-center p-1 border-gray-500 hover:bg-gray-200"
        >
            <FcGoogle className="w-full" />
            <span className="col-span-6">구글 로그인</span>
        </button>
    )
}
