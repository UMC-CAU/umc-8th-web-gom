import { useInfiniteQuery } from '@tanstack/react-query'
import { QUERY_KEY } from '../../constants/key'
import { PAGINATION_ORDER } from '../../enums/common'
import { getMyCreatedLpList } from '../../apis/my'
import { ResponseLpListDto } from '../../types/lp'
import { MY_LP_TYPE } from '../../enums/my'

export default function useGetInfiniteMyCreatedLpList({
    limit,
    search,
    order,
}: {
    limit?: number
    search?: string
    order?: PAGINATION_ORDER
}) {
    return useInfiniteQuery({
        queryKey: [QUERY_KEY.lps, QUERY_KEY.me, MY_LP_TYPE.created, search, order],
        queryFn: ({ pageParam }) => getMyCreatedLpList({ cursor: pageParam, limit, search, order }),
        initialPageParam: 0,
        getNextPageParam: (lastPage: ResponseLpListDto) => {
            return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined
        },
    })
}
