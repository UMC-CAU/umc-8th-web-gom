import defaultProfile from '../../../assets/default_profile.png'
import { formatDate } from '../../../utils/format'
import RoundedImg from '../../../components/roundedimg'
import { MyInfo } from '../../../types/auth'
import { Settings } from 'lucide-react'

export default function MyProfile({ user }: { user: MyInfo }) {
    return (
        <div className="p-14 flex flex-row items-center space-x-7">
            <RoundedImg src={user.avatar ?? defaultProfile} alt="my profile" style="size-32" />

            <div className="flex flex-col justify-center items-start space-y-1 text-start">
                <div className="flex flex-row justify-between items-center w-full">
                    <div className="text-xl font-normal">{user?.name}</div>
                    <Settings />
                </div>
                <div className="text-gray-500">{user?.email.split('@', 1)}</div>
                <div className="text-sm text-gray-500">{formatDate(user.createdAt)}부터 함께 했어요!</div>
                <div className="my-3">{user.bio}</div>
            </div>
        </div>
    )
}
