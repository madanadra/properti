'use client'

import { useEffect, useState, useRef } from "react"
import { useFormState, useFormStatus } from "react-dom"
import Load from "./load"
import Notif from "./notif"

export default function ModalAction(
    {name, action, submit, success, button_name, button_type, hide, setShowMirror, children}: 
    {name: string, action: (_current: any, e: FormData) => any, submit?: string, success: string, button_name?: string, button_type: 1 | 2, hide?: boolean, setShowMirror?: (value: boolean) => void, children: React.ReactNode}
) {
    const [show, setShow] = useState<boolean>(false)
    const [notif, setNotif] = useState<boolean>(false)
    const [state, formAction] = useFormState(action, null)
    const form = useRef<HTMLFormElement>(null)

    useEffect(() => {
        setShowMirror && setShowMirror(show)
        !show && form.current && form.current.reset()
    }, [show])

    useEffect(() => {
        if (state?.unauth) {
            window.location.reload()
        } else {
            setNotif(true)
        }
    }, [state])

    const Button = () => {
        const {pending} = useFormStatus()
    
        useEffect(() => {
          pending && setNotif(false)
        }, [pending])

        if (button_type === 1) {
            return (
                <button onClick={() => setShow(true)} disabled={pending} 
                className='flex justify-center items-center gap-x-2.5 py-2 px-3 text-sm font-medium rounded-md
                bg-slate-950 hover:bg-slate-800 disabled:bg-slate-800 text-slate-50'>
                    {pending && <Load size="small" />} {button_name ? button_name : name}
                </button>
            )
        } else if (button_type === 2) {
            return (
                <button onClick={() => setShow(true)} disabled={pending} 
                className='flex justify-center items-center gap-x-2.5 py-2 px-3 text-sm font-medium rounded-md
                bg-slate-50 hover:bg-slate-200 disabled:bg-slate-200 ring-1 ring-inset ring-slate-300'>
                    {pending && <Load size="small" />} {button_name ? button_name : name}
                </button>
            )
        }
    }

    const Modal = () => {
        return (
            <div onClick={() => setShow(false)} className={`${show ? 'grid' : 'hidden'} content-center justify-items-center fixed inset-0 bg-slate-950 bg-opacity-50 p-4 z-10`}>
                <div onClick={(e) => e.stopPropagation()} className='grid divide-y divide-slate-300 bg-slate-50 border border-slate-300 rounded-md w-full overflow-y-auto max-w-sm anim-modal'>
                    <div className="grid gap-y-4 p-4 pb-6 overflow-y-auto">
                        <h1 className="text-lg font-semibold mb-2">{name}</h1>
                        {children}
                    </div>
                    <div className="p-4 bg-slate-100 flex items-center justify-end gap-x-6 text-sm font-medium">
                        <button type="reset" onClick={() => setShow(false)} className="text-slate-600">Batal</button>
                        <button type="submit">{submit ? submit : button_name ? button_name : name}</button>
                    </div>
                </div>
            </div>
        )
    }

    return (<>
        <form ref={form} action={formAction} onSubmit={() => setShow(false)} className={hide ? 'hidden' : ''}>
            <Button />
            <Modal />
        </form>
        {notif && state && <Notif text={state.error ? state.error as string : success} success={state.success} />}
    </>)
}