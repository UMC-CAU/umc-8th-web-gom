import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from '../../constants/key'
import { getMyInfo } from '../../apis/auth'

export default function useGetMyInfo(accessToken: string | null) {
    return useQuery({
        queryKey: [QUERY_KEY.me],
        queryFn: getMyInfo,
        staleTime: 1000 * 60 * 10, // 10분
        gcTime: 1000 * 60 * 15, // 15분
        select: (data) => data.data,
        enabled: !!accessToken,
    })
}
