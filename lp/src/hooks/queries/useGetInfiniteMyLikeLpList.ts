import { useInfiniteQuery } from '@tanstack/react-query'
import { PAGINATION_ORDER } from '../../enums/common'
import { QUERY_KEY } from '../../constants/key'
import { MY_LP_TYPE } from '../../enums/my'
import { getMyLikedLpList } from '../../apis/my'
import { ResponseLpListDto } from '../../types/lp'

export const useGetInfiniteMyLikedLpList = ({
    limit,
    search,
    order,
}: {
    limit?: number
    search?: string
    order?: PAGINATION_ORDER
}) => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEY.lps, QUERY_KEY.me, MY_LP_TYPE.liked, search, order],
        queryFn: ({ pageParam }) => getMyLikedLpList({ cursor: pageParam, limit, search, order }),
        initialPageParam: 0,
        getNextPageParam: (lastPage: ResponseLpListDto) => {
            return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined
        },
    })
}
