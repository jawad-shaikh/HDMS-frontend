"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import API from "@/service/api";
import toast from "react-hot-toast";
import { Icons } from "@/components/global/icons";
import FormSelect from "../FormSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const UploadDocumentModal: React.FC<any> = ({ data, closeModal }) => {
  const [selectedFiles, setSelectedFiles] = useState<any>([] as any);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(yup.object().shape({
      purpose: yup.string().required("Purpose is required"),
    }))
  });

  const onSubmit = async (fData: any) => {
    if (selectedFiles.length === 0) {
      toast.error("Please Select Files");
      return null;
    }
    console.log(fData)
    try {
      const formData = new FormData();

      // Append each file to FormData
      for (let i = 0; i < selectedFiles.length; i++) {
        console.log(selectedFiles[i]);
        formData.append("documents", selectedFiles[i]); // Use a consistent name for all files
      }
      if (data.isRepeated) {
        formData.append("expireDate", new Date(fData.expireDate).toISOString());
      }
      formData.append("documentRequestId", fData.purpose);

      await toast.promise(API.uploadDocument(formData), {
        loading: "Uploading document...",
        success: "Document uploaded successfully",
        error: (error: any) => `Failed to upload document. ${error.message}`,
      });
      closeModal();
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to upload document. " + error.message);
    }
  };

  const isRepeat = () => {
    const obj = data.filter((i: any) => i.id == watch('purpose'))[0];
    return obj?.isRepeated;
  }
  const onFileChange = (event: any) => {
    setSelectedFiles([...event.target.files]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormSelect options={data.map((i:any) => ({id: i.id, name: i.title}))} errors={errors} register={register} label={"Purpose"} name={'purpose'} />
      <div className="mb-4">
        <label htmlFor="cover-photo" className="block mb-2 text-sm">
          Upload
        </label>
        <div className="flex justify-center flex-col items-center border border-gray px-6 py-10">
          {selectedFiles.length > 0 ? (
            <ul>
              {selectedFiles?.map((file: any, index: number) => (
                <li className="text-xs leading-5 text-gray-400" key={index}>
                  {file.name}
                </li>
              ))}
            </ul>
          ) : (
            <>
              <div className="flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="fileUpload"
                  className="relative cursor-pointer border border-gray px-4 py-3 text-primary"
                >
                  <span>Upload a file</span>
                  <input
                    id="fileUpload"
                    type="file"
                    multiple
                    onChange={onFileChange}
                    className="sr-only"
                  />
                </label>
              </div>
              <p className="text-sm leading-5 text-gray-600 mt-4 mb-1">
                Click or drag file to this area to upload
              </p>
              <p className="text-xs leading-5 text-gray-400">
                File format jpg, png, pdf, docx and xlsx
              </p>
            </>
          )}
        </div>
      </div>
      {isRepeat() && (
        <div className="mb-4">
          <label className="block mb-2 text-sm" htmlFor={"expiredDate"}>
            Expired Date
          </label>
          <input
            required
            type="date"
            id={"expiredDate"}
            className="block border-2 border-gray w-full p-2 outline-none"
            placeholder={"Enter notes document"}
            {...register("expireDate")}
            aria-invalid={errors.expireDate ? "true" : "false"}
          />
        </div>
      )}
      <div className="flex items-center justify-end mt-16">
        <button
          onClick={closeModal}
          type="button"
          className="py-3 px-10 font-semibold"
        >
          Cancel
        </button>
        <button className="bg-primary py-3 px-10 text-white font-semibold">
          Submit
        </button>
      </div>
    </form>
  );
};

export default UploadDocumentModal;
