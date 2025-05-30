import { useInfiniteQuery } from '@tanstack/react-query'
import { PAGINATION_ORDER } from '../../enums/common'
import { QUERY_KEY } from '../../constants/key'
import { getCommentList } from '../../apis/comments'
import { ResponseCommentListDto } from '../../types/comments'

export default function useGetInfiniteCommentList({
    lpId,
    limit,
    order,
}: {
    lpId: string
    limit?: number
    order?: PAGINATION_ORDER
}) {
    return useInfiniteQuery({
        queryKey: [QUERY_KEY.comments, lpId, order],
        queryFn: ({ pageParam }) => getCommentList(lpId, { cursor: pageParam, limit, order }),
        initialPageParam: 0,
        getNextPageParam: (lastPage: ResponseCommentListDto) => {
            return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined
        },
    })
}
