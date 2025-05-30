import { Outlet } from 'react-router-dom'
import Navbar from '../../components/common/navbar'
import Footer from '../../components/common/footer'
import Sidebar from '../../components/common/sidebar'
import AddLpButton from '../add/addbutton'
import { useState } from 'react'
import AddLpModal from '../add/modal'
import { useAuth } from '../../hooks/useAuth'

export default function RootLayout() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { accessToken } = useAuth()

    return (
        <div className="flex flex-col">
            <Navbar />
            <main className="flex min-h-screen w-full">
                <Sidebar />
                <div className="flex-1 flex justify-center items-center relative">
                    <Outlet />

                    {/* LP 생성 모달 버튼 */}
                    {accessToken && (
                        <>
                            <AddLpButton setIsModalOpen={setIsModalOpen} />
                            {isModalOpen && <AddLpModal setIsModalOpen={setIsModalOpen} />}
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
