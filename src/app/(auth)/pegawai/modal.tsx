'use client'

import { create_employee } from "@/action"
import ModalAction from "@/app/_components/modal-action"

export default function Modal() {
    return (
        <ModalAction name="Buat pegawai" action={create_employee} success="Berhasil buat pegawai" button_name="Buat" button_type={1}>
            <>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Nama</h1>
                    <input type='text' name='name' className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
            </>
        </ModalAction>
    )
}