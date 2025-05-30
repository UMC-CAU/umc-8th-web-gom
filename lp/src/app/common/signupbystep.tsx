import { PageLabel } from './_components/label'
import { GoogleSignIn } from './_components/google'
import { Divider } from './_components/divider'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { postSignup } from '../../apis/auth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FormInputWithBtn } from './_components/input-wbtn'

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
    const [step, setStep] = useState(1)
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
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

    const handleNext = () => setStep((prev) => prev + 1)
    const handleBack = () => setStep((prev) => prev - 1)

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordCheck, ...rest } = data

        try {
            await postSignup(rest)
            navigate('/signin')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <section className="flex flex-col justify-center items-center space-y-5 w-[350px]">
            <PageLabel label="회원 가입" />

            {/* Google login */}
            {step === 1 && <GoogleSignIn />}
            <Divider />

            {/* email login */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-2">
                {step > 0 && (
                    <FormInputWithBtn
                        type="email"
                        placeholder="이메일을 입력해주세요."
                        register={register('email')}
                        errorMessage={errors.email?.message}
                        readOnly={step !== 1}
                        touched={touchedFields.email}
                        step={1}
                        handleNext={handleNext}
                    />
                )}

                {step > 1 && (
                    <FormInputWithBtn
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                        register={register('password')}
                        errorMessage={errors.password?.message}
                        readOnly={step !== 2}
                        touched={touchedFields.password}
                        step={2}
                        handleNext={handleNext}
                        handleBack={handleBack}
                    />
                )}

                {step > 2 && (
                    <FormInputWithBtn
                        type="password"
                        placeholder="비밀번호를 다시 입력해주세요."
                        register={register('passwordCheck')}
                        errorMessage={errors.passwordCheck?.message}
                        readOnly={step !== 3}
                        touched={touchedFields.passwordCheck}
                        step={3}
                        handleNext={handleNext}
                        handleBack={handleBack}
                    />
                )}

                {step > 3 && (
                    <FormInputWithBtn
                        type="name"
                        placeholder="이름을 입력해주세요."
                        register={register('name')}
                        errorMessage={errors.name?.message}
                        readOnly={step !== 4}
                        touched={touchedFields.name}
                        step={4}
                        handleNext={handleNext}
                        handleBack={handleBack}
                    />
                )}
            </form>
        </section>
    )
}
