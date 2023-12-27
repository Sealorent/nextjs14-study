export const metadata = {
    title : "Layout",
    description : "Layout for admin pages",
}

export default function Layout({
    children
} : {
    children : React.ReactNode
}) {
    return (
        <>
            <div className="w-full min-h-screen">
                {children}
            </div>
        </>
    )
}