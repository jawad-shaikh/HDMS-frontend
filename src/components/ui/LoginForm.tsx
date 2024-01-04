'use client'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from './FormInput';
import FormInputPassword from './FormInputPassword';
import { LoginForm } from '@/utils/types';
import Link from 'next/link';
import { loginSchema } from '@/utils/validations';
import API from '@/service/api';
import useAuthStore from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


const LoginForm = () => {
    const router = useRouter();
    const [isRemember, setIsRemember] = useState(false)
    const {login, user} = useAuthStore();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: yupResolver(loginSchema)
    });

    const onSubmit = async(credential: LoginForm) => {
        

        try {
            const {data: {data: {token, userData}}} = await API.login(credential);

            if(token) {
                login(token, userData);
                isRemember ? localStorage.setItem('token', token) : sessionStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(userData));
                router.push('/required-documents')
            }
            
        } catch (error: any) {
            toast.error(error.response.data.error);
            console.log(error.response.data.error)
        }
        
    };

    return (
        <div className='p-8 bg-white max-w-[520px] mx-auto form-shadow'>
            <h1 className='mb-6 text-3xl font-semibold'>Login</h1>
            <p className='mb-12'>Sign in into your account</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput label={'Email Address'} placeholder='Enter your email address' register={register} name={'email'} errors={errors} />
                <FormInputPassword label={'Password'} placeholder='Enter your password' register={register} name={'password'} errors={errors} />
                <label htmlFor="remember">
                    <input onChange={() => setIsRemember(!isRemember)} type="checkbox" name="remember" id="remember"  /> Remember Me </label>
                <button className='bg-primary w-full mt-8 mb-6 py-3 text-white font-semibold'>Login</button>
            </form>
            {/* <Link href="/forgot-password" className="text-primary font-semibold text-center mt-4 mb-6 block">Forgot Password</Link> */}
            <hr className='text-gray' />
            <p className='flex items-center justify-center text-black/50 my-4 gap-2'>
                Don’t have an account?
                <Link href="/register" className='text-primary font-semibold'>
                    Register
                </Link>
            </p>
        </div>

    )
}

export default LoginForm