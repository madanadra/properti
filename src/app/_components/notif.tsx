'use client'

import { useEffect, useState } from "react";
import { PiX } from "react-icons/pi";

export default function Notif({text, success}: {text: string, success?: boolean}) {
    const [show, setShow] = useState<boolean>(true)

    useEffect(() => {
        const notif = setTimeout(() => {
            setShow(false)
        }, 5000)

        return () => {clearTimeout(notif)}
    }, [])
    
    return (
        <div className={`${show ? '' : 'hidden'} anim-notif max-w-sm mx-auto fixed top-0 right-0 p-4`}>
            <div className={`${success ? ' bg-green-300 border border-green-500' : 'bg-red-300 border border-red-500'} 
            flex items-center gap-x-4 justify-between rounded-md text-sm p-4`}>
                <h1 className="line-clamp-3">{text}</h1>
                <div><PiX onClick={() => setShow(false)} className={`${success ? ' text-green-700' : ' text-red-700'} text-xl cursor-pointer`} /></div>
            </div>
        </div>
    )
}