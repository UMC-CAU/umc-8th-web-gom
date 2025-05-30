import { useEffect, useRef, useState } from 'react'
import { VscLayoutSidebarLeft } from 'react-icons/vsc'
import { FaUserAlt } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const sidebarRef = useRef<HTMLDivElement>(null)

    const location = useLocation()

    // 화면 크기에 따라 사이드바 조절
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768
            setIsMobile(mobile)
            setIsOpen(!mobile)
        }

        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // 사이드 바 외부 클릭 감지 시 창 닫음
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (isMobile && isOpen && sidebarRef.current && !sidebarRef.current?.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isMobile, isOpen])

    // 라우트 변경 시 모바일에서 사이드바 닫음
    useEffect(() => {
        if (isMobile) setIsOpen(false)
    }, [location, isMobile])

    return (
        <div
            ref={sidebarRef}
            className={`fixed md:sticky top-0 left-0 h-screen z-50 
                        flex flex-row items-start ${!isOpen && '-translate-x-72'}
                        transition-transform duration-500 ease-in`}
        >
            {/* sidebar section */}
            <aside className="flex flex-col w-72 h-full px-10 py-7 border-r border-gray-500 bg-gray-200 space-y-5">
                {isMobile && (
                    <Link to="/" className="mb-10 text-2xl text-gray-800 font-bold">
                        gom
                    </Link>
                )}
                <Link to="my" className="sticky flex flex-row items-center gap-3">
                    <FaUserAlt />
                    마이페이지
                </Link>
            </aside>

            {/* open button */}
            {isMobile && (
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="mt-5 p-4 py-2 border border-l-0 border-gray-500 bg-rose-200 cursor-pointer"
                >
                    <span className="text-1xl text-gray-600">
                        <VscLayoutSidebarLeft />
                    </span>
                </button>
            )}
        </div>
    )
}
