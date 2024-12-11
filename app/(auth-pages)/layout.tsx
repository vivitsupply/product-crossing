export default async function Layout({ children }: { children: React.ReactNode }) {
    return <div className="max-w-screen-xl m-auto">{children}</div>;
}
