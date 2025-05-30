import { PAGINATION_ORDER } from '../enums/common'

interface SortToggleButtonProps {
    order: PAGINATION_ORDER
    setOrder: (order: PAGINATION_ORDER) => void
    style?: string
}

export default function SortToggleButton({ order, setOrder, style }: SortToggleButtonProps) {
    return (
        <div className="flex flex-row">
            <button
                onClick={() => setOrder(PAGINATION_ORDER.desc)}
                className={`p-2 rounded-full rounded-r-none cursor-pointer ${
                    order === PAGINATION_ORDER.desc ? 'bg-gray-600 text-gray-200' : 'border border-gray-600'
                } ${style}`}
            >
                최신 순
            </button>
            <button
                onClick={() => setOrder(PAGINATION_ORDER.asc)}
                className={`p-2 rounded-full rounded-l-none cursor-pointer ${
                    order === PAGINATION_ORDER.asc ? 'bg-gray-600 text-gray-200' : 'border border-gray-600'
                } ${style}`}
            >
                오래된 순
            </button>
        </div>
    )
}
