// import { IoSearch } from 'react-icons/io5'

interface SearchSectionProps {
    setSearch: (search: string | undefined) => void
}

const SearchSection = ({ setSearch }: SearchSectionProps) => {
    return (
        <div className="ml-5 flex flex-row items-center gap-3">
            <input
                onChange={(e) => setSearch(e.target.value)}
                placeholder="검색어를 입력하세요"
                className="px-3 py-2 border border-gray-500 bg-gray-100 rounded-full"
            />
            {/* <button onClick={() => setSearch()} className="cursor-pointer">
                <IoSearch />
            </button> */}
        </div>
    )
}

export default SearchSection
