import { useMutation } from '@tanstack/react-query'
import { deleteLike } from '../../../apis/likes'
import queryClient from '../../../libs/queryClient'
import { QUERY_KEY } from '../../../constants/key'
import { Like, ResponseLpDetailDto } from '../../../types/lp'
import { RepsonseMyInfoDto } from '../../../types/auth'

export default function useDeleteLike() {
    return useMutation({
        mutationFn: deleteLike,
        // onMutate: API 요청이 실행되기 직전에 실행
        // UI를 바로 변경하기 위해 Cache 업데이트
        onMutate: async (lp) => {
            // 1. 이 게시글에 관련된 쿼리를 취소 (캐시된 데이터를 새로 불러오는 요청)
            await queryClient.cancelQueries({
                queryKey: [QUERY_KEY.lps, lp.lpId],
            })

            // 2. 현재 게시글의 데이터를 캐시에서 가져옴
            const previousLpPost = queryClient.getQueryData<ResponseLpDetailDto>([QUERY_KEY.lps, lp.lpId])

            // 3. 게시글 데이터를 복사해서 newLpPost라는 새로운 객체 생성
            //    복사하는 이유는 나중에 오류가 발생했을 때 이전 상태로 되돌리기 위함
            const newLpPost = { ...previousLpPost }

            // 4. 게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 좋아요의 위치를 찾아서 삭제
            //    내 userId가 필요함
            const me = queryClient.getQueryData<RepsonseMyInfoDto>([QUERY_KEY.me])
            const userId = Number(me?.data.id)

            const likedIndex = previousLpPost?.data.likes.findIndex((like) => like.userId === userId) ?? -1

            if (likedIndex >= 0) {
                previousLpPost?.data.likes.splice(likedIndex, 1)
            } else {
                const newLike = { userId, lpId: lp.lpId } as Like
                previousLpPost?.data.likes.push(newLike)
            }

            // 5. 업데이트 된 게시글 데이터를 캐시에 저장
            //    이렇게 하면 UI가 바로 업데이트 됨. 사용자가 변화 확인 가능
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
