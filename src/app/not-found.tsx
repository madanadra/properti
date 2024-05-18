import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid gap-y-6 justify-items-center py-12 px-4">
      <img src='not-found.svg' className="w-52 aspect-square max-w-full" />
      <h1 className="tracking-wide font-bold text-4xl text-center">Halaman tidak ditemukan</h1>
      <h1 className="text-center text-slate-600">Periksa URL anda atau <Link href='/' className='text-blue-700 font-medium'>Kembali ke dashboard</Link></h1>
    </div>
  );
}
