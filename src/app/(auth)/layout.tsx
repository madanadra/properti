import { Suspense } from "react";
import Header from "../_components/header";
import Load from "../_components/load";
import Menu from "../_components/menu";
import { read_data } from "@/data";
import { ReadUser } from "@/typing";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const Main = async () => {
    const user: {data?: ReadUser, error?: string}  = await read_data({name: 'read-user'})

    if (!user.data || user.error) {
      return (
        <div className="grid place-content-center h-dvh p-4">
          <h1 className="text-slate-600">{user.error}</h1>
        </div>
      )
    }
  
    return (
      <div className='flex divide-x divide-slate-300'>
        <div className="sticky top-0 h-full">
          <nav className="hidden md:grid w-80">
            <Menu user={user.data} />
          </nav>
        </div>
        <main className="grow sm:px-2 md:px-0 lg:px-2 pb-4">
          <Header user={user.data} />
          {children}
        </main>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="grid place-content-center h-dvh">
        <Load size="large" />
      </div>
    }>
      <Main />
    </Suspense>
  )
}