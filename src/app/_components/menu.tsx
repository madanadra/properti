'use client'

import Image from "next/image";
import Link from "next/link";
import FormLogOut from "./form-log-out";
import { usePathname } from "next/navigation";
import { ReadUser } from "@/typing";

export default function Menu({user}: {user: ReadUser}) {
    const url = usePathname()

    const Nav = ({name}: {name: string}) => {
        const to = name === 'Dashboard' ? '/' : '/'+name.replace(/ /g, '-').toLowerCase()
        const page = name === 'Dashboard' ? ['/', '/rumah'] : ['/'+name.replace(/ /g, '-').toLowerCase()]

        return (
            <Link href={to} 
            className={`${page.includes(url) ? 'bg-slate-200' : 'hover:bg-slate-200 hover:text-slate-950 text-slate-600'} 
            text-sm font-medium rounded-md px-4 py-2`}>
                {name}
            </Link>
        )
    }

    return (
        <div className="grid content-start gap-y-4 bg-slate-50 h-dvh py-4">
            <Link href='/' className="flex items-center gap-x-2.5 px-6 h-16">
                <Image src='properti.svg' alt="Logo" width={25} height={25} priority />
                <h1 className="text-xl font-semibold">Properti</h1>
            </Link>
            <div className="grid gap-y-4 px-2 overflow-y-auto">
                <div className="grid">
                    <Nav name="Dashboard" />
                </div>
                <div className="grid">
                    <h1 className="font-bold text-xs pb-2.5 pt-4 px-4">Referensi</h1>
                    <Nav name="Blok rumah" />
                    <Nav name="Tipe rumah" />
                    <Nav name="Pegawai" />
                    <Nav name="Notaris" />
                </div>
                <div className="grid">
                    <h1 className="font-bold text-xs pb-2.5 pt-4 px-4">Operasi</h1>
                    <Nav name="Pindah rumah" />
                    <Nav name="Legalitas dan instalasi listrik" />
                </div>
                <div className="grid">
                    <h1 className="font-bold text-xs pb-2.5 pt-4 px-4">Laporan</h1>
                    <Nav name="Penerimaan" />
                    <Nav name="Detail piutang" />
                    <Nav name="Data rumah" />
                </div>
                <div className="grid">
                    <h1 className="font-bold text-xs pb-2.5 pt-4 px-4">Akun</h1>
                    <Nav name="Ubah password" />
                    <Nav name="Buat akun" />
                </div>
                <div className="grid gap-y-2 py-4">
                    <h1 className="bg-slate-200 rounded-md text-center text-sm font-medium px-4 py-2">{user.username} &middot; ID {user.id}</h1>
                    <FormLogOut />
                    <h1 className="text-xs text-slate-600 p-4">v.1.0</h1>
                </div>
            </div>
        </div>
    )
}