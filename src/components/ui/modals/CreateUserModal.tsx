import React, { useEffect, useState } from 'react'
import FormInput from '../FormInput'
import FormInputPassword from '../FormInputPassword'
import FormSelect from '../FormSelect'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchema } from '@/utils/validations'
import { useForm } from 'react-hook-form'
import API from '@/service/api'
import { TUser } from '@/utils/types'
import toast from 'react-hot-toast'

const CreateUserModal: React.FC<any> = ({closeModal}) => {
    const [departments, setDepartments] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm<TUser>({
        resolver: yupResolver(userSchema)
    });

    const onSubmit = async (data: TUser) => {
        try {

            if(data.departmentId){
                await API.createUser({...data, departmentId: Number(data.departmentId)})
            }else {
                const {departmentId, ...user} = data
                await API.createUser({...user});   
            }

            toast.success('New user created')
            closeModal()
        } catch (error: any) {
            console.log(error)
            toast.error(error.message)
        }
    };

    const getDepartments = async () => {
        try {
            const {data} = await API.departments();

            console.log(data.data)
            setDepartments(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDepartments();
    }, [])
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-2 gap-4'>
                <FormInput label={'First Name'} placeholder='Enter your first name' register={register} name={'firstName'} errors={errors} />
                <FormInput label={'Last Name'} placeholder='Enter your last name' register={register} name={'lastName'} errors={errors} />
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <FormInput label={'Employee Number'} placeholder='Enter employee number' register={register} name={'employeeNumber'} errors={errors} />
                <FormInput label={'ID number'} placeholder='Enter ID number' register={register} name={'idNumber'} errors={errors} />
            </div>
            <div className='grid grid-cols-2 gap-4'>
            <FormSelect label={'Department'} options={departments} register={register} name={'departmentId'} errors={errors} />
            <FormSelect label={'Role'}  options={[{id: "ADMIN", name: "Admin"}, {id: "HR", name: "HR"}, {id: "HOD", name: "HOD"}, {id: "STAFF", name: "Staff"}]} register={register} name={'role'} errors={errors} />

        </div>
            <FormInput label={'Email Address'} placeholder='Enter your email address' register={register} name={'email'} errors={errors} />
            <FormInputPassword label={'Password'} placeholder='Enter your password' register={register} name={'password'} errors={errors} />

            <div className='flex items-center justify-end mt-16'>
            <button onClick={closeModal} type='button' className='py-3 px-10 font-semibold'>Cancel</button>
            <button className='bg-primary py-3 px-10 text-white font-semibold'>Submit</button>
            </div>
        </form>
    )
}

export default CreateUserModal