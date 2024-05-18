'use client'

import { update_house } from "@/action"
import { ReadDataHouseBlock, ReadDataHouseType, ReadHouse } from "@/typing"
import ModalAction from "../../_components/modal-action"

export default function ModalEditHouse({value, data_house_block, data_house_type}: {value: ReadHouse, data_house_block: ReadDataHouseBlock, data_house_type: ReadDataHouseType}) {
    const HouseBlockSelect = ({id}: {id: number}) => {
        return (
            <select name="house-block-id" defaultValue={id} 
            className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none'>
                {data_house_block.map(item =>
                    <option key={item.id} value={item.id}>{item.name}</option>  
                )}
            </select>
        )
    }
    
    const HouseTypeSelect = ({id}: {id: number}) => {
        return (
            <select name="house-type-id" defaultValue={id} 
            className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none'>
                {data_house_type.map(item =>
                    <option key={item.id} value={item.id}>{item.building}/{item.land}</option>  
                )}
            </select>
        )
    }
    
    return (
        <ModalAction name="Ubah rumah" action={update_house} success="Berhasil ubah rumah" button_name="Ubah" button_type={2}>
            <>
                <input type="number" name="house-id" defaultValue={value.id} className="hidden" />
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Blok rumah</h1>
                    <HouseBlockSelect id={value.house_block_id} />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Nomor</h1>
                    <input type='number' name='num' defaultValue={value.num} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Tipe rumah</h1>
                    <HouseTypeSelect id={value.house_type_id} />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Harga</h1>
                    <input type='number' name='price' defaultValue={value.price} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Biaya booking</h1>
                    <input type='number' name='booking-fee' defaultValue={value.booking_fee} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
            </>
        </ModalAction>
    )
}