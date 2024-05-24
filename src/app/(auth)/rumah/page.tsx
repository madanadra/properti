import Load from "@/app/_components/load";
import { read_data } from "@/data";
import { Suspense } from "react";
import { Metadata } from "next";
import HousePart from "./house-part";
import HookPart from "./hook-part";
import CustomerPart from "./customer-part";
import PaymentPart from "./payment-part";
import AdministrationPart from "./administration-part";
import { ReadDataCustomer, ReadDataEmployee, ReadDataHouseBlock, ReadDataHouseStatus, ReadDataHouseType, ReadDataPaymentTitle, ReadDataPurchaseType, ReadHouse } from "@/typing";
import DetailPart from "./detail-part";
import PaymentHistoryPart from "./payment-history-part";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Rumah - Properti",
};

export default function Page({searchParams}: {searchParams?: { [key: string]: string | string[] | undefined }}) {
    const id = searchParams?.v as string

    const Main = async () => {
        const house: {data?: ReadHouse, error?: string} = await read_data({name: 'read-house', id: id})
        const house_status: {data?: ReadDataHouseStatus, error?: string} = await read_data({name: 'read-data-house-status'})
        const house_block: {data?: ReadDataHouseBlock, error?: string} = await read_data({name: 'read-data-house-block'})
        const house_type: {data?: ReadDataHouseType, error?: string} = await read_data({name: 'read-data-house-type'})
        const customer: {data?: ReadDataCustomer, error?: string} = await read_data({name: 'read-data-customer'})
        const employee: {data?: ReadDataEmployee, error?: string} = await read_data({name: 'read-data-employee'})
        const payment_title: {data?: ReadDataPaymentTitle, error?: string} = await read_data({name: 'read-data-payment-title'})
        const purchase_type: {data?: ReadDataPurchaseType, error?: string} = await read_data({name: 'read-data-purchase-type'})

        if (!house.data || house.error || !house_status.data || house_status.error || !house_block.data || house_block.error || 
            !house_type.data || house_type.error || !customer.data || customer.error || 
            !employee.data || employee.error || !payment_title.data || payment_title.error || !purchase_type.data || 
            purchase_type.error) {
            if (house.error === 'read-house 404') {
                return (
                    <div className="rounded-md border-2 border-dashed border-slate-300 p-4 m-4">
                        <h1 className="text-slate-600 text-center">Rumah tidak ditemukan</h1>
                    </div>
                )
            }

            return (
                <div className="grid gap-y-4 text-slate-600 text-center p-4">
                    {house.error && <h1>{house.error}</h1>}
                    {house_status.error && <h1>{house_status.error}</h1>}
                    {house_block.error && <h1>{house_block.error}</h1>}
                    {house_type.error && <h1>{house_type.error}</h1>}
                    {customer.error && <h1>{customer.error}</h1>}
                    {employee.error && <h1>{employee.error}</h1>}
                    {payment_title.error && <h1>{payment_title.error}</h1>}
                    {purchase_type.error && <h1>{purchase_type.error}</h1>}
                </div>
            )
        }

        return (
            <div className="grid gap-y-6 p-4">
                <HousePart value={house.data} data_customer={customer.data} data_house_status={house_status.data} />
                <DetailPart value={house.data} data_house_block={house_block.data} data_house_type={house_type.data} />
                <HookPart value={house.data} />
                {house.data.house_status_id < 4 && !house.data.customer ? 
                    <div className="grid gap-y-4 justify-items-center py-8 px-4 rounded-md border-2 border-dashed border-slate-300">
                        <Image src='empty-house.svg' alt='Empty house' width={208} height={208} priority
                        className="aspect-square max-w-full" />
                        <h1 className="text-lg text-center text-slate-600">Rumah belum booking</h1>
                    </div> : <>
                    <CustomerPart value={house.data} />
                    <AdministrationPart value={house.data} data_employee={employee.data} data_purchase_type={purchase_type.data} />
                    <PaymentPart value={house.data} data_payment_title={payment_title.data} />
                    <PaymentHistoryPart value={house.data} data_payment_title={payment_title.data} />
                </>}
            </div>
        )
    }

    return (
        <Suspense fallback={<div className="grid justify-center p-4"><Load size="large" /></div>}>
            <Main />
        </Suspense>
    )
}