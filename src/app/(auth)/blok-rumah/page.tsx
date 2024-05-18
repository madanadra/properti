import Load from "@/app/_components/load"
import { read_data } from "@/data"
import moment from "moment"
import { Suspense } from "react"
import { Metadata } from "next";
import { ReadDataHouseBlock } from "@/typing";
import TableReference from "@/app/_components/table-reference";
import Modal from "./modal";

export const metadata: Metadata = {
  title: "Blok rumah - Properti",
};

export default function Page({searchParams}: {searchParams?: { [key: string]: string | string[] | undefined }}) {
    const search = searchParams?.s as string

    const Main = async () => {
        const house_block: {data?: ReadDataHouseBlock, error?: string} = await read_data({name: 'read-data-house-block'})
        const house_block_filter = house_block.data?.filter(item => search ? item.name.toLowerCase().includes(search.toLowerCase()) : item)

        return (
            <TableReference error={house_block.error} search={search} no_data={!house_block_filter || !house_block_filter.length} head={['Nama']}
            button={<Modal />}>
                {house_block_filter?.map((item, i) =>
                    <tr key={item.id}>
                        <td className="p-4">{i+1}.</td>
                        <td className="p-4">{item.name}</td>
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