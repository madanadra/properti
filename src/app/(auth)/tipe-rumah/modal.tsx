'use client'

import { create_house_type } from "@/action"
import ModalAction from "@/app/_components/modal-action"

export default function Modal() {
    return (
        <ModalAction name="Buat tipe rumah" action={create_house_type} success="Berhasil buat tipe rumah" button_name="Buat" button_type={1}>
            <>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Luas bangunan</h1>
                    <input type='number' name='building' step="0.01" className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Luas tanah</h1>
                    <input type='number' name='land' step="0.01" className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
            </>
        </ModalAction>
    )
}