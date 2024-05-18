import { ReadDataHouseBlock, ReadDataHouseType, ReadHouse } from "@/typing";
import ModalEditHouse from "./modal-edit-house";
import moment from "moment";
import { formatNumber } from "@/function";

export default function DetailPart(
    {value, data_house_block, data_house_type}: 
    {value: ReadHouse, data_house_block: ReadDataHouseBlock, data_house_type: ReadDataHouseType}
) {
    return (
        <div className="grid gap-y-4">
            <div className="flex items-center gap-x-4">
                <h1 className="grow font-medium">Detail</h1>
                <ModalEditHouse value={value} data_house_block={data_house_block} data_house_type={data_house_type} />
            </div>
            <div className="grid divide-y divide-slate-300 rounded-md bg-slate-50 border border-slate-300 px-4">
                <div className="text-sm grid sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 items-start gap-y-2 gap-x-4 py-4">
                    <h1 className="text-slate-600">ID</h1>
                    <h1 className="font-medium sm:col-span-2 md:col-span-1 lg:col-span-2">{value.id}</h1>
                </div>
                <div className="text-sm grid sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 items-start gap-y-2 gap-x-4 py-4">
                    <h1 className="text-slate-600">Tipe</h1>
                    <div className="grid gap-y-2 sm:col-span-2 md:col-span-1 lg:col-span-2">
                            <h1 className="font-medium">{formatNumber(value.house_type.building)}/{formatNumber(value.house_type.land)}</h1>
                            <h1>
                                Luas bangunan: {formatNumber(value.house_type.building)}m<sup>2</sup>
                            </h1>
                            <h1>
                                Luas tanah: {formatNumber(value.house_type.land)}m<sup>2</sup>
                            </h1>
                        </div>
                </div>
                <div className="text-sm grid sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 items-start gap-y-2 gap-x-4 py-4">
                    <h1 className="text-slate-600">Harga</h1>
                    <h1 className="font-medium sm:col-span-2 md:col-span-1 lg:col-span-2">Rp{formatNumber(value.price)}</h1>
                </div>
                <div className="text-sm grid sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 items-start gap-y-2 gap-x-4 py-4">
                    <h1 className="text-slate-600">Biaya booking</h1>
                    <h1 className="font-medium sm:col-span-2 md:col-span-1 lg:col-span-2">Rp{formatNumber(value.booking_fee)}</h1>
                </div>
                <div className="text-sm grid sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 items-start gap-y-2 gap-x-4 py-4">
                    <h1 className="text-slate-600">Dibuat</h1>
                    <h1 className="font-medium sm:col-span-2 md:col-span-1 lg:col-span-2">{value.created_at ? moment(value.created_at).format('DD/MM/YYYY') : '-'}</h1>
                </div>
            </div>
        </div>
    )
}