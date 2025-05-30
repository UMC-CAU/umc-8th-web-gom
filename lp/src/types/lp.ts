import { CommonResponse, CursorBasedResponse } from './common'

export type Tag = {
    id: number
    name: string
}

export type Like = {
    id: number
    userId: number
    lpId: number
}

export type Lp = {
    id: number
    title: string
    content: string
    thumbnail: string
    published: boolean
    authorId: number
    createdAt: Date
    updatedAt: Date
    tags: Tag[]
    likes: Like[]
}

export type ResponseLpListDto = CursorBasedResponse<Lp[]>

export type RequestLpDto = {
    lpId: number
}

export type Author = {
    id: number
    name: string
    email: string
    bio?: string
    avatar?: string
    createdAt: Date
    updatedAt: Date
}

export type ResponseLpDetailDto = CommonResponse<
    Lp & {
        author: Author
    }
>

export type NewLp = {
    id: number
    title: string
    content: string
    thumbnail: string
    published: boolean
    authorId: number
    createdAt: Date
    updatedAt: Date
}

export type ResponseNewLpDto = CommonResponse<NewLp>
