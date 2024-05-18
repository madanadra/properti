import { ReadDataEmployee, ReadDataPurchaseType, ReadHouse } from "@/typing";
import ModalEditAdministration from "./modal-edit-administration";
import { formatNumber } from "@/function";

export default function AdministrationPart({value, data_employee, data_purchase_type}: {value: ReadHouse, data_employee: ReadDataEmployee, data_purchase_type: ReadDataPurchaseType}) {
    return (
        <div className="grid gap-y-4">
            <div className="flex items-center gap-x-4">
                <h1 className="grow font-medium">Administrasi</h1>
                <ModalEditAdministration value={value} data_employee={data_employee} data_purchase_type={data_purchase_type} />
            </div>
            <div className="grid divide-y divide-slate-300 rounded-md bg-slate-50 border border-slate-300 px-4">
                <div className="text-sm grid sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 items-start gap-y-2 gap-x-4 py-4">
                    <h1 className="text-slate-600">Jenis pembelian</h1>
                    <div className="grid gap-y-2 sm:col-span-2 md:col-span-1 lg:col-span-2">
                        <h1 className="font-medium">
                            {value.purchase_type ? value.purchase_type.name : '-'}
                        </h1>
                        {value.bank &&
                            <h1>
                                Bank: {value.bank}
                            </h1>
                        }
                        {value.installment &&
                            <h1 className="flex items-center">
                                Angsuran: {value.installment}&times;
                            </h1>
                        }
                        {value.kpr_max &&
                            <h1>
                                Maks KPR: Rp{formatNumber(value.kpr_max)}
                            </h1>
                        }
                    </div>
                </div>
                <div className="text-sm grid sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 items-start gap-y-2 gap-x-4 py-4">
                    <h1 className="text-slate-600">PPN</h1>
                    <h1 className="font-medium sm:col-span-2 md:col-span-1 lg:col-span-2">{value.ppn ? 'Rp'+value.ppn.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : '-'}</h1>
                </div>
                <div className="text-sm grid sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 items-start gap-y-2 gap-x-4 py-4">
                    <h1 className="text-slate-600">Biaya Administrasi</h1>
                    <h1 className="font-medium sm:col-span-2 md:col-span-1 lg:col-span-2">{value.administration ? 'Rp'+value.administration.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : '-'}</h1>
                </div>
                <div className="text-sm grid sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 items-start gap-y-2 gap-x-4 py-4">
                    <h1 className="text-slate-600">Diskon</h1>
                    <h1 className="font-medium sm:col-span-2 md:col-span-1 lg:col-span-2">{value.discount ? 'Rp'+value.discount.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : '-'}</h1>
                </div>
                <div className="text-sm grid sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 items-start gap-y-2 gap-x-4 py-4">
                    <h1 className="text-slate-600">Marketing</h1>
                    <h1 className="font-medium sm:col-span-2 md:col-span-1 lg:col-span-2">{value.employee ? value.employee.name : '-'}</h1>
                </div>
            </div>
        </div>
    )
}