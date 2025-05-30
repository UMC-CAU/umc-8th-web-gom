import { CommonResponse, CursorBasedResponse } from './common'

export type Author = {
    id: number
    name: string
    email: string
    bio?: string
    avatar?: string
    createdAt: Date
    updatedAt: Date
}

export type Comment = {
    id: number
    content: string
    lpId: number
    authorId: number
    createdAt: Date
    updatedAt: Date
}

export type ResponseCommentListDto = CursorBasedResponse<(Comment & { author: Author })[]>

export type RequestCommentDto = {
    lpId: number
    content: string
}

export type ResponseCommentDto = CommonResponse<Comment>
