'use client'
import { SideLinkProps } from '@/utils/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SideLink: React.FC<SideLinkProps> = ({ icon, url, name }) => {
    const path = usePathname();
    return (
        <li>
            <Link href={url} className={`flex items-center  ${path === url ? "bg-primary text-white" : ""}`}>
                <span className={`flex items-center justify-center h-12 w-12`}>
                    {icon}
                </span>
                <span className='hidden group-hover:inline text-sm font-semibold'>
                    {name}
                </span>
            </Link>

        </li>
    )
}

export default SideLink