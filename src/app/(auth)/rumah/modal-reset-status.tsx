'use client'

import ModalAction from "@/app/_components/modal-action"
import { reset_status } from "@/action"
import { ReadDataHouseStatus, ReadHouse } from "@/typing"

export default function ModalResetStatus({value, data_house_status}: {value: ReadHouse, data_house_status: ReadDataHouseStatus}) {
    return (
        <ModalAction name="Reset status" action={reset_status} success="Berhasil reset status" submit="Reset" button_name="Status" button_type={2} hide={value.house_status_id > 3}>
            <>
                <input type="number" name="house-id" defaultValue={value.id} className="hidden" />
                <div className="grid gap-y-2 text-sm">
                    {data_house_status.filter(item => item.id <= 3).map(item => 
                        <div key={item.id} className="flex items-center cursor-pointer w-max">
                            <input type="radio" id={item.name} name="house-status-id" value={item.id} defaultChecked={value.house_status_id === item.id} 
                            className="cursor-pointer" />
                            <label htmlFor={item.name} className="font-medium pl-2.5 cursor-pointer">{item.name}</label>
                        </div>
                    )}
                </div>
            </>
        </ModalAction>
    )
}