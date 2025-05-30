// import useGetLpList from '../hooks/queries/useGetLpList'
import useGetInfiniteLpList from '../hooks/queries/useGetInfiniteLpList'
import LpListView from '../components/lp/lplist'

export default function HomePage() {
    // const { data, isPending, isError } = useGetLpList({ search, order })

    return (
        <section className="flex flex-col w-full min-h-screen justify-center items-center">
            <LpListView useQuery={useGetInfiniteLpList} limit={10} />
        </section>
    )
}
