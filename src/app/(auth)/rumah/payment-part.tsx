import { ReadDataPaymentTitle, ReadHouse } from "@/typing";
import { formatNumber } from "@/function";
import { PiCheck, PiX } from "react-icons/pi";
import ModalCreatePayment from "./modal-create-payment";

export default function PaymentPart({value, data_payment_title}: {value: ReadHouse, data_payment_title: ReadDataPaymentTitle}) {
    const payment = (input: number) => {
        const output = value.payments.filter(item => item.payment_title_id === input)
        .reduce((acc, curr) => acc + Number(curr.value), 0)

        return output
    }

    const total1 = Number(value.booking_fee)
    const total2 = value.purchase_type_id === 1 ? Number(value.price)+Number(value.ppn)-Number(value.discount)-Number(value.kpr_max) : 0
    const total3 = value.purchase_type_id === 1 ? Number(value.kpr_max) : 0
    const total4 = value.purchase_type_id === 2 ? Number(value.price)+Number(value.ppn)-Number(value.discount) : 0
    const total5 = value.purchase_type_id === 3 ? Number(value.price)+Number(value.ppn)-Number(value.discount) : 0
    const total6 = (Number(value.hook_length)*Number(value.hook_wide)*Number(value.hook_square_price))+Number(value.hook_strategic_fee)
    const total7 = Number(value.administration)
    const remaining1 = total1-payment(1)
    const remaining2 = total2-payment(2)
    const installment3 = Math.floor(payment(3)/(total3/Number(value.installment)))
    const installment4 = Math.floor(payment(4)/(total4/Number(value.installment)))
    const remaining5 = total5-payment(5)
    const remaining6 = total6-payment(6)
    const remaining7 = total7-payment(7)

    const Card = ({id, name, total, remaining, installment}: {id: number, name: string, total: number, remaining?: number, installment?: number}) => {
        const paid = payment(id)
        const percent = Math.floor(paid/total*100)
        
        return ((paid !== 0 || total !== 0) &&
            <div className="text-sm grid divide-y divide-slate-300 rounded-md bg-slate-50 border border-slate-300">
                <div className="flex justify-between items-center gap-x-4 rounded-t-md bg-slate-100 p-4">
                    <div className="grid gap-y-1">
                        <h1 className="font-medium">{name}</h1>
                        <h1 className="text-slate-600">Rp{formatNumber(paid.toString())}</h1>
                    </div>
                    {percent < 100 ? <h1 className="text-lg text-slate-600">{formatNumber(percent.toString())}%</h1> 
                    : percent === 100 ? <PiCheck className="text-lg text-green-700" /> :
                    <PiX className="text-lg text-red-700" />
                    }
                </div>
                <div className="grid divide-y divide-slate-300 px-4">
                    <div className="flex gap-x-4 justify-between items-center py-4">
                        <h1 className="text-slate-600">Total</h1>
                        {typeof installment === 'number' && value.installment ? 
                            <h1 className="font-medium">Rp{formatNumber((total/Number(value.installment)).toString())} &times;{value.installment}</h1> :
                            <h1 className="font-medium">Rp{formatNumber(total.toString())}</h1>
                        }
                    </div>
                    {typeof remaining === 'number' && 
                        <div className="flex gap-x-4 justify-between items-center py-4">
                            <h1 className="text-slate-600">Sisa</h1>
                            <h1 className="font-medium">Rp{formatNumber(remaining.toString())}</h1>
                        </div>
                    }
                    {typeof installment === 'number' && 
                        <div className="flex gap-x-4 justify-between items-center py-4">
                            <h1 className="text-slate-600">Angsuran</h1>
                            <h1 className="font-medium">{installment}/{value.installment || '-'}</h1>
                        </div>
                    }
                </div>
            </div>
        )
    }
    
    return (
        <div className="grid gap-y-4">
            <div className="flex items-center gap-x-4">
                <h1 className="grow font-medium">Pembayaran</h1>
                <ModalCreatePayment value={value} data_payment_title={data_payment_title} /> 
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
                <Card id={1} name="Booking" total={total1} remaining={remaining1} />
                <Card id={2} name="Uang muka" total={total2} remaining={remaining2} />
                <Card id={3} name="KPR" total={total3} installment={installment3} />
                <Card id={4} name="Cash bertahap" total={total4} installment={installment4} />
                <Card id={5} name="Cash keras" total={total5} remaining={remaining5} />
                <Card id={6} name="Hook" total={total6} remaining={remaining6} />
                <Card id={7} name="Administrasi" total={total7} remaining={remaining7} />
            </div>
        </div>
    )
}