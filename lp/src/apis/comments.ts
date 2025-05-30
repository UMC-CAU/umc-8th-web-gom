import { RequestCommentDto, ResponseCommentDto, ResponseCommentListDto } from '../types/comments'
import { PaginationDto } from '../types/common'
import { axiosInstance } from './axios'

export const getCommentList = async (lpId: string, paginationDto: PaginationDto): Promise<ResponseCommentListDto> => {
    const { data } = await axiosInstance.get(`v1/lps/${lpId}/comments`, {
        params: paginationDto,
    })
    return data
}

export const postComment = async ({ lpId, content }: RequestCommentDto): Promise<ResponseCommentDto> => {
    const { data } = await axiosInstance.post(`v1/lps/${lpId}/comments`, { content })
    return data
}
