import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from '../../constants/key'
import { getLpDetail } from '../../apis/lp'
import { RequestLpDto } from '../../types/lp'

export default function useGetLpDetail({ lpId }: RequestLpDto) {
    return useQuery({
        queryKey: [QUERY_KEY.lps, lpId],
        queryFn: () => getLpDetail({ lpId }),
        staleTime: 1000 * 60 * 5, // 5분
        gcTime: 1000 * 60 * 10, // 10분
        enabled: !!lpId,
        select: (data) => data.data,
    })
}
