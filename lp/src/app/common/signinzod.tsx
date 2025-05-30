import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { PageLabel } from './_components/label'
import { GoogleSignIn } from './_components/google'
import { Divider } from './_components/divider'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
    email: z.string().email({ message: '올바른 이메일 형식이 아닙니다.' }),
    password: z
        .string()
        .min(8, { message: '비밀번호는 8~20자 사이로 입력해주세요.' })
        .max(20, { message: '비밀번호는 8~20자 사이로 입력해주세요.' }),
})
type FormFields = z.infer<typeof schema>

export default function SignUpPage() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
    } = useForm<FormFields>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(schema),
        mode: 'onBlur',
    })

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        await login(data)
        navigate('/')
        window.location.reload()
    }

    return (
        <section className="flex flex-col justify-center items-center space-y-5 w-[350px]">
            <PageLabel label="로그인" />

            {/* Google login */}
            <GoogleSignIn />
            <Divider />

            {/* email login */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
                <input {...register('email')} type="email" placeholder="이메일을 입력해주세요!" className="input-box" />
                {errors.email && touchedFields.email && (
                    <div className="-mt-3 text-red-500 text-sm text-end">{errors.email.message}</div>
                )}

                <input
                    {...register('password')}
                    type="password"
                    placeholder="비밀번호를 입력해주세요!"
                    className="input-box"
                />
                {errors.password && touchedFields.password && (
                    <div className="-mt-3 text-red-500 text-sm text-end">{errors.password.message}</div>
                )}

                <button
                    type="submit"
                    // disabled={isDisabled}
                    className="w-full btn p-1 border-none bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-default"
                >
                    로그인
                </button>
            </form>
        </section>
    )
}
