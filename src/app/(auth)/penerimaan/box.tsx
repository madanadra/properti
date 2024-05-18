import Load from "@/app/_components/load";
import { read_acceptance } from "@/data";
import { ReadReportAcceptance } from "@/typing";
import { Suspense } from "react";
import View from "./view";

export default function Box({from_date, until_date, payment_title_id}: {from_date: string, until_date: string , payment_title_id: string}) {
    const Main = async () => {
        const acceptance: {report?: ReadReportAcceptance, error?: string} = await read_acceptance({fd: from_date, ud: until_date, pti: payment_title_id})
    
        if (!acceptance.report || acceptance.error) {
            return (
                <div className="grid gap-y-4 text-slate-600 text-center p-4">
                    {acceptance.error && <h1>{acceptance.error}</h1>}
                </div>
            )
        }
    
        return (
            <div className="overflow-x-hidden">
                <View acceptance={acceptance.report} />
            </div>
        )
    }
    
    return (
        <Suspense fallback={<div className="grid justify-center p-4"><Load size="large" /></div>}>
            <Main />
        </Suspense>
    )
}