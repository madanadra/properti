import { ReadHouse } from "@/typing";
import ModalEditHook from "./modal-edit-hook";
import { formatNumber } from "@/function";

export default function HookPart({value}: {value: ReadHouse}) {
    const land_excess = Number(value.hook_length)*Number(value.hook_wide)

    return (
        <div className="grid gap-y-4">
            <div className="flex items-center gap-x-4">
                <h1 className="grow font-medium">Hook</h1>
                <ModalEditHook value={value} />
            </div>
            <div className="grid divide-y divide-slate-300 rounded-md bg-slate-50 border border-slate-300 px-4">
                <div className="text-sm grid sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 items-start gap-y-2 gap-x-4 py-4">
                    <h1 className="text-slate-600">Kelebihan tanah</h1>
                    <div className="grid gap-y-2 sm:col-span-2 md:col-span-1 lg:col-span-2">
                        <h1 className="font-medium">{formatNumber(land_excess.toString())}m<sup>2</sup></h1>
                        {value.hook_length &&
                            <h1>
                                Panjang: {formatNumber(value.hook_length)}m
                            </h1>
                        }
                        {value.hook_wide &&
                            <h1>
                                Lebar: {formatNumber(value.hook_wide)}m
                            </h1>
                        }
                    </div>
                </div>
                <div className="text-sm grid sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 items-start gap-y-2 gap-x-4 py-4">
                    <h1 className="text-slate-600">Harga/m<sup>2</sup></h1>
                    <h1 className="font-medium sm:col-span-2 md:col-span-1 lg:col-span-2">{value.hook_square_price ? 'Rp'+value.hook_square_price.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : '-'}</h1>
                </div>
                <div className="text-sm grid sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 items-start gap-y-2 gap-x-4 py-4">
                    <h1 className="text-slate-600">Biaya strategis</h1>
                    <h1 className="font-medium sm:col-span-2 md:col-span-1 lg:col-span-2">{value.hook_strategic_fee ? 'Rp'+value.hook_strategic_fee.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : '-'}</h1>
                </div>
            </div>
        </div>
    )
}