import { UseFormRegisterReturn } from 'react-hook-form'

interface FormInputProps {
    type: string
    placeholder: string
    register: UseFormRegisterReturn
    errorMessage?: string
    readOnly?: boolean
    touched?: boolean
    step?: number
    handleNext?: () => void
    handleBack?: () => void
}

export const FormInputWithBtn = ({
    type,
    placeholder,
    register,
    errorMessage,
    readOnly,
    touched,
    step,
    handleNext,
    handleBack,
}: FormInputProps) => {
    return (
        <>
            <input type={type} placeholder={placeholder} readOnly={readOnly} className="input-box" {...register} />
            {errorMessage && <div className="-mt-2 text-end text-red-500 text-sm">{errorMessage}</div>}

            <div className="flex flex-row space-x-1">
                {step !== 1 && !readOnly && (
                    <button
                        onClick={handleBack}
                        className="w-full btn p-1 border-none bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:border-gray-200 disabled:cursor-default"
                    >
                        이전
                    </button>
                )}

                {!readOnly && (
                    <button
                        onClick={handleNext}
                        disabled={!touched || errorMessage !== undefined}
                        className="w-full btn p-1 border-none bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:border-gray-200 disabled:cursor-default"
                    >
                        다음
                    </button>
                )}
            </div>
        </>
    )
}
