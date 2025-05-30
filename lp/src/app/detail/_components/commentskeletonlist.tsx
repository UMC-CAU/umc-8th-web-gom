import { CommentSkeleton } from './commentskeleton'

export const CommentsSkeletonList = ({ count }: { count: number }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, idx) => (
                <CommentSkeleton key={idx} />
            ))}
        </>
    )
}
