import { useMutation } from '@tanstack/react-query'
import { postLp } from '../../apis/lp'
import queryClient from '../../libs/queryClient'
import { QUERY_KEY } from '../../constants/key'

export default function usePostLp() {
    return useMutation({
        mutationFn: postLp,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps],
            })
        },
    })
}
