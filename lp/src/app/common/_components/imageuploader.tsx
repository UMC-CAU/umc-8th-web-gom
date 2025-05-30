import { CommonResponse } from '../../../types/common'
import axios from 'axios'

export type ResponseUploadImageDto = CommonResponse<{
    imageUrl: string
}>

export const ImageUploader = () => {
    const postProfile = async (file: File): Promise<ResponseUploadImageDto> => {
        const formData = new FormData()
        formData.append('file', file)

        console.log(formData)

        const { data } = await axios.post(`${import.meta.env.VITE_SERVER_API_URL}/v1/uploads`, formData)
        console.log(data)
        return data
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            const response = postProfile(file)
            console.log(response)
        }
    }

    return <input type="file" accept="image/*" onChange={handleFileChange} />
}
