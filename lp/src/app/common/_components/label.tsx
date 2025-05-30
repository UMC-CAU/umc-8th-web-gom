import { useNavigate } from 'react-router-dom'
import { IoArrowBackOutline } from 'react-icons/io5'

export const PageLabel = ({ label }: { label: string }) => {
    const navigate = useNavigate()

    return (
        <div className="w-full grid grid-cols-7 items-center mb-7">
            <button onClick={() => navigate(-1)} className="btn border-none text-xl justify-self-start">
                <IoArrowBackOutline />
            </button>
            <h3 className="col-span-5 text-xl text-center text-gray-800 font-bold">{label}</h3>
        </div>
    )
}
