import { ResponseUploadImageDto } from '../types/common'
import { axiosInstance } from './axios'

export const postImage = async (body: BodyInit): Promise<ResponseUploadImageDto> => {
    const { data } = await axiosInstance.post(`/v1/uploads`, body)
    return data
}
