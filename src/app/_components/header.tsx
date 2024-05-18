'use client'

import { useEffect, useState } from 'react'
import { PiList } from 'react-icons/pi'
import Menu from './menu'
import { usePathname } from 'next/navigation'
import { ReadUser } from '@/typing'

export default function Header({user}: {user: ReadUser}) {
    const [menu, setMenu] = useState<boolean>(false)
    const url = usePathname()

    useEffect(() => {
        setMenu(false)
    }, [url])

    return (
        <div className="flex gap-x-4 p-4 min-h-16">
            <div className='md:hidden h-8 flex items-center'>
                <PiList onClick={() => setMenu(true)} className='text-xl text-slate-600 cursor-pointer' />
            </div>
            <h1 className="grow text-2xl font-semibold">{url === '/' ? 'Dashboard' : url.substring(1).replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase())}</h1>
            <div onClick={() => setMenu(false)} className={`${menu ? 'md:hidden' : 'hidden'} fixed inset-0 bg-slate-950 bg-opacity-50 z-50`}>
                <div onClick={(e) => e.stopPropagation()} className='w-5/6 max-w-sm sticky top-0 h-full'>
                    <Menu user={user} />
                </div>
            </div>
        </div>
    )
}