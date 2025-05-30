import { useInfiniteQuery } from '@tanstack/react-query'
import { getLpList } from '../../apis/lp'
import { PAGINATION_ORDER } from '../../enums/common'
import { QUERY_KEY } from '../../constants/key'
import { ResponseLpListDto } from '../../types/lp'

export default function useGetInfiniteLpList({
    limit,
    search,
    order,
}: {
    limit?: number
    search?: string
    order?: PAGINATION_ORDER
}) {
    return useInfiniteQuery({
        queryKey: [QUERY_KEY.lps, search, order],
        queryFn: ({ pageParam }) => getLpList({ cursor: pageParam, limit, search, order }),
        initialPageParam: 0,
        getNextPageParam: (lastPage: ResponseLpListDto) => {
            // console.log(lastPage, allPages)
            return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined
        },
    })
}
