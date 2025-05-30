import { useMutation } from '@tanstack/react-query'
import { postLike } from '../../apis/likes'
import queryClient from '../../libs/queryClient'
import { QUERY_KEY } from '../../constants/key'

export default function usePostLike() {
    return useMutation({
        mutationFn: postLike,
        // retryDelay: 3,
        onSuccess: (data) => {
            // data: API 성공 응답 데이터
            // variables: mutate에 전달한 값
            // context: onMutate에서 반환한 값
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps, data.data.lpId],

                // false가 디폴트
                // lps에 대한 전체 갱신을 원하지 않을 때 true
                exact: true,
            })
        },
        onError: (error) => {
            // error: 요청 실패 시 발생한 에러
            // variables: mutate에 전달한 값
            // context: onMutate에서 반환한 값
            console.log(error)
        },
        onMutate: () => {
            // 요청이 실행되기 직전에 실행
            // Optimistic Update를 구현할 때 유용
        },
        onSettled: () => {
            // 요청이 끝난 후 항상 실행 (onSuccess, onError 이후에 실행)
            // 로딩 상태를 초기화할 때 유용
        },
    })
}
