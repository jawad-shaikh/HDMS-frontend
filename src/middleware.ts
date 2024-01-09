import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === '/') {
        return NextResponse.rewrite(new URL('/login', request.url))
      }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}

// import { cookies } from 'next/headers'
// import { NextRequest, NextResponse } from "next/server";



// type UserRole = 'ADMIN' | 'HR' | 'HOD' | 'USER';

// interface User {
//     role: UserRole;
// }



// export function middleware(request: NextRequest) {
//     const { pathname } = request.nextUrl
//     const token = cookies().get('token')?.value
//     const role = cookies().get('role')?.value || ""
//     console.log(token, role)
//     if (pathname === "/" || !token) {
//         return NextResponse.redirect(new URL('/login', request.url))
//     }

//     if (token) {
//         console.log(role)
//         switch (role) {
//             case 'ADMIN':
//                 if (!["/users", "/department", "/required-documents", "/received-documents", "/document-history", "/expired-documents"].includes(pathname)) {
//                     return NextResponse.redirect(new URL('/users', request.url))
//                 }

//             case 'HR':
//                 if (!["/required-documents", "/received-documents", "/document-history", "/expired-documents"].includes(pathname)) {
//                     return NextResponse.redirect(new URL('/required-documents', request.url))
//                 }

//             case 'HOD':
//                 if (!["upload-documents",  "/expired-documents", "/department-expired-documents"].includes(pathname)) {
//                     return NextResponse.redirect(new URL('/upload-documents', request.url))
//                 }

//             case 'STAFF':
//                 if (!["/upload-documents","/expired-documents"].includes(pathname)) {
//                     return NextResponse.redirect(new URL('/upload-documents', request.url))
//                 }

//             default:
//                 // Handle unknown roles or return false if you want to deny access
//                 // return NextResponse.next();
//         }
//     }
//     // return NextResponse.redirect(new URL('/home', request.url))
// }

// export const config = {
//     matcher: ["/", "/users", "/department", "/required-documents", "/received-documents", "/document-history", "/expired-documents", "/department-expired-documents", "/upload-documents", "/login", "/register"],
// };