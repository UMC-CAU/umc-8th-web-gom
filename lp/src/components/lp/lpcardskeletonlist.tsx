import LpCardSkeleton from './lpcardskeleton'

interface LpCardSkeletonListProps {
    count: number
}

const LpCardSkeletonList = ({ count }: LpCardSkeletonListProps) => {
    return (
        <>
            {Array.from({ length: count }).map((_, idx) => (
                <LpCardSkeleton key={idx} />
            ))}
        </>
    )
}

export default LpCardSkeletonList
