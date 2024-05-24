'use client'

import { booking_house } from "@/action"
import { useState} from "react"
import { ReadDataCustomer, ReadHouse } from "@/typing"
import ModalAction from "@/app/_components/modal-action"

export default function ModalBookingHouse(
    {value, data_customer}: 
    {value: ReadHouse, data_customer: ReadDataCustomer}
) {
    const ExistingCustomer = () => {
        const [existingCustomer, setExistingCustomer] = useState<boolean>(false)

        return (<>
            <div className="flex items-center gap-x-2.5 cursor-pointer w-max">
                <input type="checkbox" id='exist' onChange={(e) => setExistingCustomer(e.target.checked)} defaultChecked={existingCustomer} className="cursor-pointer" />
                <label htmlFor='exist' className="cursor-pointer">Konsumen sudah ada</label>
            </div>
            <div className={`${existingCustomer ? 'grid' : 'hidden'} gap-y-2 text-sm`}>
                <h1 className='font-medium'>Konsumen</h1>
                <select name="customer-id" className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none'>
                    {data_customer.map(item =>
                        <option key={item.id} value={item.id}>{item.name} ({item.id})</option>  
                    )}
                </select>
            </div>
            <div className={`${existingCustomer ? 'hidden' : 'grid'} gap-y-2 text-sm`}>
                <h1 className='font-medium'>Nama konsumen</h1>
                <input type='text' name='customer-name' className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
            </div>
            <div className={`${existingCustomer ? 'hidden' : 'grid'} gap-y-2 text-sm`}>
                <h1 className='font-medium'>No. tel</h1>
                <input type='tel' name='customer-tel' className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
            </div>
        </>)
    }
    
    return (
        <ModalAction name="Booking" action={booking_house} success="Berhasil booking" button_type={1} hide={value.house_status_id !== 2 && value.house_status_id !== 3}>
            <>
                <input type="text" name="house-id" defaultValue={value.id} className="hidden" />
                <ExistingCustomer />
                <hr className="border-t border-slate-300 my-4" />
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Biaya booking</h1>
                    <input type='number' name='payment-value' className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Pembayaran melalui</h1>
                    <input type='text' name='payment-via' className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                    </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Keterangan</h1>
                    <input type='text' name='payment-desc' className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
            </>
        </ModalAction>
    )
}