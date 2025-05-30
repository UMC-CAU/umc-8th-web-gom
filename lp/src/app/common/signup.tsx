import { PageLabel } from './_components/label'
import { GoogleSignIn } from './_components/google'
import { Divider } from './_components/divider'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { postSignup } from '../../apis/auth'
import { useNavigate } from 'react-router-dom'

const schema = z
    .object({
        email: z.string().email({ message: '올바른 이메일 형식이 아닙니다.' }),
        password: z
            .string()
            .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
            .max(20, { message: '비밀번호는 20자 이하여야 합니다.' }),
        passwordCheck: z
            .string()
            .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
            .max(20, { message: '비밀번호는 20자 이하여야 합니다.' }),
        name: z.string().min(1, { message: '이름을 입력해주세요.' }),
    })
    .refine((data) => data.password === data.passwordCheck, {
        message: '비밀번호가 일치하지 않습니다.',
        path: ['passwordCheck'],
    })

type FormFields = z.infer<typeof schema>

export default function SignUpPage() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormFields>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            passwordCheck: '',
        },
        resolver: zodResolver(schema),
        mode: 'onBlur', // touched 속성 효과
    })

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordCheck, ...rest } = data

        try {
            const response = await postSignup(rest)
            console.log(response)
            navigate('/signin')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <section className="flex flex-col justify-center items-center space-y-5 w-[350px]">
            <PageLabel label="회원 가입" />

            {/* Google login */}
            <GoogleSignIn />
            <Divider />

            {/* email login */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
                <input {...register('email')} type="email" placeholder="이메일을 입력해주세요." className="input-box" />
                {errors.email && <div className="-mt-3 text-end text-red-500 text-sm">{errors.email.message}</div>}

                <input
                    {...register('password')}
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    className="input-box"
                />
                {errors.password && (
                    <div className="-mt-3 text-end text-red-500 text-sm">{errors.password.message}</div>
                )}

                <input
                    {...register('passwordCheck')}
                    type="password"
                    placeholder="비밀번호를 다시 입력해주세요."
                    className="input-box"
                />
                {errors.passwordCheck && (
                    <div className="-mt-3 text-end text-red-500 text-sm">{errors.passwordCheck.message}</div>
                )}

                <input {...register('name')} type="name" placeholder="이름을 입력해주세요." className="input-box" />
                {errors.name && <div className="-mt-3 text-end text-red-500 text-sm">{errors.name.message}</div>}

                {/* <button className="w-full btn p-1 border-none bg-gray-200 hover:bg-gray-300">다음</button> */}
                <button
                    disabled={!isValid}
                    type="submit"
                    className="w-full btn p-1 border-none bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                    가입하기
                </button>
            </form>
        </section>
    )
}
