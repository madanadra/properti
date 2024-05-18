import { read_data } from "@/data";
import Link from "next/link";
import { Suspense } from "react";
import Load from "../_components/load";
import { Metadata } from "next";
import { ReadDataHouse, ReadDataHouseBlock, ReadDataHouseStatus, ReadDataHouseType } from "@/typing";
import Search from "../_components/search";
import Modal from "./modal";

export const metadata: Metadata = {
  title: "Dashboard - Properti",
};

export default function Page({searchParams}: {searchParams?: { [key: string]: string | string[] | undefined }}) {
  const search = searchParams?.s as string

  const Main = async () => {
    const house: {data?: ReadDataHouse, error?: string} = await read_data({name: 'read-data-house'})
    const house_block: {data?: ReadDataHouseBlock, error?: string} = await read_data({name: 'read-data-house-block'})
    const house_status: {data?: ReadDataHouseStatus, error?: string} = await read_data({name: 'read-data-house-status'})
    const house_type: {data?: ReadDataHouseType, error?: string} = await read_data({name: 'read-data-house-type'})

    if (!house.data || house.error || !house_block.data || house_block.error || !house_status.data || house_status.error || !house_type.data || house_type.error) {
      return (
          <div className="grid gap-y-4 text-slate-600 text-center p-4">
              {house.error && <h1>{house.error}</h1>}
              {house_block.error && <h1>{house_block.error}</h1>}
              {house_status.error && <h1>{house_status.error}</h1>}
              {house_type.error && <h1>{house_type.error}</h1>}
          </div>
      )
    }

    const house_filter = house.data.sort((a, b) => a.house_block.name.toLowerCase().localeCompare(b.house_block.name.toLowerCase())).filter(item => search ? (item.house_block.name+'/'+item.num).toLowerCase().includes(search) : item).reduce((acc, obj) => {
      const key = obj.house_block['name']
      const groupIndex = acc.findIndex(group => group[0] && group[0].house_block['name'] === key);
      if (groupIndex !== -1) {
        acc[groupIndex].push(obj);
      } else {
        acc.push([obj]);
      }
      return acc;
    }, [] as ReadDataHouse[])

    return (
      <div className="grid gap-y-6 p-4">
        <div className="flex items-center gap-x-4">
          <Search />
          <Modal data_house_block={house_block.data} data_house_status={house_status.data} data_house_type={house_type.data} />
        </div>
        {house_filter.length ? 
          house_filter.map((item, i) => 
          <div className="grid gap-y-4">
            <h1 className="text-slate-600 text-sm font-medium">Blok {item[0].house_block.name}</h1>
            <div key={i} className="divide-y divide-slate-300 bg-slate-50 rounded-md border border-slate-300">
              {item.sort((a, b) => Number(a.num) - Number(b.num)).map(item => 
                <Link key={item.id} href={'/rumah/?v='+item.id} className="flex items-center gap-x-6 p-4 hover:bg-slate-200">
                  <img src={'./'+item.house_status_id+'.svg'} className="w-12" />
                  <div className="grid sm:flex md:grid lg:flex gap-x-4 w-full">
                    <h1 className="grow font-medium">{item.house_block.name}/{item.num}</h1>
                    <h1 className="text-slate-600">{item.house_status.name}</h1>
                  </div>
                </Link>
              )}
            </div>
          </div>) 
        : search ? <h1 className="text-slate-600 text-center">Tidak ada hasil untuk '<span className="text-slate-950">{search}</span>'</h1> : 
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
  );
}
