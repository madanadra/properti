import { cookies } from "next/headers"

export async function read_data({name, id}: {name: string, id?: string}) {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_API+'/'+name+'/'+(id ? id : ''), {
            headers: {
                'Authorization': 'Bearer '+cookies().get('auth-id')?.value,
                'Accept': 'application/json'
            },
            cache: 'no-cache',
            next: {
                tags: [name]
            }
        })

        if (!res.ok) throw new Error(name+' '+res.status)

        const data = await res.json()
        return {data: data.data}
    } catch(err) {
        if (err instanceof Error) return {error: err.message}
        
        return {error: 'Terjadi kesalahan'}
    }
}

export async function read_acceptance({fd, ud, pti}: {fd?: string, ud?: string, pti?: string}) {
    try {
        const query: string[] = []

        if (fd) {
          query.push(fd)
        }
        if (ud) {
          query.push(ud)
        }
        if (pti) {
          query.push(pti)
        }

        let url = ''

        if (query.length > 0) {
          url += query.join('/')
        }
        
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_API+'/read-report-acceptance/'+url, {
            headers: {
                'Authorization': 'Bearer '+cookies().get('auth-id')?.value,
                'Accept': 'application/json'
            },
            cache: 'no-cache',
            next: {
                tags: ['acceptance']
            }
        })

        if (!res.ok) throw new Error('acceptance '+res.status)

        const data = await res.json()
        if (data.message) throw new Error(data.message)

        return {report: data.report}
    } catch(err) {
        if (err instanceof Error) return {error: err.message}
        
        return {error: 'Terjadi kesalahan'}
    }
}