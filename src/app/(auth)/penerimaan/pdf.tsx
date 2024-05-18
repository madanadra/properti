import { formatNumber } from '@/function';
import { ReadReportAcceptance } from '@/typing';
import { Document, Font, Page, Text, View } from '@react-pdf/renderer';
import moment from 'moment';

Font.register({family: 'Inter', fonts: [
    {src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf'},
    {src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf', fontWeight: 'thin'},
    {src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfMZhrib2Bg-4.ttf', fontWeight: 'ultralight'},
    {src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfMZhrib2Bg-4.ttf', fontWeight: 'light'},
    {src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf', fontWeight: 'medium'},
    {src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf', fontWeight: 'semibold'},
    {src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf', fontWeight: 'bold'},
    {src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf', fontWeight: 'ultrabold'},
    {src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYMZhrib2Bg-4.ttf', fontWeight: 'heavy'}
]})

export default function Pdf({acceptance}: {acceptance: ReadReportAcceptance}) {
    return (
        <Document title={'Laporan penerimaan '+new Date(acceptance.now_date).getTime()} author='Properti' subject='Laporan penerimaan' keywords='Property, Report, Acceptance'>
            <Page size="A4" style={{flexDirection: 'column', fontSize: 12, fontFamily: 'Inter', padding: 16, color: 'black'}}>
                <View style={{rowGap: 8, textAlign: 'center', marginBottom: 32}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Properti</Text>
                    <Text style={{textTransform: 'uppercase', fontSize: 20, fontWeight: 'semibold'}}>Laporan penerimaan</Text>
                    <Text style={{fontWeight: 'semibold'}}>{moment(acceptance.from_date).format('DD/MM/YYYY')} s/d {moment(acceptance.until_date).format('DD/MM/YYYY')}</Text>
                    <Text style={{fontWeight: 'medium'}}>Edisi: {moment(acceptance.now_date).format('DD/MM/YYYY')}</Text>
                </View>
                <View fixed style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 8, fontWeight: 'medium', borderTopColor: 'black', borderTopWidth: 1, borderBottomColor: 'black', borderBottomWidth: 1}}>
                    <Text style={{width: '6%', paddingRight: 4}}>No.</Text>
                    <Text style={{width: '16%', paddingHorizontal: 4}}>Tanggal</Text>
                    <Text style={{width: '6%', paddingHorizontal: 4}}>ID</Text>
                    <Text style={{width: '21%', paddingHorizontal: 4}}>Nama</Text>
                    <Text style={{width: '10%', paddingHorizontal: 4}}>Rumah</Text>
                    <Text style={{width: '21%', paddingHorizontal: 4}}>Nilai</Text>
                    <Text style={{width: '20%', paddingLeft: 4}}>Judul pembayaran</Text>
                </View>
                <View style={{flexGrow: 1}}>
                    {acceptance.data.map((item, i) => 
                        <View wrap={false} key={i} style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomColor: 'black', borderBottomWidth: 1}}>
                            <Text style={{width: '6%', paddingRight: 4}}>{i+1}.</Text>
                            <Text style={{width: '16%', paddingHorizontal: 4}}>{moment(item.created_at).format('DD/MM/YYYY')}</Text>
                            <Text style={{width: '6%', paddingHorizontal: 4}}>{item.id}</Text>
                            <Text style={{width: '21%', paddingHorizontal: 4}}>{item.house.customer?.name}</Text>
                            <Text style={{width: '10%', paddingHorizontal: 4}}>{item.house.house_block.name}/{item.house.num}</Text>
                            <Text style={{width: '21%', paddingHorizontal: 4}}>Rp{formatNumber(item.value)}</Text>
                            <Text style={{width: '20%', paddingLeft: 4}}>{item.payment_title.name}</Text>
                        </View>
                    )}
                </View>
                <View fixed style={{fontWeight: 'medium', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', columnGap: 8, marginTop: 16}}>
                    <Text>{new Date(acceptance.now_date).getTime()}</Text>
                    <Text render={({pageNumber, totalPages}) => pageNumber+'/'+totalPages} />
                </View>
            </Page>
        </Document>
    )
}