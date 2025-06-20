import {
    RepsonseMyInfoDto,
    RequestSignupDto,
    ResponseSigninDto,
    ResponseSignoutDto,
    ResponseSignupDto,
    RequestSigninDto,
} from '../types/auth'
import { axiosInstance } from './axios'

export const postSignup = async (body: RequestSignupDto): Promise<ResponseSignupDto> => {
    const { data } = await axiosInstance.post('/v1/auth/signup', body)

    return data
}

export const postSignin = async (body: RequestSigninDto): Promise<ResponseSigninDto> => {
    const { data } = await axiosInstance.post('/v1/auth/signin', body)

    return data
}

export const getMyInfo = async (): Promise<RepsonseMyInfoDto> => {
    const { data } = await axiosInstance.get('/v1/users/me')

    return data
}

export const postSignout = async (): Promise<ResponseSignoutDto> => {
    const { data } = await axiosInstance.post('/v1/auth/signout')

    return data
}
