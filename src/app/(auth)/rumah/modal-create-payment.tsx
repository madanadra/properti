'use client'

import { create_payment } from "@/action"
import { ReadDataPaymentTitle, ReadHouse } from "@/typing"
import ModalAction from "@/app/_components/modal-action"

export default function ModalCreatePayment(
    {value, data_payment_title}: 
    {value: ReadHouse, data_payment_title: ReadDataPaymentTitle}
) {
    return (
        <ModalAction name={'Pembayaran'} action={create_payment} success={'Berhasil pembayaran'} button_name="Bayar" button_type={2}>
            <>
                <input type="number" name="house-id" defaultValue={value.id} className="hidden" />
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Judul</h1>
                    <select name="payment-title-id" className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none'>
                        {data_payment_title.slice(0, 7).map(item =>
                            <option key={item.id} value={item.id}>{item.name}</option>  
                        )}
                    </select>
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Nilai</h1>
                    <input type='number' name='value' className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Melalui</h1>
                    <input type='text' name='payment-via' className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Keterangan</h1>
                    <input type='text' name='desc' className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
            </>
        </ModalAction>
    )
}