import Load from "@/app/_components/load";
import TableReference from "@/app/_components/table-reference";
import { read_data } from "@/data"
import { ReadDataNotary } from "@/typing";
import moment from "moment"
import { Metadata } from "next";
import { Suspense } from "react";
import Modal from "./modal";

export const metadata: Metadata = {
  title: "Notaris - Properti",
};

export default function Page({searchParams}: {searchParams?: { [key: string]: string | string[] | undefined }}) {
    const search = searchParams?.s as string

    const Main = async () => {
        const notary: {data?: ReadDataNotary, error?: string} = await read_data({name: 'read-data-notary'})
        const notary_filter = notary.data?.filter(item => search ? item.name.toLowerCase().includes(search.toLowerCase()) : item)

        return (
            <TableReference error={notary.error} search={search} no_data={!notary_filter || !notary_filter.length} head={['Nama']}
            button={<Modal />}>
                {notary_filter?.map((item, i) =>
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