import { ResponseLikeLpDto } from '../types/likes'
import { RequestLpDto } from '../types/lp'
import { axiosInstance } from './axios'

export const postLike = async ({ lpId }: RequestLpDto): Promise<ResponseLikeLpDto> => {
    const { data } = await axiosInstance.post(`v1/lps/${lpId}/likes`)
    return data
}

export const deleteLike = async ({ lpId }: RequestLpDto): Promise<ResponseLikeLpDto> => {
    const { data } = await axiosInstance.delete(`v1/lps/${lpId}/likes`)
    return data
}
