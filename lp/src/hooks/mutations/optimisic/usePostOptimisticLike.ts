import { useMutation } from '@tanstack/react-query'
import { postLike } from '../../../apis/likes'
import queryClient from '../../../libs/queryClient'
import { QUERY_KEY } from '../../../constants/key'
import { Like, ResponseLpDetailDto } from '../../../types/lp'
import { RepsonseMyInfoDto } from '../../../types/auth'

export default function usePostLike() {
    return useMutation({
        mutationFn: postLike,
        onMutate: async (lp) => {
            await queryClient.cancelQueries({
                queryKey: [QUERY_KEY.lps, lp.lpId],
            })

            const previousLpPost = queryClient.getQueryData<ResponseLpDetailDto>([QUERY_KEY.lps, lp.lpId])
            const newLpPost = { ...previousLpPost }

            const me = queryClient.getQueryData<RepsonseMyInfoDto>([QUERY_KEY.me])
            const userId = Number(me?.data.id)

            const likedIndex = previousLpPost?.data.likes.findIndex((like) => like.userId === userId) ?? -1

            if (likedIndex >= 0) {
                previousLpPost?.data.likes.splice(likedIndex, 1)
            } else {
                const newLike = { userId, lpId: lp.lpId } as Like
                previousLpPost?.data.likes.push(newLike)
            }

            queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost)

            return { previousLpPost, newLpPost }
        },
        onError: (err, newLp, context) => {
            console.log(err, newLp)
            queryClient.setQueryData([QUERY_KEY.lps, newLp.lpId], context?.previousLpPost)
        },
        onSettled: async (_, __, variables) => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps, variables.lpId],
            })
        },
    })
}
