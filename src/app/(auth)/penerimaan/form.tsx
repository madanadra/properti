'use client'

import { ReadDataPaymentTitle } from "@/typing"
import { usePathname, useRouter } from "next/navigation"
import { FormEvent } from "react"

export default function Form(
  {from_date, until_date, payment_title_id, data_payment_title}: 
  {from_date: string, until_date: string, payment_title_id: string, data_payment_title: ReadDataPaymentTitle}
) {
    const pathname = usePathname()
    const router = useRouter()

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const from_date = (e.currentTarget.elements.namedItem('from-date') as HTMLInputElement).value
        const until_date = (e.currentTarget.elements.namedItem('until-date') as HTMLInputElement).value
        const payment_title_id = (e.currentTarget.elements.namedItem('payment-title-id') as HTMLInputElement).value

        const query: string[] = []

        if (from_date) {
          query.push('fd='+from_date)
        }
        if (until_date) {
          query.push('ud='+until_date)
        }
        if (payment_title_id) {
          query.push('pti='+payment_title_id)
        }

        let url = pathname

        if (query.length > 0) {
          url += `?${query.join('&')}`
        }
        
        router.push(url)
    }

    return (
        <form onSubmit={submit} className="grid gap-y-4 rounded-md bg-slate-50 border border-slate-300 p-4">
          <div className="text-sm grid sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 items-center gap-y-2 gap-x-4">
            <div className="font-medium flex sm:justify-between md:justify-start lg:justify-between">
              <h1>Dari tgl</h1>
              <h1>:</h1>
            </div>
            <input type='date' name='from-date' defaultValue={from_date} 
            className='sm:col-span-2 md:col-span-1 lg:col-span-2 w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
          </div>
          <div className="text-sm grid sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 items-center gap-y-2 gap-x-4">
            <div className="font-medium flex sm:justify-between md:justify-start lg:justify-between">
              <h1>Sampai tgl</h1>
              <h1>:</h1>
            </div>
            <input type='date' name='until-date' defaultValue={until_date} 
            className='sm:col-span-2 md:col-span-1 lg:col-span-2 w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
          </div>
          <div className="text-sm grid sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 items-center gap-y-2 gap-x-4">
            <div className="font-medium flex sm:justify-between md:justify-start lg:justify-between">
              <h1>Judul pembayaran</h1>
              <h1>:</h1>
            </div>
            <select name="payment-title-id" defaultValue={payment_title_id} className='sm:col-span-2 md:col-span-1 lg:col-span-2 w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none'>
                <option value='all'>Semua</option>
                {data_payment_title.map(item =>
                  <option key={item.id} value={item.id}>{item.name}</option>  
                )}
            </select>
          </div>
          <div className="flex flex-row-reverse gap-x-4 items-center mt-2">
            <button type="submit" className='flex justify-center items-center gap-x-2.5 py-2 px-3 text-sm font-medium rounded-md
            bg-slate-950 hover:bg-slate-800 disabled:bg-slate-800 text-slate-50'>
              PDF
            </button>
          </div>
        </form>
    )
}