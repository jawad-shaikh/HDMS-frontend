import React, { useEffect, useState } from 'react'
import FormInput from '../FormInput'
import FormSelect from '../FormSelect'
import { yupResolver } from '@hookform/resolvers/yup'
import { departmentSchema } from '@/utils/validations'
import { useForm } from 'react-hook-form'
import API from '@/service/api'
import { TDepartment, TUser } from '@/utils/types'
import toast from 'react-hot-toast'

const CreateDepartmentModal: React.FC<any> = ({ closeModal }) => {
    const [users, setUsers] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm<TDepartment>({
        resolver: yupResolver(departmentSchema)
    });

    const onSubmit = async (data: TDepartment) => {
        try {
            if(data.headOfDepartmentId){
                await API.createDepartment({...data, headOfDepartmentId: Number(data.headOfDepartmentId)})
            }
            else {
                const {name} = data
                await API.createDepartment({name});
            }
             
            toast.success('New department created')
            closeModal()
        } catch (error: any) {
            console.log(error)
            toast.error(error.message)
        }
    };

    const fetchUsers = async () => {
        try {
          const {data} = await API.hods();
          setUsers(data.data.map(({ id, firstName, lastName }: {id:number, firstName: string, lastName: string}) => ({ id, name: `${firstName} ${lastName}` })))
        } catch (error: any) {
          toast.error(error.message)
        }
      }
    
      useEffect(() => {
        fetchUsers()
      }, [])


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput label={'Title'} placeholder='Enter title department' register={register} name={'name'} errors={errors} />
            <FormSelect label={'Head of Department'} options={users} register={register} name={'headOfDepartmentId'} errors={errors} />

            <div className='flex items-center justify-end mt-16'>
                <button onClick={closeModal} type='button' className='py-3 px-10 font-semibold'>Cancel</button>
                <button className='bg-primary py-3 px-10 text-white font-semibold'>Submit</button>
            </div>
        </form>
    )
}

export default CreateDepartmentModal