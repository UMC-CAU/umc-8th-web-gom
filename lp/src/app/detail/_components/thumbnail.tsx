import RoundedImg from '../../../components/roundedimg'

interface ThumbnailProps {
    thumbnail: string
}

export default function Thumbnail({ thumbnail }: ThumbnailProps) {
    return (
        <div className="relative">
            <RoundedImg src={thumbnail} alt="thumbnail" style="border border-gray-700" />

            <div className="absolute inset-0 flex justify-center items-center">
                <div className="w-1/7 h-1/7 bg-gray-100 border border-gray-700 rounded-full"></div>
            </div>
        </div>
    )
}
