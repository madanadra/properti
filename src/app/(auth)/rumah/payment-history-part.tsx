import { ReadDataPaymentTitle, ReadHouse } from "@/typing";
import moment from "moment";
import ModalUpdatePayment from "./modal-update-payment";

export default function PaymentHistoryPart({value, data_payment_title}: {value: ReadHouse, data_payment_title: ReadDataPaymentTitle}) {
    return (value.payments.length ?
        <div className="grid gap-y-4">
            <div className="flex items-center gap-x-4">
                <h1 className="grow font-medium">Riwayat pembayaran</h1>
                <ModalUpdatePayment data_payment={value.payments} data_payment_title={data_payment_title} />
            </div> 
            <div className="divide-y divide-slate-300 rounded-md bg-slate-50 border border-slate-300">
                {value.payments.map(item => 
                    <div key={item.id} className="grid gap-y-1 p-4 text-sm">
                        <h1 className="text-slate-600">ID {item.id}</h1>
                        <div className="flex gap-x-4 justify-between items-center">
                            <h1 className="font-medium">{item.payment_title.name}</h1>
                            <h1 className="text-slate-600">{item.created_at ? moment(item.created_at).format('DD/MM/YYYY') : '-'}</h1>
                        </div>
                        <h1 className="text-slate-600">{'Rp'+item.value.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ({item.payment_via})</h1>
                        {item.desc && <h1 className="text-slate-600">{item.desc}</h1>}
                    </div>   
                )}
            </div>
        </div> : []
    )
}