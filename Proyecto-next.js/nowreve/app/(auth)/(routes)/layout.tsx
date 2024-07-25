export default function AuthLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-4 mx-auto bg-white rounded-md shadow-md">
                {children}
            </div>
        </div>
    )
}