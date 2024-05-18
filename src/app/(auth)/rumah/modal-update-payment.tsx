'use client'

import { update_payment } from "@/action"
import { ReadDataPaymentTitle, ReadHouse } from "@/typing"
import ModalAction from "@/app/_components/modal-action"
import { useState } from "react"

export default function ModalUpdatePayment(
    {data_payment, data_payment_title}: 
    {data_payment: ReadHouse['payments'], data_payment_title: ReadDataPaymentTitle}
) {
    const [id, setId] = useState<number>(data_payment[0].id)
    const payment = data_payment.find(item => item.id === id)

    return (
        <ModalAction name={'Ubah pembayaran'} action={update_payment} success={'Berhasil ubah pembayaran'} button_name="Ubah" button_type={2}>
            <>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>ID</h1>
                    <select name="payment-id" defaultValue={id} onChange={(e) => setId(Number(e.target.value))} 
                    className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none'>
                        {data_payment.map(item =>
                            <option key={item.id} value={item.id}>{item.id}</option>  
                        )}
                    </select>
                </div>
                <hr className="border-t border-slate-300 my-4" />
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Judul</h1>
                    <select name="payment-title-id" defaultValue={payment?.payment_title_id} 
                    className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none'>
                        {data_payment_title.slice(0, 7).map(item =>
                            <option key={item.id} value={item.id}>{item.name}</option>  
                        )}
                    </select>
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Nilai</h1>
                    <input type='number' name='value' defaultValue={payment?.value} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Melalui</h1>
                    <input type='text' name='payment-via' defaultValue={payment?.payment_via} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Keterangan</h1>
                    <input type='text' name='desc' defaultValue={payment?.desc || undefined} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
            </>
        </ModalAction>
    )
}