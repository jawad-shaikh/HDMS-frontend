"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "./FormInput";
import FormInputPassword from "./FormInputPassword";
import { RegisterForm } from "@/utils/types";
import Link from "next/link";
import { registerSchema } from "@/utils/validations";
import FormSelect from "./FormSelect";
import { useRouter } from "next/navigation";
import API from "@/service/api";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const router = useRouter();
  const [departments, setDepartments] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (credential: RegisterForm) => {
    const { confirmPassword, departmentId, ...data } = credential;
    try {
      await toast.promise(
        API.register({ ...data, departmentId: Number(departmentId) }),
        {
          loading: "Please wait...",
          success: "Registered successfully",
          error: (error: any) => `Failed to Registered.`,
        },
      );
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  const getDepartments = async () => {
    try {
      const { data } = await API.departments();
      setDepartments(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDepartments();
  }, []);

  return (
    <div className="p-8 bg-white max-w-[520px] form-shadow mx-auto rounded-md">
      <h1 className="mb-6 text-3xl font-semibold">Register</h1>
      <p className="mb-12">Create new account</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label={"First Name"}
          placeholder="Enter your first name"
          register={register}
          name={"firstName"}
          errors={errors}
        />
        <FormInput
          label={"Last Name"}
          placeholder="Enter your last name"
          register={register}
          name={"lastName"}
          errors={errors}
        />
        <FormInput
          label={"Email Address"}
          placeholder="Enter your email address"
          register={register}
          name={"email"}
          errors={errors}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label={"Employee Number"}
            placeholder="Enter employee number"
            register={register}
            name={"employeeNumber"}
            errors={errors}
          />
          <FormInput
            label={"ID number"}
            placeholder="Enter ID number"
            register={register}
            name={"idNumber"}
            errors={errors}
          />
        </div>
        <FormSelect
          label={"Department"}
          options={departments}
          register={register}
          name={"departmentId"}
          errors={errors}
        />
        <FormInputPassword
          label={"Password"}
          placeholder="Enter your password"
          register={register}
          name={"password"}
          errors={errors}
        />
        <FormInputPassword
          label={"Confirm Password"}
          placeholder="Re-enter your password"
          register={register}
          name={"confirmPassword"}
          errors={errors}
        />

        {/* <label htmlFor="remember">
                    <input type="checkbox" name="remember" id="remember" />  I have read and agree to the </label> */}
        <button disabled={!(watch('firstName') && watch('lastName') && watch('email') && watch('employeeNumber') && watch ('idNumber') && watch('departmentId') && watch('password') && watch('confirmPassword')) ? true: false} className="bg-primary disabled:bg-gray w-full mt-8 mb-6 py-3 text-white font-semibold">
          Register
        </button>
      </form>
      <hr className="text-gray" />
      <p className="flex items-center justify-center text-black/50 my-4 gap-2">
        Already have an account?
        <Link href="/login" className="text-primary font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
