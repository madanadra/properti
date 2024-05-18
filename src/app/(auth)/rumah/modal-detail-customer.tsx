'use client'

import { update_customer } from "@/action"
import { ReadHouse } from "@/typing"
import ModalAction from "@/app/_components/modal-action"

export default function ModalDetailCustomer({value}: {value: ReadHouse}) {
    return (value.customer &&
        <ModalAction name="Detail konsumen" action={update_customer} success="Berhasil edit konsumen" submit="Simpan" button_name="Detail" button_type={2}>
            <>
                <input type="number" name="customer-id" defaultValue={value.customer.id} className="hidden" />
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Nama</h1>
                    <input type='text' name='name' defaultValue={value.customer.name} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>            
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>No. tel</h1>
                    <input type='tel' name='tel' defaultValue={value.customer.tel} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>No. KTP</h1>
                    <input type='text' name='ktp-num' defaultValue={value.customer.ktp_num || ''} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Alamat rumah</h1>
                    <input type='text' name='address' defaultValue={value.customer.address || ''} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Alamat KTP</h1>
                    <input type='text' name='ktp-address' defaultValue={value.customer.ktp_address || ''} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Tempat lahir</h1>
                    <input type='text' name='born-place' defaultValue={value.customer.born_place || ''} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Tanggal lahir</h1>
                    <input type='date' name='born-date' defaultValue={value.customer.born_date || ''} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Instansi</h1>
                    <input type='text' name='agency' defaultValue={value.customer.agency || ''} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Alamat instansi</h1>
                    <input type='text' name='agency-address' defaultValue={value.customer.agency_address || ''} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>No. tel instansi</h1>
                    <input type='text' name='agency-tel' defaultValue={value.customer.agency_tel || ''} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Email</h1>
                    <input type='email' name='email' defaultValue={value.customer.email || ''} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <hr className="border-t border-slate-300 my-4" />
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Nama istri/suami</h1>
                    <input type='text' name='pair-name' defaultValue={value.customer.pair_name || ''} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>No. tel istri/suami</h1>
                    <input type='tel' name='pair-tel' defaultValue={value.customer.pair_tel || ''} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>No. KTP istri/suami</h1>
                    <input type='text' name='pair-ktp-num' defaultValue={value.customer.pair_ktp_num || ''} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Alamat KTP istri/suami</h1>
                    <input type='text' name='pair-ktp-address' defaultValue={value.customer.pair_ktp_address || ''} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Tempat lahir istri/suami</h1>
                    <input type='text' name='pair-born-place' defaultValue={value.customer.pair_born_place || ''} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Tanggal lahir istri/suami</h1>
                    <input type='date' name='pair-born-date' defaultValue={value.customer.pair_born_date || ''} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
            </>
        </ModalAction>
    )
}