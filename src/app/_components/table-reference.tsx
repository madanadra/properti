import Search from "./search";

export default function TableReference({error, search, no_data, head, children, button}: {error?: string, search: string, no_data: boolean, head: string[], children: React.ReactNode, button: React.ReactNode}) {
    if (error) {
        return (
            <h1 className="text-slate-600 text-center p-4">{error}</h1>
        )
    }

    return (
        <div className="grid gap-y-6 p-4">
            <div className="flex items-center gap-x-4">
                <Search />
                {button}
            </div>
            {!no_data ? 
                <div className="bg-slate-50 rounded-md border border-slate-300 overflow-x-auto">
                    <table className="table-auto text-sm w-full">
                        <thead className="bg-slate-100 border-b border-slate-300">
                            <tr className="font-medium text-slate-600">
                                <td className="p-4">No.</td>
                                {head.map((item, i) =>
                                    <td key={i} className="p-4">{item}</td>
                                )}
                                <td className="p-4">Dibuat</td>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-300">
                            {children}
                        </tbody>
                    </table>
                </div>
            : search ? <h1 className="text-slate-600 text-center">Tidak ada hasil untuk &apos;<span className="text-slate-950">{search}</span>&apos;</h1> : 
            <div className="rounded-md border-2 border-dashed border-slate-300 p-4">
                <h1 className="text-slate-600 text-center">Belum ada data</h1>
            </div>}
        </div>
    )
}