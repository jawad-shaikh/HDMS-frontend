import { InputProps } from "@/utils/types";
import React from "react";
import { Icons } from "../global/icons";

const FormInput: React.FC<InputProps> = ({
  register,
  name,
  errors,
  label,
  placeholder,
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        className="block border-2 border-gray w-full p-2 outline-none"
        placeholder={placeholder}
        {...register(name)}
        aria-invalid={errors[name] ? "true" : "false"}
      />
      {errors[name] && (
        <div role="alert" className="flex items-center mt-2 text-red">
          <Icons.required />
          <p className="text-sm ml-1 mt-[2px]">{errors[name]?.message}</p>
        </div>
      )}
    </div>
  );
};

export default FormInput;
