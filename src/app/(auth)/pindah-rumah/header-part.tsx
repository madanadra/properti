'use client'

import { ReadDataHouse } from "@/typing"
import { useEffect, useState } from "react"
import { PiArrowsOutCardinal } from "react-icons/pi"
import Modal from "./modal"

export default function HeaderPart({data_house}: {data_house: ReadDataHouse}) {
  const [id, setId] = useState<number>(data_house[0].id)
  const [from, setFrom] = useState<ReadDataHouse[0]>(data_house[0]) 

  useEffect(() => {
    const house = data_house.find(item => item.id === id)

    house ? setFrom(house) : setId(data_house[0].id)
  }, [data_house, id])

  return (
    <div className="flex items-center gap-x-4">
      <div className="grow flex items-center relative">
        <PiArrowsOutCardinal className="text-lg text-slate-600 absolute left-3 pointer-events-none" />
        <select value={id} onChange={(e) => setId(Number(e.target.value))} 
        className='w-full text-sm bg-slate-50 rounded-md py-2 pl-10 pr-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none'>
          {data_house.map(item =>
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