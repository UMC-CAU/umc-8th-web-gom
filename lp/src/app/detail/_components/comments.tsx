import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { PAGINATION_ORDER } from '../../../enums/common'
import useGetInfiniteCommentList from '../../../hooks/queries/useGetInfiniteCommentList'
import { useEffect } from 'react'
import SortToggleButton from '../../../components/togglebtn'
import Comment from './comment'
import { CommentsSkeletonList } from './commentskeletonlist'
import usePostComment from '../../../hooks/mutations/usePostComment'

export default function Comments({ lpId }: { lpId: string }) {
    const [text, setText] = useState('')
    const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc)
    const {
        data: comments,
        isFetchingNextPage,
        hasNextPage,
        isPending,
        fetchNextPage,
        isError,
    } = useGetInfiniteCommentList({
        lpId,
        limit: 10,
        order,
    })

    const { mutate: postMutate } = usePostComment()

    const onPostClick = () => {
        postMutate({ lpId: Number(lpId), content: text })
        setText('')
    }

    const { ref, inView } = useInView({
        threshold: 0,
    })

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

    if (isError) return <div>Error!</div>

    return (
        <div className="w-full space-y-5">
            {isPending && <div></div>}

            {/* title section */}
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-xl">댓글</h2>
                <SortToggleButton order={order} setOrder={setOrder} style="w-20 text-sm" />
            </div>

            {/* input section */}
            <form onSubmit={onPostClick} className="flex flex-row space-x-2">
                <input
                    onChange={(e) => setText(e.target.value)}
                    placeholder="댓글을 입력해주세요"
                    className="flex-1 p-1 border border-gray-500 rounded-xl"
                />
                <button
                    type="submit"
                    className="px-3 py-1 cursor-pointer border border-none rounded-xl transition-colors duration-300 ease-in hover:bg-gray-300"
                >
                    작성
                </button>
            </form>

            {/* comments section */}
            {isPending && <CommentsSkeletonList count={10} />}
            {isFetchingNextPage && <CommentsSkeletonList count={10} />}

            {comments?.pages.map((page) =>
                page.data.data.map((comment) => (
                    <Comment
                        key={comment.id}
                        avatar={comment.author.avatar}
                        authorName={comment.author.name}
                        createdAt={comment.createdAt}
                        content={comment.content}
                    />
                ))
            )}

            <div ref={ref} className="h-2"></div>
        </div>
    )
}
