'use client'

import { ReadDataHouse } from "@/typing"
import { useEffect, useState } from "react"
import { PiArrowsOutCardinal } from "react-icons/pi"
import Modal from "./modal"

export default function HeaderPart({data_house}: {data_house: ReadDataHouse}) {
  const house_available = data_house.filter(item => item.house_status_id > 3 && item.house_status_id < 9)

  if (!house_available.length) {
    return (
      <div className="rounded-md border-2 border-dashed border-slate-300 p-4">
        <h1 className="text-slate-600 text-center">Semua rumah belum booking</h1>
      </div>
    )
  }

  const [id, setId] = useState<number>(house_available[0].id)
  const [from, setFrom] = useState<ReadDataHouse[0]>(house_available[0]) 

  useEffect(() => {
    const house = house_available.find(item => item.id === id)

    house ? setFrom(house) : setId(house_available[0].id)
  }, [house_available, id])

  return (
    <div className="flex items-center gap-x-4">
      <div className="grow flex items-center relative">
        <PiArrowsOutCardinal className="text-lg text-slate-600 absolute left-3 pointer-events-none" />
        <select value={id} onChange={(e) => setId(Number(e.target.value))} 
        className='w-full text-sm bg-slate-50 rounded-md py-2 pl-10 pr-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none'>
          {house_available.map(item =>
            <option key={item.id} value={item.id}>
              {item.house_block.name}/{item.num} {item.customer && '('+item.customer.name+')'}
            </option>  
          )}
        </select>
      </div>
      <Modal value={from} data_house={data_house} />
    </div>
  )
}