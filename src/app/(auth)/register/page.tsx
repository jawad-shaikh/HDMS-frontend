import RegisterForm from '@/components/ui/RegisterForm'
import Image from 'next/image'

export default function RegisterPage() {
  return (
    <main className='bg-[#FAFAFA] container py-12 relative my-12'>
      <Image src={'/visual-top-left.svg'} alt="visual-top-left" height={94} width={74} className='absolute top-0 left-0' />
        <Image src={'/visual-bottom-right.svg'} alt="visual-bottom-right" height={67} width={67} className='absolute bottom-0 right-0' />
      <RegisterForm />
    </main>
  )
}
