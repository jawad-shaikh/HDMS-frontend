'use client'
import React, { useEffect, useState } from 'react'
import FormSelect from '../FormSelect'
import { yupResolver } from '@hookform/resolvers/yup'
import { uploadDocumentSchema } from '@/utils/validations'
import { useForm } from 'react-hook-form'
import API from '@/service/api'
import { IUploadDocument } from '@/utils/types'
import toast from 'react-hot-toast'
import { Icons } from '@/components/global/icons'

const UploadDocumentModal: React.FC<any> = ({ data, closeModal }) => {
    const [departments, setDepartments] = useState([])

    const [selectedFiles, setSelectedFiles] = useState<any>([] as any);

    const { register, handleSubmit, formState: { errors } } = useForm<IUploadDocument>({
        resolver: yupResolver(uploadDocumentSchema)
    });

    const onSubmit = async (fData: IUploadDocument) => {
        if (selectedFiles.length === 0) {
          toast.error('Please Select Files');
          return null;
        }
      
        try {
          const formData = new FormData();
      
          // Append each file to FormData
          for (let i = 0; i < selectedFiles.length; i++) {
            console.log(selectedFiles[i]);
            formData.append('documents', selectedFiles[i]); // Use a consistent name for all files
          }
          formData.append("documentRequestId", data.id);
          formData.append("purpose", fData.purpose);
          formData.append("description", fData.description);
          formData.append("expireDate", fData.expireDate.toISOString());
    
          await toast.promise(
            API.uploadDocument(formData),
            {
              loading: 'Uploading document...',
              success: 'Document uploaded successfully',
              error: (error: any) => `Failed to upload document. ${error.message}`,
            }
          );
          closeModal();
        } catch (error: any) {
          console.error(error);
          toast.error('Failed to upload document. ' + error.message);
        }
      };
      
      const onFileChange = (event: any) => {
        setSelectedFiles([...event.target.files]);
      };

    const getDepartments = async () => {
        try {
            const { data } = await API.departments();

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

            <FormSelect label={'Purpose'} options={[{ id: "NORMAL", name: "Normal" }, { id: "QUESTION", name: "Question" }]} register={register} name={'purpose'} errors={errors} />
            <div className='mb-4'>
                <label className='block mb-2 text-sm' htmlFor={'note'}>Description</label>
                <textarea id={'note'} className='block border-2 border-gray w-full p-2 outline-none' placeholder={'Enter notes document'} {...register('description')} aria-invalid={errors.description ? "true" : "false"} />
                {errors.description &&
                    <div role="alert" className='flex items-center mt-2 text-red'>
                        <Icons.required />
                        <p className='text-sm ml-1 mt-[2px]'>{errors.description?.message}</p>
                    </div>
                }
            </div>

            <div>
                <label htmlFor="cover-photo" className='block mb-2 text-sm'>Upload</label>
                <div className="flex justify-center flex-col items-center border border-gray px-6 py-10">

                    {selectedFiles.length > 0 ? (
                        <ul>
                            {selectedFiles?.map((file: any, index: number) => (
                                <li className="text-xs leading-5 text-gray-400" key={index}>{file.name}</li>
                            ))}
                        </ul>
                    ) :
                        <>
                            <div className="flex text-sm leading-6 text-gray-600">
                                <label htmlFor="fileUpload" className="relative cursor-pointer border border-gray px-4 py-3 text-primary">
                                    <span>Upload a file</span>
                                    <input id="fileUpload" type="file" multiple onChange={onFileChange} className="sr-only" />
                                </label>
                            </div>
                            <p className="text-sm leading-5 text-gray-600 mt-4 mb-1">Click or drag file to this area to upload</p>
                            <p className="text-xs leading-5 text-gray-400">File format jpg, png, pdf, docx and xlsx</p>
                        </>
                    }
                </div>
            </div>

            <div className='mb-4'>
                <label className='block mb-2 text-sm' htmlFor={'expiredDate'}>Expired Date</label>
                <input type='date' id={'expiredDate'} className='block border-2 border-gray w-full p-2 outline-none' placeholder={'Enter notes document'} {...register('expireDate')} aria-invalid={errors.expireDate ? "true" : "false"} />
                {errors.expireDate &&
                    <div role="alert" className='flex items-center mt-2 text-red'>
                        <Icons.required />
                        <p className='text-sm ml-1 mt-[2px]'>{errors.expireDate?.message}</p>
                    </div>
                }
            </div>

            <div className='flex items-center justify-end mt-16'>
                <button onClick={closeModal} type='button' className='py-3 px-10 font-semibold'>Cancel</button>
                <button className='bg-primary py-3 px-10 text-white font-semibold'>Submit</button>
            </div>
        </form>
    )
}

export default UploadDocumentModal