'use client'

import { deleteToken, log_out } from "@/action"
import { useFormState } from "react-dom"
import { useFormStatus } from "react-dom"
import Load from "./load"
import { useEffect, useState } from "react"
import Notif from "./notif"

export default function FormLogOut() {
  const [notif, setNotif] = useState<boolean>(false)
  const [state, formAction] = useFormState(log_out, null)

  useEffect(() => {
    if (state?.success || state?.unauth) {
      window.location.reload()
      deleteToken()
    } else if (state?.error) {
      setNotif(true)
    }
  }, [state])

  const Button = () => {
    const {pending} = useFormStatus()

    useEffect(() => {
      pending && setNotif(false)
    }, [pending])

    return (
      <button formAction={formAction} disabled={pending} 
      className='flex justify-center items-center gap-x-2.5 py-2 px-3 text-sm font-semibold rounded-md
    bg-slate-50 hover:bg-slate-200 disabled:bg-slate-200 border border-slate-300 duration-300'>
        {pending && <Load size="small" />} Keluar
      </button>
    )
  }

  return (
    <form className='w-full grid gap-y-4 text-sm'>
      <Button />
      {notif && state && state.error && <Notif text={state.error as string} />}
    </form>
  )
}