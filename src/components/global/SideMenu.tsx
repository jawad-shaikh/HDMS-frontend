'use client'
import { site } from '@/data'
import Image from 'next/image'
import React from 'react'
import { Icons } from './icons'
import SideLink from '../ui/SideLink'
import { redirect, useRouter } from 'next/navigation'

const SideMenu = () => {
  const router = useRouter()
  const logout = () => {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    router.push('/login')
  }
  const user = JSON.parse(localStorage.getItem('user') || '')
  return (
    <div className="flex h-screen w-[72px] flex-col justify-between border-e border-gray">
      <div>
        <div className="inline-flex items-center p-5 justify-center">
          <Image src={'/icon.svg'} height={32} width={32} className='w-8 h-8' alt={`${site.name} icon`} />
        </div>

        <ul className="space-y-3 m-3">
          {
            user.role === "ADMIN" ? (
              <>
                <SideLink icon={<Icons.users className=' w-5' />} url="/users" />
                <SideLink icon={<Icons.department className=' w-5' />} url="/department" />
                <SideLink icon={<Icons.required className=' w-5' />} url="/required-documents" />
                <SideLink icon={<Icons.received className=' w-5' />} url="/received-documents" />
                <SideLink icon={<Icons.history className=' w-5' />} url="/document-history" />
                <SideLink icon={<Icons.error className=' w-5' />} url="/expired-documents" />
              </>
            ) : user.role === "HR" ? <>
              <SideLink icon={<Icons.required className=' w-5' />} url="/required-documents" />
              <SideLink icon={<Icons.received className=' w-5' />} url="/received-documents" />
              <SideLink icon={<Icons.history className=' w-5' />} url="/document-history" />
              <SideLink icon={<Icons.error className=' w-5' />} url="/expired-documents" />
            </> : user.role === "HOD" ? <>
              <SideLink icon={<Icons.required className=' w-5' />} url="/required-documents" />
              <SideLink icon={<Icons.upload className=' w-5' />} url="/upload-documents" />
              <SideLink icon={<Icons.history className=' w-5' />} url="/document-history" />
              <SideLink icon={<Icons.error className=' w-5' />} url="/expired-documents" />
            </> : <>
              <SideLink icon={<Icons.required className=' w-5' />} url="/required-documents" />
              <SideLink icon={<Icons.upload className=' w-5' />} url="/upload-documents" />
              <SideLink icon={<Icons.history className=' w-5' />} url="/document-history" />
              <SideLink icon={<Icons.error className=' w-5' />} url="/expired-documents" />
            </>
          }

        </ul>
      </div>


      <button onClick={logout} className='flex items-center justify-center py-6'>
        <Icons.logout className=' w-5' />
      </button>
    </div >
  )
}

export default SideMenu