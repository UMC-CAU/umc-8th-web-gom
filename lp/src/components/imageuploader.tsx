import { FileImage } from 'lucide-react'
import usePostImage from '../hooks/mutations/usePostImage'

interface ImageUploaderProps {
    preview: string
    setPreview: (value: string) => void
}

const ImageUploader = ({ preview, setPreview }: ImageUploaderProps) => {
    const { mutateAsync: postImageMutate } = usePostImage()

    const uploadImageToServer = async (file: File): Promise<string> => {
        const formData = new FormData()
        formData.append('file', file)

        const { data } = await postImageMutate(formData)
        return data.imageUrl
    }

    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        try {
            const uploadedUrl = await uploadImageToServer(file)
            setPreview(uploadedUrl)
        } catch (error) {
            console.error('이미지 업로드 중 오류 발생:', error)
        }
    }

    return (
        <label className="flex justify-center items-center m-7 size-56 bg-gray-200 cursor-pointer">
            <input type="file" accept="image/*" onChange={handleUploadImage} className="hidden" />

            {preview && <img src={preview} alt="미리보기 이미지" className="w-full h-full object-cover" />}
            {!preview && <FileImage color="#A9A9A9" size={24} />}
        </label>
    )
}

export default ImageUploader
