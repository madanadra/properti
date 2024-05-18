'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PiMagnifyingGlass } from "react-icons/pi";

export default function Search() {
    const pathname = usePathname()
    const params = useSearchParams().get('s') || ''
    const [text, setText] = useState<string>('')
    const router = useRouter()

    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            router.push(text ? pathname+'?s='+text : pathname)
        }, 200)

        return () => clearTimeout(debounceSearch)
    }, [text])

    useEffect(() => {
        setText(params)
    }, [params])

    return (
        <div className="grow flex items-center relative">
            <PiMagnifyingGlass className="text-lg text-slate-600 absolute left-3 pointer-events-none" />
            <input type="text" placeholder="Cari..." value={text} onChange={(e) => setText(e.target.value)}
            className="w-full text-sm bg-slate-50 rounded-md py-2 pl-10 pr-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none" />
        </div>
    )
}