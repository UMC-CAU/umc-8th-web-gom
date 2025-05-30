import DefaultProfile from '../assets/default_profile.png'

interface RoundedImgProps {
    src?: string
    alt: string
    style?: string
}

export default function RoundedImg({ src, alt, style }: RoundedImgProps) {
    return (
        <div className={`aspect-square rounded-full overflow-hidden ${style}`}>
            <img src={src ?? DefaultProfile} alt={alt} className="w-full h-full object-cover" />
        </div>
    )
}
