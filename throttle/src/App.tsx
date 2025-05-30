import { useEffect, useState } from 'react'
import useThrottle from './hooks/useThrottle'

function App() {
    const [scrollY, setScrollY] = useState<number>(0)

    const handleScroll = () => {
        setScrollY(window.scrollY)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const throttledScrollY = useThrottle(scrollY, 2000) // ✅

    return (
        <div className="fixed inset-0 flex flex-col justify-center items-center">
            <section className="bg-white p-2">
                <h1 className="text-3xl">What is Throttling?</h1>
                <div>
                    <h2>쓰로틀링이 무엇일까요?</h2>
                    <p>ScrollY: {throttledScrollY}px</p>
                </div>
            </section>
        </div>
    )
}

export default App
