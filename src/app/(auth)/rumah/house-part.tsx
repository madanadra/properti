'use client'

import { ReadDataCustomer, ReadDataHouseStatus, ReadHouse } from "@/typing";
import ModalBookingHouse from "./modal-booking-house";
import { continue_house } from "@/action";
import ModalAction from "@/app/_components/modal-action";
import { useState } from "react";
import moment from "moment";
import ModalResetStatus from "./modal-reset-status";
import ModalCancelHouse from "./modal-cancel-house";
import Image from "next/image";

export default function HousePart(
    {value, data_customer, data_house_status}: 
    {value: ReadHouse, data_customer: ReadDataCustomer, data_house_status: ReadDataHouseStatus}
) {
    const booking_date = value.payments.filter(item => item.payment_title_id === 1)[0]?.created_at

    const Continue = ({name, house_status_id, special}: {name: string, house_status_id: number, special?: boolean}) => {
        const [choice, setChoice] = useState<number>(house_status_id)

        return (<>
            <input type="number" name="house-id" defaultValue={value.id} className="hidden" />
            <input type="number" name="house-status-id" defaultValue={choice} className="hidden" />
            {special ? 
                <div className="grid gap-y-2 text-sm">
                    <div className="flex items-center cursor-pointer w-max">
                        <input type="radio" id='kpr' value={9} name="choice" defaultChecked={choice === 9} onChange={(e) => setChoice(Number(e.target.value))}
                        className="cursor-pointer" />
                        <label htmlFor='kpr' className="font-medium pl-2.5 cursor-pointer">Akad via KPR</label>
                    </div>
                    <div className="flex items-center cursor-pointer w-max">
                        <input type="radio" id='cash' value={10} name="choice" defaultChecked={choice === 10} onChange={(e) => setChoice(Number(e.target.value))}
                        className="cursor-pointer" />
                        <label htmlFor='cash' className="font-medium pl-2.5 cursor-pointer">Akad via cash</label>
                    </div>
                </div> :
                <h1 className="text-xl">Memasuki tahap {name}?</h1>
            }
        </>)
    }

    const Box = ({name, value}: {name: string, value: string | null}) => {
        return (value &&
            <div className="text-sm flex justify-between items-center gap-x-4 rounded-md bg-slate-50 border border-slate-300 p-4">
                <h1 className="text-slate-600">{name}</h1>
                <h1 className="font-medium">{moment(value).format('DD/MM/YYYY')}</h1>
            </div>
        )
    }

    return (
        <div className="grid gap-y-4">
            <div className="grid sm:flex md:grid lg:flex gap-y-6 gap-x-4 rounded-md bg-slate-50 border border-slate-300 p-4">
                <div className="grow flex items-center gap-x-6">
                    <Image src={value.house_status.id+'.svg'} alt='House' width={80} height={80} priority
                    className="aspect-square" />
                    <div>
                        <h1 className="text-2xl font-medium">{value.house_block.name}/{value.num}</h1>
                        <h1 className="text-slate-600 font-semibold">{value.house_status.name}</h1>
                    </div>
                </div>
                <div className="flex sm:flex-row-reverse md:flex-row lg:flex-row-reverse gap-x-4 items-center">
                    <ModalBookingHouse value={value} data_customer={data_customer} />
                    <ModalAction name="Pemberkasan" action={continue_house} submit="Lanjut" success="Berhasil pemberkasan" button_type={1} hide={value.house_status_id !== 4}>
                        <Continue name="pemberkasan" house_status_id={5} />
                    </ModalAction>
                    <ModalAction name="Wawancara" action={continue_house} submit="Lanjut" success="Berhasil wawancara" button_type={1} hide={value.house_status_id !== 5}>
                        <Continue name="wawancara" house_status_id={6} />
                    </ModalAction>
                    <ModalAction name="OTS" action={continue_house} submit="Lanjut" success="Berhasil OTS" button_type={1} hide={value.house_status_id !== 6}>
                        <Continue name="OTS" house_status_id={7} />
                    </ModalAction>
                    <ModalAction name="SP3K" action={continue_house} submit="Lanjut" success="Berhasil SP3K" button_type={1} hide={value.house_status_id !== 7}>
                        <Continue name="SP3K" house_status_id={8} />
                    </ModalAction>
                    <ModalAction name="Akad" action={continue_house} success="Berhasil akad" button_type={1} hide={value.house_status_id !== 8}>
                        <Continue name="akad" house_status_id={9} special />
                    </ModalAction>
                    <ModalResetStatus value={value} data_house_status={data_house_status} />
                    <ModalCancelHouse value={value} />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
                <Box name="Booking" value={booking_date} />
                <Box name="Pemberkasan" value={value.pemberkasan} />
                <Box name="Wawancara" value={value.wawancara} />
                <Box name="OTS" value={value.ots} />
                <Box name="SP3K" value={value.sp3k} />
                <Box name="Akad" value={value.akad} />
            </div>
        </div>
    )
}