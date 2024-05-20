'use server'

import { revalidateTag } from "next/cache"
import { cookies } from 'next/headers'
import axios, { AxiosError } from "axios"

export async function deleteToken() {
    cookies().delete('auth-id')
}

export async function log_in(_current: any, e: FormData) {
    const username = e.get('username')
    const password = e.get('password')

    try {
        const { data } = await axios.post(process.env.NEXT_PUBLIC_BASE_API+'/log-in', 
        {username: username, password: password})

        if (data.error) return {error: data.error}

        const token: string = data.token
        cookies().set('auth-id', token, { 
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 3600*24*7
        })
        return {success: true}

    } catch (err) {
        const error = err as AxiosError

        return {error: 'Kode kesalahan: '+error.response?.status}
    }
}

export async function log_out(_current: any) {
    try {
        await axios.delete(process.env.NEXT_PUBLIC_BASE_API+'/log-out', 
        {
            headers: { Authorization: 'Bearer '+cookies().get('auth-id')?.value }
        })
        
        return {success: true}

    } catch (err) {
        const error = err as AxiosError

        if (error.response?.status === 401) return {unauth: true}

        return {error: 'Kode kesalahan: '+error.response?.status}
    }
}

export async function reset_status(_current: any, e: FormData) {
    const id = e.get('house-id')
    const house_status_id = e.get('house-status-id')

    try {
        const { data } = await axios.patch(process.env.NEXT_PUBLIC_BASE_API+'/reset-status/'+id, 
        {house_status_id: house_status_id}, 
        {
            headers: { Authorization: 'Bearer '+cookies().get('auth-id')?.value }
        })

        if (data.error) return {error: data.error}

        revalidateTag('read-house')
        return {success: true}

    } catch (err) {
        const error = err as AxiosError

        if (error.response?.status === 401) return {unauth: true}

        return {error: 'Kode kesalahan: '+error.response?.status}
    }
}

export async function update_house(_current: any, e: FormData) {
    const id = e.get('house-id')
    const house_block_id = e.get('house-block-id')
    const num = e.get('num')
    const house_type_id = e.get('house-type-id')
    const price = e.get('price')
    const booking_fee = e.get('booking-fee')
    
    try {
        const { data } = await axios.patch(process.env.NEXT_PUBLIC_BASE_API+'/update-house/'+id, 
        {
            house_block_id: house_block_id,
            num: num,
            house_type_id: house_type_id,
            price: price,
            booking_fee: booking_fee
        }, 
        {
            headers: { Authorization: 'Bearer '+cookies().get('auth-id')?.value }
        })

        if (data.error) return {error: data.error}

        revalidateTag('read-house')
        return {success: true}

    } catch (err) {
        const error = err as AxiosError

        if (error.response?.status === 401) return {unauth: true}

        return {error: 'Kode kesalahan: '+error.response?.status}
    }
}

export async function update_house_hook(_current: any, e: FormData) {
    const id = e.get('house-id')
    const hook_length = e.get('hook-length') || undefined
    const hook_wide = e.get('hook-wide') || undefined
    const hook_square_price = e.get('hook-square-price') || undefined
    const hook_strategic_fee = e.get('hook-strategic-fee') || undefined
    
    try {
        const { data } = await axios.patch(process.env.NEXT_PUBLIC_BASE_API+'/update-house-hook/'+id, 
        {
            hook_length: hook_length,
            hook_wide: hook_wide,
            hook_square_price: hook_square_price,
            hook_strategic_fee: hook_strategic_fee
        }, 
        {
            headers: { Authorization: 'Bearer '+cookies().get('auth-id')?.value }
        })

        if (data.error) return {error: data.error}

        revalidateTag('read-house')
        return {success: true}

    } catch (err) {
        const error = err as AxiosError

        if (error.response?.status === 401) return {unauth: true}

        return {error: 'Kode kesalahan: '+error.response?.status}
    }
}

export async function booking_house(_current: any, e: FormData) {
    const id = e.get('house-id')
    const customer_id = e.get('customer-id') || undefined
    const customer_name = e.get('customer-name') || undefined
    const customer_tel = e.get('customer-tel') || undefined
    const payment_value = e.get('payment-value')
    const payment_via = e.get('payment-via')
    const payment_desc = e.get('payment-desc') || undefined

    try {
        const { data } = await axios.patch(process.env.NEXT_PUBLIC_BASE_API+'/booking-house/'+id, 
        {
            customer_id: customer_id,
            customer_name: customer_name,
            customer_tel: customer_tel,
            payment_value: payment_value,
            payment_via: payment_via,
            payment_desc: payment_desc
        }, 
        {
            headers: { Authorization: 'Bearer '+cookies().get('auth-id')?.value }
        })

        if (data.error) return {error: data.error}

        revalidateTag('read-house')
        return {success: true}

    } catch (err) {
        const error = err as AxiosError

        if (error.response?.status === 401) return {unauth: true}

        return {error: 'Kode kesalahan: '+error.response?.status}
    }
}

export async function continue_house(_current: any, e: FormData) {
    const id = e.get('house-id')
    const house_status_id = e.get('house-status-id')
    
    try {
        const { data } = await axios.patch(process.env.NEXT_PUBLIC_BASE_API+'/continue-house/'+id, 
        {house_status_id: house_status_id}, 
        {
            headers: { Authorization: 'Bearer '+cookies().get('auth-id')?.value }
        })

        if (data.error) return {error: data.error}

        revalidateTag('read-house')
        return {success: true}

    } catch (err) {
        const error = err as AxiosError

        if (error.response?.status === 401) return {unauth: true}

        return {error: 'Kode kesalahan: '+error.response?.status}
    }
}

export async function update_customer(_current: any, e: FormData) {
    const id = e.get('customer-id')
    const name = e.get('name')
    const tel = e.get('tel')
    const ktp_num = e.get('ktp-num') || undefined
    const address = e.get('address') || undefined
    const ktp_address = e.get('ktp-address') || undefined
    const born_place = e.get('born-place') || undefined
    const born_date = e.get('born-date') || undefined
    const agency = e.get('agency') || undefined
    const agency_address = e.get('agency-address') || undefined
    const agency_tel = e.get('agency-tel') || undefined
    const email = e.get('email') || undefined
    const pair_name = e.get('pair-name') || undefined
    const pair_tel = e.get('pair-tel') || undefined
    const pair_ktp_num = e.get('pair-ktp-num') || undefined
    const pair_ktp_address = e.get('pair-ktp-address') || undefined
    const pair_born_place = e.get('pair-born-place') || undefined
    const pair_born_date = e.get('pair-born-date') || undefined
    
    try {
        const { data } = await axios.patch(process.env.NEXT_PUBLIC_BASE_API+'/update-customer/'+id, 
        {
            name: name,
            tel: tel,
            ktp_num: ktp_num,
            address: address,
            ktp_address: ktp_address,
            born_place: born_place,
            born_date: born_date,
            agency: agency,
            agency_address: agency_address,
            agency_tel: agency_tel,
            email: email,
            pair_name: pair_name,
            pair_tel: pair_tel,
            pair_ktp_num: pair_ktp_num,
            pair_ktp_address: pair_ktp_address,
            pair_born_place: pair_born_place,
            pair_born_date:pair_born_date
        }, 
        {
            headers: { Authorization: 'Bearer '+cookies().get('auth-id')?.value }
        })

        if (data.error) return {error: data.error}

        revalidateTag('read-house')
        return {success: true}

    } catch (err) {
        const error = err as AxiosError

        if (error.response?.status === 401) return {unauth: true}

        return {error: 'Kode kesalahan: '+error.response?.status}
    }
}

export async function update_house_administration(_current: any, e: FormData) {
    const id = e.get('house-id')
    const employee_id = e.get('employee-id') || undefined
    const purchase_type_id = e.get('purchase-type-id') || undefined
    const bank = e.get('bank') || undefined
    const kpr_max = e.get('kpr-max') || undefined
    const installment = e.get('installment') || undefined
    const ppn = e.get('ppn') || undefined
    const administration = e.get('administration') || undefined
    const discount = e.get('discount') || undefined
    
    try {
        const { data } = await axios.patch(process.env.NEXT_PUBLIC_BASE_API+'/update-house-administration/'+id, 
        {
            employee_id: employee_id,
            purchase_type_id: purchase_type_id,
            bank: bank,
            kpr_max: kpr_max,
            installment: installment,
            ppn: ppn,
            administration: administration,
            discount: discount
        }, 
        {
            headers: { Authorization: 'Bearer '+cookies().get('auth-id')?.value }
        })

        if (data.error) return {error: data.error}

        revalidateTag('read-house')
        return {success: true}

    } catch (err) {
        const error = err as AxiosError

        if (error.response?.status === 401) return {unauth: true}

        return {error: 'Kode kesalahan: '+error.response?.status}
    }
}

export async function create_payment(_current: any, e: FormData) {
    const id = e.get('house-id')
    const desc = e.get('desc') || undefined
    const payment_via = e.get('payment-via')
    const payment_title_id = e.get('payment-title-id')
    const value = e.get('value')
    
    try {
        const { data } = await axios.post(process.env.NEXT_PUBLIC_BASE_API+'/create-payment/'+id, 
        {
            desc: desc,
            payment_via: payment_via,
            payment_title_id: payment_title_id,
            value: value
        }, 
        {
            headers: { Authorization: 'Bearer '+cookies().get('auth-id')?.value }
        })

        if (data.error) return {error: data.error}

        revalidateTag('read-house')
        return {success: true}

    } catch (err) {
        const error = err as AxiosError

        if (error.response?.status === 401) return {unauth: true}

        return {error: 'Kode kesalahan: '+error.response?.status}
    }
}

export async function update_payment(_current: any, e: FormData) {
    const id = e.get('payment-id')
    const desc = e.get('desc') || undefined
    const payment_via = e.get('payment-via')
    const payment_title_id = e.get('payment-title-id')
    const value = e.get('value')
    
    try {
        const { data } = await axios.patch(process.env.NEXT_PUBLIC_BASE_API+'/update-payment/'+id, 
        {
            desc: desc,
            payment_via: payment_via,
            payment_title_id: payment_title_id,
            value: value
        }, 
        {
            headers: { Authorization: 'Bearer '+cookies().get('auth-id')?.value }
        })

        if (data.error) return {error: data.error}

        revalidateTag('read-house')
        return {success: true}

    } catch (err) {
        const error = err as AxiosError

        if (error.response?.status === 401) return {unauth: true}

        return {error: 'Kode kesalahan: '+error.response?.status}
    }
}

export async function create_house(_current: any, e: FormData) {
    const house_block_id = e.get('house-block-id')
    const num = e.get('num')
    const house_status_id = e.get('house-status-id')
    const house_type_id = e.get('house-type-id')
    const price = e.get('price')
    const booking_fee = e.get('booking-fee')
    
    try {
        const { data } = await axios.post(process.env.NEXT_PUBLIC_BASE_API+'/create-house/', 
        {
            house_block_id: house_block_id,
            num: num,
            house_status_id: house_status_id,
            house_type_id: house_type_id,
            price: price,
            booking_fee: booking_fee
        }, 
        {
            headers: { Authorization: 'Bearer '+cookies().get('auth-id')?.value }
        })

        if (data.error) return {error: data.error}

        revalidateTag('read-data-house')
        return {success: true}

    } catch (err) {
        const error = err as AxiosError

        if (error.response?.status === 401) return {unauth: true}

        return {error: 'Kode kesalahan: '+error.response?.status}
    }
}

export async function create_house_block(_current: any, e: FormData) {
    const name = e.get('name')
    
    try {
        const { data } = await axios.post(process.env.NEXT_PUBLIC_BASE_API+'/create-house-block/', 
        {name: name}, 
        {
            headers: { Authorization: 'Bearer '+cookies().get('auth-id')?.value }
        })

        if (data.error) return {error: data.error}

        revalidateTag('read-data-house-block')
        return {success: true}

    } catch (err) {
        const error = err as AxiosError

        if (error.response?.status === 401) return {unauth: true}

        return {error: 'Kode kesalahan: '+error.response?.status}
    }
}

export async function create_house_type(_current: any, e: FormData) {
    const building = e.get('building')
    const land = e.get('land')
    
    try {
        const { data } = await axios.post(process.env.NEXT_PUBLIC_BASE_API+'/create-house-type/', 
        {
            building: building,
            land: land
        }, 
        {
            headers: { Authorization: 'Bearer '+cookies().get('auth-id')?.value }
        })

        if (data.error) return {error: data.error}

        revalidateTag('read-data-house-type')
        return {success: true}

    } catch (err) {
        const error = err as AxiosError

        if (error.response?.status === 401) return {unauth: true}

        return {error: 'Kode kesalahan: '+error.response?.status}
    }
}

export async function create_employee(_current: any, e: FormData) {
    const name = e.get('name')
    
    try {
        const { data } = await axios.post(process.env.NEXT_PUBLIC_BASE_API+'/create-employee/', 
        {name: name}, 
        {
            headers: { Authorization: 'Bearer '+cookies().get('auth-id')?.value }
        })

        if (data.error) return {error: data.error}

        revalidateTag('read-data-employee')
        return {success: true}

    } catch (err) {
        const error = err as AxiosError

        if (error.response?.status === 401) return {unauth: true}

        return {error: 'Kode kesalahan: '+error.response?.status}
    }
}

export async function create_notary(_current: any, e: FormData) {
    const name = e.get('name')
    
    try {
        const { data } = await axios.post(process.env.NEXT_PUBLIC_BASE_API+'/create-notary/', 
        {name: name}, 
        {
            headers: { Authorization: 'Bearer '+cookies().get('auth-id')?.value }
        })

        if (data.error) return {error: data.error}

        revalidateTag('read-data-notary')
        return {success: true}

    } catch (err) {
        const error = err as AxiosError

        if (error.response?.status === 401) return {unauth: true}

        return {error: 'Kode kesalahan: '+error.response?.status}
    }
}

export async function cancel_house(_current: any, e: FormData) {
    const id = e.get('house-id')
    const desc = e.get('desc') || undefined
    const payment_via = e.get('payment-via')
    const value = e.get('value')
    
    try {
        const { data } = await axios.patch(process.env.NEXT_PUBLIC_BASE_API+'/cancel-house/'+id, 
        {
            desc: desc,
            payment_via: payment_via,
            value: value
        }, 
        {
            headers: { Authorization: 'Bearer '+cookies().get('auth-id')?.value }
        })

        if (data.error) return {error: data.error}

        revalidateTag('read-house')
        return {success: true}

    } catch (err) {
        const error = err as AxiosError

        if (error.response?.status === 401) return {unauth: true}

        return {error: 'Kode kesalahan: '+error.response?.status}
    }
}

export async function moving_house(_current: any, e: FormData) {
    const from_house_id = e.get('from-house-id')
    const to_house_id = e.get('to-house-id')
    
    try {
        const { data } = await axios.patch(process.env.NEXT_PUBLIC_BASE_API+'/moving-house/', 
        {
            from_house_id: from_house_id,
            to_house_id: to_house_id
        }, 
        {
            headers: { Authorization: 'Bearer '+cookies().get('auth-id')?.value }
        })

        if (data.error) return {error: data.error}

        revalidateTag('read-data-house')
        revalidateTag('read-data-moving-house-history')
        return {success: true}

    } catch (err) {
        const error = err as AxiosError

        if (error.response?.status === 401) return {unauth: true}

        return {error: 'Kode kesalahan: '+error.response?.status}
    }
}

export async function update_legality_and_electrical_installation(_current: any, e: FormData) {
    const id = e.get('house-id')
    const legality_id = e.get('legality-id') || undefined
    const electrical_installation = e.get('electrical-installation') || undefined
    
    try {
        const { data } = await axios.patch(process.env.NEXT_PUBLIC_BASE_API+'/update-legality-and-electrical-installation/'+id, 
        {
            legality_id: legality_id,
            electrical_installation: electrical_installation
        }, 
        {
            headers: { Authorization: 'Bearer '+cookies().get('auth-id')?.value }
        })

        if (data.error) return {error: data.error}

        revalidateTag('read-data-house')
        return {success: true}

    } catch (err) {
        const error = err as AxiosError

        if (error.response?.status === 401) return {unauth: true}

        return {error: 'Kode kesalahan: '+error.response?.status}
    }
}

export async function update_password(_current: any, e: FormData) {
    const old_password = e.get('old-password')
    const new_password = e.get('new-password')
    const new_password_confirmation = e.get('new-password-confirmation')
    
    try {
        const { data } = await axios.patch(process.env.NEXT_PUBLIC_BASE_API+'/update-password/', 
        {
            old_password: old_password,
            new_password: new_password,
            new_password_confirmation: new_password_confirmation
        }, 
        {
            headers: { Authorization: 'Bearer '+cookies().get('auth-id')?.value }
        })

        if (data.error) return {error: data.error}

        revalidateTag('read-user')
        return {success: true}

    } catch (err) {
        const error = err as AxiosError

        if (error.response?.status === 401) return {unauth: true}

        return {error: 'Kode kesalahan: '+error.response?.status}
    }
}

export async function create_account(_current: any, e: FormData) {
    const username = e.get('username')
    const password = e.get('password')
    const password_confirmation = e.get('password-confirmation')
    
    try {
        const { data } = await axios.post(process.env.NEXT_PUBLIC_BASE_API+'/create-account/', 
        {
            username: username,
            password: password,
            password_confirmation: password_confirmation
        }, 
        {
            headers: { Authorization: 'Bearer '+cookies().get('auth-id')?.value }
        })

        if (data.error) return {error: data.error}

        return {success: true}

    } catch (err) {
        const error = err as AxiosError

        if (error.response?.status === 401) return {unauth: true}

        return {error: 'Kode kesalahan: '+error.response?.status}
    }
}
