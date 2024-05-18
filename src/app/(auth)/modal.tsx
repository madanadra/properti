'use client'

import { create_house } from "@/action"
import { ReadDataHouseBlock, ReadDataHouseStatus, ReadDataHouseType } from "@/typing"
import ModalAction from "../_components/modal-action"

export default function Modal({data_house_block, data_house_status, data_house_type}: {data_house_block: ReadDataHouseBlock, data_house_status: ReadDataHouseStatus, data_house_type: ReadDataHouseType}) {
    return (
        <ModalAction name="Buat rumah" action={create_house} success="Berhasil buat rumah" button_name="Buat" button_type={1}>
            <>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Blok rumah</h1>
                    <select name="house-block-id" className='bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none'>
                        {data_house_block.map(item =>
                            <option key={item.id} value={item.id}>{item.name}</option>  
                        )}
                    </select>
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Nomor</h1>
                    <input type='number' name='num' className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Status rumah</h1>
                    <select name="house-status-id" className='bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none'>
                        {data_house_status.filter(item => item.id <= 3).map(item =>
                            <option key={item.id} value={item.id}>{item.name}</option>  
                        )}
                    </select>
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Tipe rumah</h1>
                    <select name="house-type-id" className='bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none'>
                        {data_house_type.map(item =>
                            <option key={item.id} value={item.id}>{item.building}/{item.land}</option>  
                        )}
                    </select>
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Harga</h1>
                    <input type='number' name='price' className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Biaya booking</h1>
                    <input type='number' name='booking-fee' className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
            </>
        </ModalAction>
    )
}