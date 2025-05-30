import { useParams } from 'react-router-dom'
import useGetLpDetail from '../../hooks/queries/useGetLpDetail'
import Thumbnail from './_components/thumbnail'
import RoundedImg from '../../components/roundedimg'
import { getRelativeTime } from '../../utils/format'

import { GoTrash } from 'react-icons/go'
import { GoPencil } from 'react-icons/go'
// import { FaHeart } from 'react-icons/fa6'
import { Heart } from 'lucide-react'
import Comments from './_components/comments'
import useGetMyInfo from '../../hooks/queries/useGetMyInfo'
import { useAuth } from '../../hooks/useAuth'
import usePostLike from '../../hooks/mutations/optimisic/usePostOptimisticLike'
import useDeleteLike from '../../hooks/mutations/optimisic/useDeleteOptimisticLike'

const AuthorSection = ({ avatar, name, updatedAt }: { avatar?: string; name: string; updatedAt: Date }) => {
    return (
        <div className="flex flex-row justify-between items-center w-full h-10">
            <div className="flex flex-row items-center space-x-2">
                <RoundedImg src={avatar} alt="author avatar" style="size-8 border border-gray-500" />
                <p className="whitespace-nowrap">{name}</p>
            </div>

            <div>{getRelativeTime(new Date(updatedAt))}</div>
        </div>
    )
}

const Hashtag = ({ tagname }: { tagname: string }) => {
    return (
        <div className="w-fit px-2 py-1 text-sm text-gray-700 bg-gray-300 border border-none rounded-xl">
            <div># {tagname}</div>
        </div>
    )
}

export default function LpDetailPage() {
    const { lpId } = useParams<{ lpId: string }>()
    const { accessToken } = useAuth()
    const { data: lp, isPending, isError } = useGetLpDetail({ lpId: Number(lpId) })
    const { data: me } = useGetMyInfo(accessToken)

    // mutate: 비동기 요청을 실행하고, 콜백 함수를 이용해서 후속 작업을 처리
    // mutateAsync: Promise를 반환해서 await 사용 가능
    const { mutate: likeMutate } = usePostLike()
    const { mutate: dislikeMutate } = useDeleteLike()

    // const isLiked = lp?.likes.map((like) => like.userId).includes(me?.id as number)
    const isLiked = lp?.likes.some((like) => like.userId === me?.id)

    const handleLikeLp = () => {
        if (me?.id) likeMutate({ lpId: Number(lpId) })
    }

    const handleDislikeLp = () => {
        dislikeMutate({ lpId: Number(lpId) })
    }

    if (isPending) return <div>Loading...</div>
    if (isError) return <div>Error!</div>

    return (
        <div className="flex flex-col items-center max-w-[700px] w-full md:w-2/3 p-7 bg-gray-200 space-y-5">
            {/* author section */}
            <AuthorSection avatar={lp.author.avatar} name={lp.author.name} updatedAt={lp.updatedAt} />

            {/* title section */}
            <div className="flex felx-row justify-between items-center w-full space-x-10">
                <h3 className="flex-1 text-lg">{lp.title}</h3>
                <div className="grid grid-cols-2 gap-3">
                    <GoPencil />
                    <GoTrash />
                </div>
            </div>

            {/* cd section */}
            <div className="relative w-5/6 animate-spin-slow my-10">
                <Thumbnail thumbnail={lp.thumbnail} />
                <div className="absolute inset-0 w-full h-full rounded-full shadow-2xl" />
            </div>

            {/* additional section */}
            <p className="text-gray-500">{lp.content}</p>
            {lp.tags.length > 0 ? (
                lp.tags.map((tag) => <Hashtag key={tag.id} tagname={tag.name} />)
            ) : (
                <Hashtag tagname="none" />
            )}
            <div className="flex flex-row items-center space-x-1">
                <button onClick={isLiked ? handleDislikeLp : handleLikeLp} className="cursor-pointer">
                    <Heart fill={isLiked ? 'black' : 'transparent'} />
                </button>
                <div>{lp.likes.length}</div>
            </div>

            {/* comments section */}
            {lpId && <Comments lpId={lpId} />}
        </div>
    )
}
