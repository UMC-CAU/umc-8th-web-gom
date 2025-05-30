import useGetMyInfo from '../../hooks/queries/useGetMyInfo'
import { useAuth } from '../../hooks/useAuth'
import MyProfile from './_components/profile'
import LpListView from '../../components/lp/lplist'
import useGetInfiniteMyCreatedLpList from '../../hooks/queries/useGetInfiniteMyCreatedLpList'
import { useGetInfiniteMyLikedLpList } from '../../hooks/queries/useGetInfiniteMyLikeLpList'
import { MY_LP_TYPE } from '../../enums/my'
import { useState } from 'react'
import Tab from './_components/tab'

export default function MyPage() {
    const { accessToken } = useAuth()
    const { data: user, isPending, isError } = useGetMyInfo(accessToken)
    const [tab, setTab] = useState(MY_LP_TYPE.created)

    if (isPending) return <div>Loading...</div>
    if (isError) return <div>Error!</div>

    return (
        <div className="flex flex-col items-center">
            <MyProfile user={user} />

            <div className="grid grid-cols-2 gap-3 w-full">
                <Tab label="내가 생성한 LP" newTab={MY_LP_TYPE.created} setTab={setTab} />
                <Tab label="내가 좋아한 LP" newTab={MY_LP_TYPE.liked} setTab={setTab} />
            </div>

            {tab === MY_LP_TYPE.created && <LpListView useQuery={useGetInfiniteMyCreatedLpList} />}
            {tab === MY_LP_TYPE.liked && <LpListView useQuery={useGetInfiniteMyLikedLpList} />}
        </div>
    )
}
