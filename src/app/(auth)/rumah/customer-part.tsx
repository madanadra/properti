import { ReadHouse } from "@/typing";
import ModalDetailCustomer from "./modal-detail-customer";

export default function CustomerPart({value}: {value: ReadHouse}) {
    return (value.customer ?
        <div className="grid gap-y-4">
            <div className="flex items-center gap-x-4">
                <h1 className="grow font-medium">Konsumen</h1>
                <ModalDetailCustomer value={value} />
            </div>
            <div className="grid divide-y divide-slate-300 rounded-md bg-slate-50 border border-slate-300 px-4">
                <div className="text-sm grid sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 items-start gap-y-2 gap-x-4 py-4">
                    <h1 className="text-slate-600">ID</h1>
                    <h1 className="font-medium sm:col-span-2 md:col-span-1 lg:col-span-2">{value.customer_id}</h1>
                </div>
                <div className="text-sm grid sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 items-start gap-y-2 gap-x-4 py-4">
                    <h1 className="text-slate-600">Nama</h1>
                    <h1 className="font-medium sm:col-span-2 md:col-span-1 lg:col-span-2">{value.customer.name}</h1>
                </div>
                <div className="text-sm grid sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 items-start gap-y-2 gap-x-4 py-4">
                    <h1 className="text-slate-600">No. tel</h1>
                    <h1 className="font-medium sm:col-span-2 md:col-span-1 lg:col-span-2">{value.customer.tel}</h1>
                </div>
                <div className="text-sm grid sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 items-start gap-y-2 gap-x-4 py-4">
                    <h1 className="text-slate-600">Email</h1>
                    <h1 className="font-medium sm:col-span-2 md:col-span-1 lg:col-span-2">{value.customer.email || '-'}</h1>
                </div>
                <div className="text-sm grid sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 items-start gap-y-2 gap-x-4 py-4">
                    <h1 className="text-slate-600">Properti</h1>
                    <h1 className="font-medium sm:col-span-2 md:col-span-1 lg:col-span-2">{value.customer.houses_count}</h1>
                </div>
            </div>
        </div> : []
    )
}