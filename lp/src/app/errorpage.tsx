import { Link } from 'react-router-dom'

export default function ErrorPage() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-6xl">404 ERROR</h1>
            <Link to="/" className="m-3 p-1 border-b">
                {'>'}{' '}
                <span className="p-1 transition-colors duration-300 ease-in-out hover:bg-rose-300">
                    go back to home... 🏠
                </span>
            </Link>
        </div>
    )
}
