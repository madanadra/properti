'use client'

import { update_legality_and_electrical_installation } from "@/action"
import { ReadDataHouse, ReadDataLegality } from "@/typing"
import ModalAction from "@/app/_components/modal-action"

export default function Modal({value, data_legality}: {value: ReadDataHouse[0], data_legality: ReadDataLegality}) {
    
    const Select = ({id}: {id: number | undefined}) => {
        return (
            <select name="legality-id" defaultValue={id} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none'>
                <option value={undefined}></option>
                {data_legality.map(item =>
                    <option key={item.id} value={item.id}>{item.name}</option>
                )}
            </select>
        )
    }

    return (
        <ModalAction name="Ubah legalitas dan instalasi listrik" action={update_legality_and_electrical_installation} success="Berhasil ubah legalitas dan instalasi listrik" button_name="Ubah" button_type={2}>
            <>
                <input type="number" name="house-id" defaultValue={value.id} className="hidden" />
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Legalitas</h1>
                    <Select id={value.legality_id} />
                </div>
                <div className='grid gap-y-2 text-sm'>
                    <h1 className='font-medium'>Instalasi listrik</h1>
                    <input type='date' name='electrical-installation' defaultValue={value.electrical_installation || ''} className='w-full bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                </div>
            </>
        </ModalAction>
    )
}