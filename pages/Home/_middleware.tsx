import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
const secret = process.env.NEXTAUTH_SECRET
export async function middleware (req:any) {
    const token = await getToken({req, secret,  raw:true})
    if (!token) return NextResponse.redirect(new URL('/api/auth/signin', req.url))
    //if user is authenticated, continue.
    return NextResponse.next()
}