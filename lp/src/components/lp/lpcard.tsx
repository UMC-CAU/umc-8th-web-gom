import { useState } from 'react'
import { Lp } from '../../types/lp'
import { getRelativeTime } from '../../utils/format'
import { FaHeart } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import LpCardSkeleton from './lpcardskeleton'

export default function LpCard({ lp }: { lp: Lp }) {
    const [isHovered, setIsHovered] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    return (
        <Link
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            to={`/lp/${lp.id}`}
            className="relative aspect-square cursor-pointer transition-transform duration-500 hover:scale-90"
        >
            {isHovered && (
                <>
                    <div className="absolute inset-0 z-5 bg-gradient-to-b from-transparent to-black" />
                    <div className="absolute inset-0 z-50 flex flex-col justify-end p-3 text-gray-100 space-y-2">
                        <h1 className="col-span-2 text-lg font-semibold leading-snug line-clamp-3">{lp.title}</h1>
                        <div className="flex flex-row justify-between">
                            <p>{getRelativeTime(new Date(lp.updatedAt))}</p>
                            <p className="flex flex-row items-center gap-1">
                                <FaHeart />
                                {lp.likes?.length ?? 0}
                            </p>
                        </div>
                    </div>
                </>
            )}

            {isLoading && <LpCardSkeleton />}
            <img
                src={lp.thumbnail}
                alt="thumbnail"
                className="w-full h-full object-cover"
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
                style={{ display: isLoading ? 'none' : 'block' }}
            />
        </Link>
    )
}
