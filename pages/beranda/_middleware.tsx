import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
const secret = process.env.NEXTAUTH_SECRET
export async function middleware (req:any) {
    
    console.log(345, secret)
    const token = await getToken({req, secret,  raw:true})
    //console.log(345, token)
    if (!token) return NextResponse.redirect(new URL('/api/auth/signin', req.url))
    //if user is authenticated, continue.
    return NextResponse.next()
}