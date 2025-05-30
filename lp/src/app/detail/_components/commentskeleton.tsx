export const CommentSkeleton = () => {
    return (
        <div className="w-full h-full p-2 bg-gray-300 rounded-xl space-y-2 animate-pulse">
            <div className="flex flex-row items-center">
                <div className="bg-gray-400 size-8 rounded-full" />
                <div className="bg-gray-400 w-2/5 h-5 mx-2 rounded-md" />
            </div>

            <div className="bg-gray-400 w-4/5 h-8 rounded-md" />
        </div>
    )
}
