const LpCardSkeleton = () => {
    return (
        <div className="relative aspect-square scale-90 animate-pulse">
            <div className="w-full h-full bg-gray-300 rounded-xl" />
            <div className="absolute inset-0 z-50 flex flex-col justify-end p-3">
                {/* title */}
                <div className="bg-gray-400 h-6 rounded-md rounded-bl-none" />
                <div className="bg-gray-400 w-2/3 h-7 rounded-md rounded-t-none -translate-y-1" />

                {/* additional */}
                <div className="flex flex-row justify-between mt-3">
                    <div className="bg-gray-400 w-2/5 h-5 rounded-md" />
                    <div className="bg-gray-400 w-1/5 h-5 rounded-md" />
                </div>
            </div>
        </div>
    )
}

export default LpCardSkeleton
