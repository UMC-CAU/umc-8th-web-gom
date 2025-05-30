import RoundedImg from '../../../components/roundedimg'
import { formatDate } from '../../../utils/format'
import { IoEllipsisHorizontal } from 'react-icons/io5'

interface CommentProps {
    avatar?: string
    authorName: string
    createdAt: Date
    content: string
}

export default function Comment({ avatar, authorName, createdAt, content }: CommentProps) {
    return (
        <div className="flex flex-col space-y-2 px-2">
            {/* profile */}
            <div className="flex flex-row items-center">
                <RoundedImg src={avatar} alt="comment author's avatar" style="size-8 border border-gray-500" />
                <div className="flex flex-1 items-center mx-2 space-x-5">
                    <h3>{authorName}</h3>
                    <p className="text-sm text-gray-400">{formatDate(createdAt)}</p>
                </div>
                <IoEllipsisHorizontal />
            </div>

            {/* content */}
            <p>{content}</p>
        </div>
    )
}
