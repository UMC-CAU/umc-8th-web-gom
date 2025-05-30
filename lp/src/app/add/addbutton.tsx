import { Plus } from 'lucide-react'

interface AddLpButtonProps {
    setIsModalOpen: (value: boolean) => void
}

const AddLpButton = ({ setIsModalOpen }: AddLpButtonProps) => {
    return (
        <button
            onClick={() => setIsModalOpen(true)}
            className="btn fixed bottom-7 right-7 p-4 border-none bg-rose-300 duration-500 hover:bg-rose-400"
        >
            <Plus />
        </button>
    )
}

export default AddLpButton
