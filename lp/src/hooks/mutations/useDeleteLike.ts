import { useMutation } from '@tanstack/react-query'
import { deleteLike } from '../../apis/likes'
import queryClient from '../../libs/queryClient'
import { QUERY_KEY } from '../../constants/key'

export default function useDeleteLike() {
    return useMutation({
        mutationFn: deleteLike,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps, data.data.lpId],
                exact: true,
            })
        },
    })
}
