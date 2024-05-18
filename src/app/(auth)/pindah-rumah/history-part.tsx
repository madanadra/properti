import { ReadDataMovingHouseHistory } from "@/typing";
import moment from "moment";

export default function HistoryPart({value}: {value: ReadDataMovingHouseHistory}) {
    return (
        <div className="grid gap-y-4">
            <h1 className="font-medium">Riwayat</h1>
            {value.length ?
            <div className="divide-y divide-slate-300 rounded-md bg-slate-50 border border-slate-300">
                {value.map(item => 
                    <div key={item.id} className="grid sm:flex md:grid lg:flex flex-row-reverse gap-y-1 gap-x-4 p-4 text-sm">
                        <h1 className="text-slate-600">{item.created_at ? moment(item.created_at).format('DD/MM/YYYY') : '-'}</h1>
                        <h1 className="grow">
                            <span className="font-medium">{item.customer.name} </span>
                            pindah dari
                            <span className="font-medium"> {item.from_house.house_block.name}/{item.from_house.num} </span>
                            ke
                            <span className="font-medium"> {item.to_house.house_block.name}/{item.to_house.num}</span>
                        </h1>
                    </div>   
                )}
            </div> :
            <div className="rounded-md border-2 border-dashed border-slate-300 p-4">
                <h1 className="text-slate-600 text-center">Belum ada riwayat</h1>
            </div>
            }
        </div>
    )
}