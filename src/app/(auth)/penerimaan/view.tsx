'use client'

import { useEffect, useRef, useState } from 'react';
import { BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';
import { Document, Page, pdfjs } from 'react-pdf';
import Create from './pdf';
import { ReadReportAcceptance } from '@/typing';
import Load from '@/app/_components/load';
import { PiArrowLineDown, PiCaretLeft, PiCaretRight } from 'react-icons/pi';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function View({acceptance}: {acceptance: ReadReportAcceptance}) {
    const doc = useRef<HTMLDivElement>(null)
    const [wdoc, setWdoc] = useState<number>(0);
    const [numPages, setNumPages] = useState<number>(1);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [active, setActive] = useState<boolean>(false)
    const [exist, setExist] = useState<boolean>(false)

    useEffect(() => {
        window.addEventListener('resize', () => {   
            setWdoc(doc.current ? doc.current.clientWidth : 0)
        })

        setWdoc(doc.current ? doc.current.clientWidth : 0)

        return () => {
            window.removeEventListener('resize', () => {   
                setWdoc(doc.current ? doc.current.clientWidth : 0)
            })
        }
    }, [])

    useEffect(() => {
        setExist(false)
        setActive(false)
    }, [acceptance])

    useEffect(() => {
        !exist && setActive(true)
    }, [exist])

    return (
        <div ref={doc} className='grid gap-y-4'>
            {exist && 
                <div className='grid sm:flex md:grid lg:flex items-center gap-y-2 gap-x-4'>
                    <h1 className='grow font-medium'>
                        Laporan penerimaan {new Date(acceptance.now_date).getTime()} 
                        <span className='text-slate-600 font-normal'> &middot; {numPages} Halaman</span>
                    </h1>
                    <PDFDownloadLink document={<Create acceptance={acceptance} />} fileName={'Laporan penerimaan '+new Date(acceptance.now_date).getTime()}>
                        <div className='flex items-center gap-x-2 text-slate-600 hover:text-slate-950 cursor-pointer'>
                            <PiArrowLineDown className='text-lg' />
                            <h1 className='text-sm'>Unduh PDF</h1>
                        </div>
                    </PDFDownloadLink>
                </div>
            }
            {active && 
                <BlobProvider document={<Create acceptance={acceptance} />}>
                    {({url, loading, error}) => loading ? 
                    <div className="grid justify-center"><Load size="large" /></div> : error ?
                    <h1 className="text-center text-slate-600">Kesalahan mengambil dokumen</h1> :
                    <Document file={url} loading={<div className="grid justify-center"><Load size="large" /></div>} 
                    error={<h1 className="text-center text-slate-600">Kesalahan memuat dokumen</h1>}
                    onLoadSuccess={(e) => {setNumPages(e.numPages); setExist(true)}}>
                        <Page pageNumber={pageNumber} width={wdoc-2} renderAnnotationLayer={false} renderTextLayer={false}
                        loading={<div className="grid justify-center"><Load size="large" /></div>} 
                        error={<h1 className="text-center text-slate-600 p-4">Kesalahan memuat halaman</h1>}
                        className='rounded-md border border-slate-300 overflow-hidden' />
                    </Document>}
                </BlobProvider>
            }
            {exist && 
                <div className='flex justify-center items-center gap-x-4'>
                    <PiCaretLeft onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)} className={`${pageNumber > 1 ? '' : 'invisible'} text-lg text-slate-600 hover:text-slate-950 cursor-pointer`} />
                    <select value={pageNumber} onChange={(e) => setPageNumber(Number(e.target.value))} 
                    className='bg-slate-50 text-sm rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none'>
                        {Array.from({length: numPages}, (_, index) => (
                            <option key={index + 1} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                    <PiCaretRight onClick={() => pageNumber < numPages && setPageNumber(pageNumber + 1)} className={`${pageNumber < numPages ? '' : 'invisible'} text-lg text-slate-600 hover:text-slate-950 cursor-pointer`} />
                </div>
            }
        </div>
    )
}