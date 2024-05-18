'use client'

import { cancel_house } from "@/action"
import { ReadHouse } from "@/typing"
import ModalAction from "@/app/_components/modal-action"

export default function ModalCancelHouse({value}: {value: ReadHouse}) {
    return (
        <ModalAction name={'Pembatalan rumah'} action={cancel_house} success={'Berhasil pembatalan'} submit="Selesai" button_name='Pembatalan' button_type={2} hide={value.house_status_id < 4 || value.house_status_id > 8}>
            <>
                <input type="number" name="house-id" defaultValue={value.id} className="hidden" />
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Pengembalian uang</h1>
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