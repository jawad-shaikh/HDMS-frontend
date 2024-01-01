import React, { useEffect, useState } from 'react'
import FormInput from '../FormInput'
import FormSelect from '../FormSelect'
import { yupResolver } from '@hookform/resolvers/yup'
import { requiredDocumentSchema } from '@/utils/validations'
import { useForm } from 'react-hook-form'
import API from '@/service/api'
import { TRequiredDocument } from '@/utils/types'
import toast from 'react-hot-toast'
import { Icons } from '@/components/global/icons'



const CreateRequiredDocumentModal: React.FC<any> = ({ closeModal }) => {
    const [departments, setDepartments] = useState([]);
    const [isRepeated, setIsRepeated] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<TRequiredDocument>({
        resolver: yupResolver(requiredDocumentSchema)
    });

    const onSubmit = async (data: TRequiredDocument) => {
        try {
            await API.createRequiredDocument({...data, isRepeated})
            toast.success('New document created')
            closeModal()
        } catch (error: any) {
            console.log(error)
            toast.error(error.message)
        }
    };

    // const getDepartments = async () => {
    //     try {
    //         const { data } = await API.creat();

    //         console.log(data.data)
    //         setDepartments(data.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(() => {
    //     getDepartments();
    // }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormSelect label={'Document Type'} options={[{ id: "NORMAL", name: "Normal" }, { id: "QUESTION", name: "Question" }]} register={register} name={'documentType'} errors={errors} />
            <FormInput label={'Title'} placeholder='Enter title document' register={register} name={'title'} errors={errors} />

            <div className='mb-4'>
                <label className='block mb-2 text-sm' htmlFor={'description'}>Description</label>
                <textarea id={'description'} className='block border-2 border-gray w-full p-2 outline-none' placeholder={'Enter description document'} {...register('description')} aria-invalid={errors.description ? "true" : "false"} />
                {errors.description &&
                    <div role="alert" className='flex items-center mt-2 text-red'>
                        <Icons.required />
                        <p className='text-sm ml-1 mt-[2px]'>{errors.description?.message}</p>
                    </div>
                }
            </div>
            <label htmlFor="isRepeated">
                <input type="checkbox" name="isRepeated" id="isRepeated" onChange={() => setIsRepeated(!isRepeated)} />  Repeated </label>


            <div className='flex items-center justify-end mt-16'>
                <button onClick={closeModal} type='button' className='py-3 px-10 font-semibold'>Cancel</button>
                <button className='bg-primary py-3 px-10 text-white font-semibold'>Submit</button>
            </div>
        </form>
    )
}

export default CreateRequiredDocumentModal