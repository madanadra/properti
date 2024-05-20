import { Metadata } from "next";
import Image from "next/image";
import Form from "./form";

export const metadata: Metadata = {
  title: "Masuk - Properti",
};

export default function Page() {
    return (
        <div className='grid gap-y-10 max-w-sm mx-auto py-12 px-4'>
            <Image src='properti.svg' alt='Logo' width={96} height={96} priority className='mx-auto' />
            <h1 className='text-2xl text-center font-bold'>Masuk ke Properti</h1>
            <Form />
        </div>
    )
}