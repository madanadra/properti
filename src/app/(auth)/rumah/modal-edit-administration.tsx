'use client'

import ModalAction from "@/app/_components/modal-action"
import { update_house_administration } from "@/action"
import { ReadDataEmployee, ReadDataPurchaseType, ReadHouse } from "@/typing"
import { useEffect, useState } from "react"

export default function ModalEditAdministration({value, data_employee, data_purchase_type}: {value: ReadHouse, data_employee: ReadDataEmployee, data_purchase_type: ReadDataPurchaseType}) {
    const [showMirror, setShowMirror] = useState<boolean>(false)

    const PurchaseType = () => {
        const [purchase_type, setPurchaseType] = useState<number | undefined>(value.purchase_type_id || undefined)
        
        useEffect(() => {
            !showMirror && setPurchaseType(value.purchase_type_id || undefined)
        }, [showMirror])

        return (<>
            <div className="grid gap-y-2 text-sm">
                <div className="flex items-center cursor-pointer w-max">
                    <input type="radio" id='null' name="purchase-type-id" value={undefined} onChange={(e) => e.target.checked && setPurchaseType(undefined)} 
                    defaultChecked={!purchase_type} className="cursor-pointer" />
                    <label htmlFor='null' className="font-medium pl-2.5 cursor-pointer">Belum ditentukan</label>
                </div>
                {data_purchase_type.filter(item => item.id <= 3).map(item => 
                    <div key={item.id} className="flex items-center cursor-pointer w-max">
                        <input type="radio" id={item.name} name="purchase-type-id" value={item.id} onChange={(e) => e.target.checked && setPurchaseType(item.id)} 
                        defaultChecked={purchase_type === item.id} className="cursor-pointer" />
                        <label htmlFor={item.name} className="font-medium pl-2.5 cursor-pointer">{item.name}</label>
                    </div>
                )}
            </div>
            <div className={`${purchase_type && purchase_type === 1 ? 'grid' : 'hidden'} gap-y-2 text-sm`}>
                <h1 className='font-medium'>Bank</h1>
                <input type='text' name='bank' defaultValue={value.bank || undefined} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
            </div>
            <div className={`${purchase_type && purchase_type === 1 ? 'grid' : 'hidden'} gap-y-2 text-sm`}>
                <h1 className='font-medium'>Maksimal KPR</h1>
                <input type='number' name='kpr-max' defaultValue={value.kpr_max || undefined} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
            </div>
            <div className={`${purchase_type && (purchase_type === 1 || purchase_type === 2) ? 'grid' : 'hidden'} gap-y-2 text-sm`}>
                <h1 className='font-medium'>Angsuran</h1>
                <input type='number' name='installment' defaultValue={value.installment || undefined} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
            </div>
        </>)
    }

    const Select = ({id}: {id: number | undefined}) => {
        return (
            <select name="employee-id" defaultValue={id} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none'>
                <option value={undefined}></option>
                {data_employee.map(item =>
                    <option key={item.id} value={item.id}>{item.name}</option>
                )}
            </select>
        )
    }

    return (
        <ModalAction name="Ubah administrasi" action={update_house_administration} success="Berhasil ubah administrasi" button_name="Ubah" button_type={2} setShowMirror={setShowMirror}>
            <>
                <input type="number" name="house-id" defaultValue={value.id} className="hidden" />
                <PurchaseType />
                <hr className="border-t border-slate-300 my-4" />
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>PPN</h1>
                    <input type='number' name='ppn' defaultValue={value.ppn || undefined} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Biaya Administrasi</h1>
                    <input type='number' name='administration' defaultValue={value.administration || undefined} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Diskon</h1>
                    <input type='number' name='discount' defaultValue={value.discount || undefined} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
                <hr className="border-t border-slate-300 my-4" />
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Marketing</h1>
                    <Select id={value.employee_id || undefined} />
                </div>
            </>
        </ModalAction>
    )
}