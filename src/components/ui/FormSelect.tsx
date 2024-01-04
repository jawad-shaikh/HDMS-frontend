import React from 'react';
import { Icons } from '../global/icons';

const FormSelect: React.FC<any> = ({ register, name, errors, label, options }) => {
  return (
    <div className='mb-4'>
      <label className='block mb-2 text-sm' htmlFor={name}>{label}</label>
      <select id={name} defaultValue={""} className='block border-2 border-gray w-full p-2 outline-none' {...register(name)} aria-invalid={errors[name] ? "true" : "false"}>
        <option disabled value={""}> Select {label}</option>
        {
          options?.map((object: any, index: number) => (
            <option key={index} value={object.id}>{object.name}</option>
          ))
        }
      </select>
      {errors[name] &&
        <div role="alert" className='flex items-center mt-2 text-red'>
          <Icons.required />
          <p className='text-sm ml-1 mt-[2px]'>{errors[name]?.message}</p>
        </div>
      }
    </div>
  )
}

export default FormSelect