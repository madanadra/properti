import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('auth-id')
    const urlUnauth = req.nextUrl.pathname+req.nextUrl.search
    const unauth = '/login'+(urlUnauth != '/' ? '?next='+encodeURIComponent(urlUnauth) : '/')
    const urlAuth = req.nextUrl.searchParams.get('next') || '/'
    const auth = urlAuth != '/login' ? urlAuth : '/'

    if (token) {
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_BASE_API+'/check', {
                headers: {
                    'Authorization': 'Bearer '+token.value,
                    'Accept' : 'application/json'
                },
                cache: 'no-cache'
            })
        
            if (!res.ok) {
                if (!req.url.includes('/login')) {
                    return NextResponse.redirect(new URL(unauth, req.url))
                }
            } else if (req.url.includes('/login')) {
                return NextResponse.redirect(new URL(auth, req.url))
            } else if (req.url.includes('/rumah')) {
                const id = req.nextUrl.searchParams.get('v')
    
                if (!id) {
                    return NextResponse.redirect(new URL('/', req.url))
                }
            }
        } catch {}
    } else if (!req.url.includes('/login')) {
        return NextResponse.redirect(new URL(unauth, req.url))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|icon.ico|.*\\.svg).*)']
}