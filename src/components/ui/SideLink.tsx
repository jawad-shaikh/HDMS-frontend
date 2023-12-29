'use client'
import { SideLinkProps } from '@/utils/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SideLink:React.FC<SideLinkProps> = ({ icon, url }) => {
    const path = usePathname();
    return (
        <li>
            <Link href={url} className={`flex items-center justify-center h-12 w-12 ${path === url ? "bg-primary text-white" : ""}`}>
                {icon}
            </Link>
        </li>
    )
}

export default SideLink