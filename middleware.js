import { NextResponse } from 'next/server'

export  function middleware(req, res) {
    if(req.nextUrl.pathname.startsWith('/static')) {
        
        if(req.cookies.get('token') === undefined){
            return NextResponse.redirect(new URL('/auth/login',req.url))
        }
    }

}
