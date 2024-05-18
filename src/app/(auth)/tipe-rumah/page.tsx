import Load from "@/app/_components/load";
import TableReference from "@/app/_components/table-reference";
import { read_data } from "@/data"
import { ReadDataHouseType } from "@/typing";
import moment from "moment"
import { Metadata } from "next";
import { Suspense } from "react";
import Modal from "./modal";

export const metadata: Metadata = {
  title: "Tipe rumah - Properti",
};

export default async function Page({searchParams}: {searchParams?: { [key: string]: string | string[] | undefined }}) {
    const search = searchParams?.s as string

    const Main = async () => {
        const house_type: {data?: ReadDataHouseType, error?: string} = await read_data({name: 'read-data-house-type'})
        const house_type_filter = house_type.data?.filter(item => search ? (item.building.replace(/\.?0+$/, '')+'/'+item.land.replace(/\.?0+$/, '')).toLowerCase().includes(search.toLowerCase()) : item)

        return (
            <TableReference error={house_type.error} search={search} no_data={!house_type_filter || !house_type_filter.length} head={['Nama', 'Bangunan', 'Tanah']}
            button={<Modal />}>
                {house_type_filter?.map((item, i) =>
                    <tr key={item.id}>
                        <td className="p-4">{i+1}.</td>
                        <td className="p-4">{item.building.replace(/\.?0+$/, '')}/{item.land.replace(/\.?0+$/, '')}</td>
                        <td className="p-4">{item.building.replace(/\.?0+$/, '')}m<sup>2</sup></td>
                        <td className="p-4">{item.land.replace(/\.?0+$/, '')}m<sup>2</sup></td>
                        <td className="p-4">{item.created_at ? moment(item.created_at).format('DD/MM/YYYY') : '-'}</td>
                    </tr>
                )}
            </TableReference>
        )
    }

    return (
        <Suspense fallback={<div className="grid justify-center p-4"><Load size="large" /></div>}>
            <Main />
        </Suspense>
    )
}