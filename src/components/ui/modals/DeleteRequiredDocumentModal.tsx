import API from '@/service/api';
import React, { FC } from 'react'
import toast from 'react-hot-toast';

const DeleteRequiredDocumentModal:FC<any> = ({data, closeModal}) => {

    const deleteHandler = async () => {
        try {
            await API.deleteRequiredDocument(data.id)
            toast.success('Success delete document!')
            closeModal()
        } catch (error: any) {
            console.log(error)
            toast.error('Failed delete document!')
        }
    };
  return (
    <div>
        <p>Are you sure want to delete this document?</p>
        <div className='flex items-center justify-end mt-16'>
            <button onClick={closeModal} type='button' className='py-3 px-10 font-semibold'>Cancel</button>
            <button onClick={deleteHandler} className='bg-red py-3 px-10 text-white font-semibold'>Delete</button>
        </div>
    </div>
  )
}

export default DeleteRequiredDocumentModal