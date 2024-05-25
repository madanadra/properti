'use client'

import { update_password } from "@/action"
import Load from "@/app/_components/load"
import Notif from "@/app/_components/notif"
import { useEffect, useRef, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"

export default function Form() {
    const [notif, setNotif] = useState<boolean>(false)
    const [state, formAction] = useFormState(update_password, null)
    const form = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (state?.unauth) {
            window.location.reload()
        } else {
            setNotif(true)
            form.current && form.current.reset()
        }
    }, [state])

    const Button = () => {
        const {pending} = useFormStatus()
    
        useEffect(() => {
          pending && setNotif(false)
        }, [pending])
    
        return (
          <button type="submit" disabled={pending}
          className='flex justify-center items-center gap-x-2.5 py-2 px-3 font-semibold rounded-md bg-slate-950 text-slate-50 hover:bg-slate-800 disabled:bg-slate-800 mt-2'>
              {pending && <Load size="small" />} Ubah
          </button>
        )
    }

    return (<>
        <form ref={form} action={formAction} className='max-w-sm w-full grid gap-y-4 text-sm rounded-md bg-slate-50 p-4 border border-slate-300'>
            <div className='grid gap-y-2'>
                <h1 className='font-medium'>Password lama</h1>
                <input type='password' name='old-password' 
                className='bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
            </div>
            <div className='grid gap-y-2'>
                <h1 className='font-medium'>Password baru</h1>
                <input type='password' name='new-password'
                className='bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
            </div>
            <div className='grid gap-y-2'>
                <h1 className='font-medium'>Konfirmasi password baru</h1>
                <input type='password' name='new-password-confirmation'
                className='bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
            </div>
            <Button />
        </form>
        {notif && state && <Notif text={state.error ? state.error as string : 'Berhasil ubah password'} success={state.success} />}
    </>)
}