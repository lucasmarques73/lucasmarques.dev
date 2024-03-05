export const metadata = {
    title: 'Outstatic'
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div style={{
            position: "absolute",
            width: "100%",
            right: 0,
        }}>
            {children}
        </div >

    )
}
