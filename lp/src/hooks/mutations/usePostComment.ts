import { useMutation } from '@tanstack/react-query'
import { postComment } from '../../apis/comments'
import queryClient from '../../libs/queryClient'
import { QUERY_KEY } from '../../constants/key'

export default function usePostComment() {
    return useMutation({
        mutationFn: postComment,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.comments, data.data.lpId],
                exact: false,
            })
        },
    })
}
