import { PageLabel } from './_components/label'
import { GoogleSignIn } from './_components/google'
import { Divider } from './_components/divider'
import { useForm } from '../../hooks/useForm'
import { UserSigninInformation, validateSignin } from '../../utils/validate'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function SignInPage() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
        initialValue: { email: '', password: '' },
        validate: validateSignin,
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await login(values)
        navigate('/')
    }

    const isDisabled =
        Object.values(errors || {}).some((error) => error.length > 0) || // 오류가 있으면 true
        Object.values(values).some((value) => value === '') // 입력값이 공백이면 true

    return (
        <section className="flex flex-col justify-center items-center space-y-5 w-1/2 lg:w-1/4">
            <PageLabel label="로그인" />

            {/* Google login */}
            <GoogleSignIn />
            <Divider />

            {/* email login */}
            <form onSubmit={handleSubmit} className="w-full space-y-3">
                <input
                    {...getInputProps('email')}
                    type="email"
                    placeholder="이메일을 입력해주세요!"
                    className="input-box"
                />
                {errors?.email && touched?.email && (
                    <div className="-mt-3 text-red-500 text-sm text-end">{errors.email}</div>
                )}

                <input
                    {...getInputProps('password')}
                    type="password"
                    placeholder="비밀번호를 입력해주세요!"
                    className="input-box"
                />
                {errors?.password && touched?.password && (
                    <div className="-mt-3 text-red-500 text-sm text-end">{errors.password}</div>
                )}

                <button
                    type="submit"
                    disabled={isDisabled}
                    className="w-full btn p-1 border-none bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-default"
                >
                    로그인
                </button>
            </form>
        </section>
    )
}
