import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Properti",
};

export default function Page() {
  return (
    <div className="grid gap-y-6 justify-items-center py-12 px-4">
      <Image src='not-found.svg' alt='Not found' width={208} height={208} priority className='aspect-square max-w-full' />
      <h1 className="tracking-wide font-bold text-4xl text-center">Halaman tidak ditemukan</h1>
      <h1 className="text-center text-slate-600">Periksa URL anda atau <Link href='/' className='text-blue-700 font-medium'>Kembali ke dashboard</Link></h1>
    </div>
  );
}
