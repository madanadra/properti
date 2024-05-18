'use client'

import { update_house_hook } from "@/action"
import { ReadHouse } from "@/typing"
import ModalAction from "@/app/_components/modal-action"

export default function ModalEditHook({value}: {value: ReadHouse}) {
    return (
        <ModalAction name="Ubah hook" action={update_house_hook} success="Berhasil ubah hook" button_name="Ubah" button_type={2}>
            <>
                <input type="number" name="house-id" defaultValue={value.id} className="hidden" />
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Panjang kelebihan tanah (m)</h1>
                    <input type='number' name='hook-length' defaultValue={value.hook_length || ''} step="0.01" className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Lebar kelebihan tanah (m)</h1>
                    <input type='number' name='hook-wide' defaultValue={value.hook_wide || ''} step="0.01" className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Harga/m<sup>2</sup></h1>
                    <input type='number' name='hook-square-price' defaultValue={value.hook_square_price || ''} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <hr className="border-t border-slate-300 my-4" />
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Biaya strategis</h1>
                    <input type='number' name='hook-strategic-fee' defaultValue={value.hook_strategic_fee || ''} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
            </>
        </ModalAction>
    )
}