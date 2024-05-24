import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('auth-id')
    const atLogin = req.nextUrl.pathname === '/login'
    const atHouse = req.nextUrl.pathname === '/rumah'
    const gate = '?gate='+encodeURIComponent(req.nextUrl.pathname+req.nextUrl.search)
    const getGate = req.nextUrl.searchParams.get('gate') || '/'
    const auth = NextResponse.redirect(new URL(getGate === '/login' ? '/' : getGate, req.url))
    const unauth = NextResponse.redirect(new URL('/login'+(req.nextUrl.pathname+req.nextUrl.search === '/' ? '' : gate), req.url))
    const dashboard = NextResponse.redirect(new URL('/', req.url))
    const pass = NextResponse.next()

    if (token) {
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_BASE_API+'/check', {
                headers: {
                    'Authorization': 'Bearer '+token.value,
                    'Accept' : 'application/json'
                },
                cache: 'no-cache'
            })
        
            if (res.ok) {
                if (atLogin) {
                    return auth
                } else if (atHouse && !req.nextUrl.searchParams.get('v')) {
                    return dashboard
                } else {
                    return pass
                }
            } else if (!atLogin) {
                return unauth
            } else {
                pass.cookies.delete('auth-id')
                return pass
            }
        } catch {
            return pass
        }
    } else if (!atLogin) {
        return unauth
    } else {
        return pass
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|icon.ico|.*\\.svg).*)']
}