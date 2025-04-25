
export default function ApiDocLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="bg-white text-black">
            <main>{children}</main>
        </div>
    );
}