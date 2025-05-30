import { PaginationDto } from '../types/common'
import { ResponseLpListDto } from '../types/lp'
import { axiosInstance } from './axios'

export const getMyCreatedLpList = async (paginationDto: PaginationDto): Promise<ResponseLpListDto> => {
    const { data } = await axiosInstance.get(`v1/lps/user`, {
        params: paginationDto,
    })
    return data
}

export const getMyLikedLpList = async (paginationDto: PaginationDto): Promise<ResponseLpListDto> => {
    const { data } = await axiosInstance.get(`v1/lps/likes/me`, {
        params: paginationDto,
    })
    return data
}
