import { InputProps } from '@/utils/types';
import React, { useState } from 'react';
import { Icons } from '../global/icons';


const FormInputPassword:React.FC<InputProps> = ({register, name, errors, label, placeholder}) => {
  const [show, setShow] = useState(false)
  return (
    <div className='mb-4'>
        <label className='block mb-2 text-sm' htmlFor={name}>{label}</label>
        <div className='flex items-center border-2 border-gray w-full p-2 gap-2'>
        <input id={name} type={!show ? 'password' : 'text'} className='block w-full outline-none' placeholder={placeholder} {...register(name)} aria-invalid={errors[name] ? "true" : "false"} />
        <button type='button' onClick={() => setShow(!show)}>
        {
          show ?  <Icons.eyeClose className='text-black/50' /> : <Icons.eye className='text-black/50' />
        }
        </button>
        
        </div>
        {errors[name] && 
        <div role="alert" className='flex items-center mt-2 text-red'>
        <Icons.required />
        <p className='text-sm ml-1 mt-[2px]'>{errors[name]?.message}</p>
        </div>
        }
    </div>
  )
}

export default FormInputPassword