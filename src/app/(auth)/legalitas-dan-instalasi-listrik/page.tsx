import Load from "@/app/_components/load";
import Search from "@/app/_components/search";
import { read_data } from "@/data";
import { ReadDataHouse, ReadDataLegality } from "@/typing";
import { Metadata } from "next";
import { Suspense } from "react";
import { PiCertificate, PiLightning } from "react-icons/pi";
import moment from "moment";
import Modal from "./modal";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Legalitas dan instalasi listrik - Properti",
};

export default function Page({searchParams}: {searchParams?: { [key: string]: string | string[] | undefined }}) {
  const search = searchParams?.s as string

  const Main = async () => {
    const house: {data?: ReadDataHouse, error?: string} = await read_data({name: 'read-data-house'})
    const legality: {data?: ReadDataLegality, error?: string} = await read_data({name: 'read-data-legality'})

    if (!house.data || house.error || !legality.data || legality.error) {
      return (
        <div className="grid gap-y-4 text-slate-600 text-center p-4">
          {house.error && <h1>{house.error}</h1>}
          {legality.error && <h1>{legality.error}</h1>}
        </div>
      )
    }

    const sorting = (a: ReadDataHouse[0], b: ReadDataHouse[0]) => {
      const value = a.house_block.name.toLowerCase().localeCompare(b.house_block.name.toLowerCase())

      if (value === 0) {
        if (Number(a.num) < Number(b.num)) return -1
        else if (Number(a.num) > Number(b.num)) return 1
        else return 0
      } else {
        return value
      }
    }

    const house_filter = house.data.sort(sorting).filter(item => search ? (item.house_block.name+'/'+item.num).toLowerCase().includes(search) : item)

    return (
      <div className="grid gap-y-6 p-4">
        <Search />
        {house_filter.length ? 
        <div className="divide-y divide-slate-300 bg-slate-50 rounded-md border border-slate-300">
          {house_filter.map(item => 
          <div key={item.id} className="flex items-center gap-x-4 p-4">
            <div className="grow grid gap-y-2">
              <div className="flex items-center gap-x-4">
                <Image src={item.house_status_id+'.svg'} alt='House' width={32} height={32} priority />
                <h1 className="grow">{item.house_block.name}/{item.num}</h1>
                <Modal value={item} data_legality={legality.data || []} />
              </div>
              <div className="grid sm:flex md:grid lg:flex gap-y-1 gap-x-6 text-sm font-medium">
                <div className="flex items-center gap-x-2">
                  <PiCertificate className="text-slate-600" />
                  <h1>{item.legality ? item.legality.name : '-'}</h1>
                </div>
                <div className="flex items-center gap-x-2">
                  <PiLightning className="text-slate-600" />
                  <h1>{item.electrical_installation ? moment(item.electrical_installation).format('DD/MM/YYYY') : '-'}</h1>
                </div>
              </div>
            </div>
          </div>)}
        </div>
        : search ? <h1 className="text-slate-600 text-center">Tidak ada hasil untuk &apos;<span className="text-slate-950">{search}</span>&apos;</h1> : 
        <div className="rounded-md border-2 border-dashed border-slate-300 p-4">
            <h1 className="text-slate-600 text-center">Belum ada data</h1>
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