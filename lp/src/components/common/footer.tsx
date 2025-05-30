export default function Footer() {
    return (
        <footer className="w-full px-16 py-12 border-t border-gray-600 bg-rose-200 flex flex-col md:flex-row justify-between items-center space-y-3">
            <div className="flex flex-col items-center md:items-start w-full space-y-5 whitespace-nowrap">
                <p>&copy;{new Date().getFullYear()} gomgomee. All Rights Reserved.</p>
                <div className="text-center md:text-start">
                    <div>Privacy Policy</div>
                    <div>Terms of Service</div>
                    <div>Contact</div>
                </div>
            </div>
            <h3 className="m-7 text-3xl">gom</h3>
        </footer>
    )
}
