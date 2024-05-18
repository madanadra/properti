'use client'

import { moving_house } from "@/action"
import { ReadDataHouse } from "@/typing"
import ModalAction from "@/app/_components/modal-action"

export default function Modal({value, data_house}: {value: ReadDataHouse[0], data_house: ReadDataHouse}) {
    return (
        <ModalAction name={'Pindah rumah'} action={moving_house} success={'Berhasil pindah rumah'} button_name="Pindah" button_type={1}>
            <>
                <input type="number" name="from-house-id" defaultValue={value.id} className="hidden" />
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Rumah tujuan</h1>
                    <select name="to-house-id" className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none'>
                        {data_house.filter(item => item.house_status_id > 1 && item.house_status_id < 9 && item.id !== value.id && item.customer_id !== value.customer_id).map(item =>
                            <option key={item.id} value={item.id}>{item.house_block.name}/{item.num} {item.customer && '('+item.customer.name+')'}</option>  
                        )}
                    </select>
                </div>
            </>
        </ModalAction>
    )
}