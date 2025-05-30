import { X } from 'lucide-react'
import ImageUploader from '../../components/imageuploader'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import TagInput from './taginput'
import usePostLp from '../../hooks/mutations/usePostLp'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
    title: z.string(),
    content: z.string(),
    thumbnail: z.string(),
    tags: z.array(z.string()),
    published: z.boolean(),
})

export type NewLpFormFields = z.infer<typeof schema>

interface AddLpModalProps {
    setIsModalOpen: (value: boolean) => void
}

const AddLpModal = ({ setIsModalOpen }: AddLpModalProps) => {
    const navigate = useNavigate()
    const { register, handleSubmit, setValue, watch } = useForm<NewLpFormFields>({
        defaultValues: {
            title: '',
            content: '',
            thumbnail: '',
            tags: [],
            published: true,
        },
        resolver: zodResolver(schema),
    })

    const { mutate: postMutate } = usePostLp()

    const onSubmit: SubmitHandler<NewLpFormFields> = (data) => {
        postMutate(data)
        setIsModalOpen(false)
        navigate('/my')
    }

    const preview = watch('thumbnail')
    const setPreview = (val: string) => setValue('thumbnail', val ?? '')

    const tags = watch('tags')

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-rose-200/30">
            <div className="relative md:ml-72 min-w-sm w-1/3 p-5 border border-gray-400 bg-gray-100">
                <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 cursor-pointer">
                    <X />
                </button>
                <h3>Add new LP</h3>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center space-y-3">
                    <ImageUploader preview={preview} setPreview={setPreview} />

                    {/* title */}
                    <input {...register('title')} placeholder="title" className="input-box" />
                    {/* content */}
                    <textarea
                        {...register('content')}
                        placeholder="content"
                        className="input-box rounded-3xl h-28 resize-none"
                    />
                    {/* tags */}
                    <TagInput tags={tags} setValue={setValue} />

                    <button
                        type="submit"
                        className="btn w-full mt-3 py-1 border-none duration-500 bg-rose-200 hover:bg-rose-300"
                    >
                        생성하기
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddLpModal
