import { NewLpFormFields } from '../app/add/modal'
import { PaginationDto } from '../types/common'
import { RequestLpDto, ResponseLpDetailDto, ResponseLpListDto, ResponseNewLpDto } from '../types/lp'
import { axiosInstance } from './axios'

export const getLpList = async (paginationDto: PaginationDto): Promise<ResponseLpListDto> => {
    const { data } = await axiosInstance.get(`/v1/lps`, {
        params: paginationDto,
    })
    return data
}

export const getLpDetail = async ({ lpId }: RequestLpDto): Promise<ResponseLpDetailDto> => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpId}`)
    return data
}

export const postLp = async (body: NewLpFormFields): Promise<ResponseNewLpDto> => {
    const { data } = await axiosInstance.post(`/v1/lps`, body)
    return data
}
