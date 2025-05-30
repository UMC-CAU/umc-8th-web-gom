import { MY_LP_TYPE } from '../../../enums/my'

interface TabProps {
    label: string
    newTab: MY_LP_TYPE
    setTab: (value: MY_LP_TYPE) => void
}

const Tab = ({ label, newTab, setTab }: TabProps) => {
    return (
        <div
            onClick={() => setTab(newTab)}
            className="px-3 py-1 border-b border-gray-600 text-end cursor-pointer group"
        >
            <span className="p-1 transition-colors duration-300 ease-in-out group-hover:bg-rose-300">{label}</span>
        </div>
    )
}

export default Tab
