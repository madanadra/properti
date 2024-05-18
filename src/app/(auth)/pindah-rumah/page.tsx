import Load from "@/app/_components/load";
import { read_data } from "@/data";
import { ReadDataHouse, ReadDataMovingHouseHistory } from "@/typing";
import { Metadata } from "next";
import { Suspense } from "react";
import HeaderPart from "./header-part";
import HistoryPart from "./history-part";

export const metadata: Metadata = {
  title: "Pindah rumah - Properti",
};

export default function Page() {
  const Main = async () => {
    const house: {data?: ReadDataHouse, error?: string} = await read_data({name: 'read-data-house'})
    const moving_house_history: {data?: ReadDataMovingHouseHistory, error?: string} = await read_data({name: 'read-data-moving-house-history'})

    if (!house.data || house.error || !moving_house_history.data || moving_house_history.error) {
      return (
        <div className="grid gap-y-4 text-slate-600 text-center p-4">
          {house.error && <h1>{house.error}</h1>}
          {moving_house_history.error && <h1>{moving_house_history.error}</h1>}
        </div>
      )
    }

    return (
      <div className="grid gap-y-6 p-4">
        <HeaderPart data_house={house.data} />
        <HistoryPart value={moving_house_history.data} />
      </div>
    )
  }

  return (
    <Suspense fallback={<div className="grid justify-center p-4"><Load size="large" /></div>}>
        <Main />
    </Suspense>
  )
}