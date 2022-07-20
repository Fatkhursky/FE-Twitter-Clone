import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req: any) {
  if (req.nextUrl.pathname === '/') {
    //console.log(99, 'yes')
    return NextResponse.redirect(new URL('/beranda', req.url))
  } 
  return NextResponse.next()
}
