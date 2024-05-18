import { Metadata } from "next";
import FormAction from "./form";
import { ReadDataPaymentTitle } from "@/typing";
import { read_data } from "@/data";
import { Suspense } from "react";
import Load from "@/app/_components/load";
import Box from "./box";

export const metadata: Metadata = {
  title: "Penerimaan - Properti",
};

export default function Page({searchParams}: {searchParams?: { [key: string]: string | string[] | undefined }}) {
  const from_date = searchParams?.fd as string
  const until_date = searchParams?.ud as string
  const payment_title_id = searchParams?.pti as string

  const Main = async () => {
    const payment_title: {data?: ReadDataPaymentTitle, error?: string} = await read_data({name: 'read-data-payment-title'})

    if (!payment_title.data || payment_title.error) {
        return (
            <div className="grid gap-y-4 text-slate-600 text-center p-4">
                {payment_title.error && <h1>{payment_title.error}</h1>}
            </div>
        )
    }

    return (
      <div className="grid gap-y-6 p-4">
        <FormAction data_payment_title={payment_title.data} from_date={from_date} until_date={until_date} payment_title_id={payment_title_id} />
        {from_date || until_date || payment_title_id ? 
        <Box from_date={from_date} until_date={until_date} payment_title_id={payment_title_id} /> : 
        <div className="rounded-md border-2 border-dashed border-slate-300 p-4">
            <h1 className="text-slate-600 text-center">Belum ada dokumen</h1>
        </div>}
      </div>
    )
  }

  return (
    <Suspense fallback={<div className="grid justify-center p-4"><Load size="large" /></div>}>
      <Main />
    </Suspense>
  )
}