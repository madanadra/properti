export type ReadUser = {
    id: number
    username: string
    created_at: string | null
}

export type ReadDataHouse = {
    id: number
    num: string
    house_block_id: number
    house_status_id: number
    customer_id: number
    legality_id: number
    electrical_installation: string | null
    house_block: {
        id: number
        name: string
    }
    house_status: {
        id: number
        name: string
    }
    customer: {
        id: number
        name: string
    } | null
    legality: {
        id: number
        name: string
    } | null
}[]

export type ReadHouse = {
    id: number
    num: string
    house_block_id: number
    house_type_id: number
    house_status_id: number
    customer_id: number | null
    purchase_type_id: number | null
    employee_id: number | null
    house_block: {
        id: number
        name: string
    }
    house_status: {
        id: number
        name: string
    }
    house_type: {
        id: number
        building: string
        land: string
    }
    hook_length: string | null
    hook_wide: string | null
    hook_square_price: string | null
    hook_strategic_fee: string | null
    customer: {
        id: number
        name: string
        tel: string
        email: string | null
        address: string | null
        ktp_address: string | null
        born_place: string | null
        born_date: string | null
        ktp_num: string | null
        agency: string | null
        agency_address: string | null
        agency_tel: string | null
        pair_name: string | null
        pair_ktp_num: string | null
        pair_born_place: string | null
        pair_born_date: string | null
        pair_ktp_address: string | null
        pair_tel: string | null
        houses_count: number
    } | null
    price: string
    booking_fee: string
    ppn: string | null
    bank: string | null
    installment: string | null
    kpr_max: string | null
    administration: string | null
    discount: string | null
    purchase_type: {
        id: number
        name: string
    } | null
    employee: {
        id: number
        name: string
    } | null
    created_at: string | null
    pemberkasan: string | null
    wawancara: string | null
    ots: string | null
    sp3k: string | null
    akad: string | null
    payments: {
        id: number
        desc: string | null
        value: string
        payment_title_id: number
        house_id: number
        created_at: string | null
        payment_via: string
        payment_title: {
            name: string
        }
    }[]
}

export type ReadDataHouseBlock = {
    id: number
    name: string
    created_at: string | null
}[]

export type ReadDataHouseType = {
    id: number
    building: string
    land: string
    created_at: string | null
}[]

export type ReadDataHouseStatus = {
    id: number
    name: string
    created_at: string | null
}[]

export type ReadDataCustomer = {
    id: number
    name: string
    tel: string
}[]

export type ReadDataPaymentTitle = {
    id: number
    name: string
    created_at: string | null
}[]

export type ReadDataEmployee = {
    id: number
    name: string
    created_at: string | null
}[]

export type ReadDataNotary = {
    id: number
    name: string
    created_at: string | null
}[]

export type ReadDataPurchaseType = {
    id: number
    name: string
    created_at: string | null
}[]

export type ReadDataMovingHouseHistory = {
    id: number
    from_house_id: number
    to_house_id: number
    customer_id: number
    from_house: {
        num: string
        house_block: {
            id: number
            name: string
        }
    }
    to_house: {
        num: string
        house_block: {
            id: number
            name: string
        }
    }
    customer: {
        name: string
    }
    created_at: string | null
}[]

export type ReadDataLegality = {
    id: number
    name: string
    created_at: string | null
}[]

export type ReadReportAcceptance = {
    now_date: string
    from_date: string
    until_date: string
    payment_title: string
    data: {
        id: number
        desc: string | null
        value: string
        payment_title_id: number
        house_id: number
        created_at: string | null
        payment_via: string
        payment_title: {
            name: string
        }
        house: {
            id: number
            num: string
            house_block_id: number
            customer_id: number
            house_block: {
                id: number
                name: string
            }
            customer: {
                id: number
                name: string
            } | null
        }
    }[]
}