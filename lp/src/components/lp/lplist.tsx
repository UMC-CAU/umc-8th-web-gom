import { useEffect, useState } from 'react'
import { PAGINATION_ORDER } from '../../enums/common'
import LpCard from './lpcard'
import LpCardSkeletonList from './lpcardskeletonlist'
import { useInView } from 'react-intersection-observer'
import SearchSection from '../search'
import SortToggleButton from '../togglebtn'
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query'
import { ResponseLpListDto } from '../../types/lp'
import useDebounce from '../../hooks/useDebounce'
import { SEARCH_DELAY } from '../../constants/delay'

interface LpListViewProps {
    useQuery: (params: {
        limit?: number
        search?: string
        order?: PAGINATION_ORDER
    }) => UseInfiniteQueryResult<InfiniteData<ResponseLpListDto, unknown>, Error>
    limit?: number
}

export default function LpListView({ useQuery, limit = 5 }: LpListViewProps) {
    const [search, setSearch] = useState<string | undefined>(undefined)
    const debouncedSearch = useDebounce(search, SEARCH_DELAY)
    const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc)

    const { data, isFetchingNextPage, hasNextPage, isPending, fetchNextPage, isError } = useQuery({
        limit,
        search: debouncedSearch,
        order,
    })

    // ref: 특정한 HTML 요소를 감시
    // inView: 그 요소가 화면에 보이면 true
    const { ref, inView } = useInView({ threshold: 0 })

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    })

    if (isError) return <div>Error!</div>

    return (
        <div>
            {/* order section */}
            <div className="flex flex-col md:flex-row items-center md:justify-end w-full p-7 gap-7">
                <SearchSection setSearch={setSearch} />
                <SortToggleButton order={order} setOrder={setOrder} style="w-20 text-sm" />
            </div>

            {/* list section */}
            <div className="min-h-[500px] grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {isPending && <LpCardSkeletonList count={10} />}

                {data?.pages
                    .map((page) => page.data.data)
                    .flat()
                    .map((lp) => (
                        <LpCard key={lp.id} lp={lp} />
                    ))}
            </div>
            <div ref={ref} className="mt-14 h-2" />
        </div>
    )
}
