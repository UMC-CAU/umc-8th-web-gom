import { useQuery } from '@tanstack/react-query'
import { PaginationDto } from '../../types/common'
import { getLpList } from '../../apis/lp'
import { QUERY_KEY } from '../../constants/key'
// import { ResponseLpListDto } from '../../types/lp'

// const initialLpListData: ResponseLpListDto = {
//     status: true,
//     statusCode: 200,
//     message: '',
//     data: {
//         data: [],
//         nextCursor: 0,
//         hasNext: false,
//     },
// }

export default function useGetLpList({ cursor, limit, search, order }: PaginationDto) {
    return useQuery({
        queryKey: [QUERY_KEY.lps, search, order],
        queryFn: () =>
            getLpList({
                cursor,
                limit,
                search,
                order,
            }),

        // 1. 데이터가 신선하다고 간주하는 시간
        // 이 시간 동안은 캐시된 데이터를 그대로 사용.
        // 컴포넌트가 마운트되거나 창에 포커스 들어오는 경우도 재요청 ❌
        // 5분 동안 기존 데이터를 그대로 활용해서 네트워크 요청
        staleTime: 1000 * 60 * 5, // 5분

        // 2. 사용되지 않는(비활성 상태) 쿼리 데이터가 캐시에 남아 있는 시간
        // staleTime이 지나고 데이터가 신선하지 않아도, 일정 시간 동안 메모리에 보관
        // 그 이후에 해당 쿼리가 전혀 사용되지 않으면 gcTime이 지난 후에 제거 (Garbage Collection)
        // 예) 10분 동안 사용되지 않으면 해당 캐시 데이터가 삭제되며, 다시 요청 시 새 데이터를 받아옴
        gcTime: 1000 * 60 * 10, // 10분

        // 3. 조건에 따라 쿼리 실행 여부 제어
        // enabled: Boolean(search),

        // 4.
        // refetchInterval: 100 * 60,

        // 5. 쿼리 요청이 실패했을 때 자동으로 재시도할 횟수를 지정
        // 기본 값은 3회 정도, 네트워크 오류 등 임시적인 문제를 보완 가능
        // 보통 queryClient에서 defaultOptions으로 설정
        // retry: 3,

        // 6.
        // initialData: initialLpListData,

        // 7. 파라미터가 변경될 때 이전 데이터를 유지하여 UI 깜빡임(Flicking)을 줄임
        // 예) 페이지네이션 시 페이지 전환 사이에 이전 데이터를 보여주어 사용자 경험을 향상시킴
        // keepPreviousData: true,

        // 8. {data?.map((lp) => (
        //        <h1>{lp.title}</h1>
        //    ))} 가 가능하게 함
        select: (data) => data.data.data,
    })
}
