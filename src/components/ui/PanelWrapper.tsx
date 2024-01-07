"use client";
import { Fragment, useEffect, useState } from "react";
import byteSize from 'byte-size';
import { Dialog, Transition } from "@headlessui/react";
// import { saveAs } from 'file-saver';
import { Icons } from "../global/icons";
import { convertDate, formatTime } from "@/utils/helper";
import API from "@/service/api";
import toast from "react-hot-toast";
import ModalWrapper from "./ModalWrapper";
import ConfirmModal from "./modals/ConfirmModal";

const PanelWrapper = ({ open, setOpen, title, document, isUpdate }: any) => {
  const [user, setUser] = useState<any>({});
  const [isApprove, setIsApprove] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [modal, setModal] = useState(false);


  const downloadDoc = async (id: string) => {
    try {
      const {data} = await API.downloadDocuments(id, `?remove=${isConfirm}`);


      const blob = new Blob([data], {type: 'application/zip'});
      // Create a download link and trigger the download
      const downloadLink = window.document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = 'downloaded_files.zip';
      window.document.body.appendChild(downloadLink);
      downloadLink.click();
      window.document.body.removeChild(downloadLink);
      


    } catch (error) {
      console.error("Error downloading documents:", error);
    }finally {
      setOpen(false)
    }
  };

  const updateDoc = async () => {
    try {
      if (isApprove) {
        if (isApprove === "APPROVED") {
          await API.documentApprove(document.id);
        } else {
          await API.documentReject(document.id);
        }
      }
      toast.success("New user created");
      // setOpen()
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setOpen(false);
    }
  };

  const confirmHandler = () => {
    if (isConfirm) {
      setIsConfirm(false);
    } else {
      setModal(true);
    }
  }

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem("user") || ""));
  }, []);

  useEffect(() => {
    setIsConfirm(false)
  }, [open])

  return (

    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-[664px]">
                    <ModalWrapper title="Document Received and Downloaded?" open={modal} setOpen={setModal}>
                      <ConfirmModal
                        closeModal={() => setModal(false)}
                        onSubmit={() => {
                          setIsConfirm(true)
                          setModal(false)
                        }}
                      />
                    </ModalWrapper>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6 pb-4 border-b border-gray mb-6 flex items-center justify-between">
                        <Dialog.Title
                          as="h3"
                          className="text-2xl font-semibold leading-6"
                        >
                          {title}
                        </Dialog.Title>
                        <Transition.Child
                          as={Fragment}
                          enter="ease-in-out duration-500"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="ease-in-out duration-500"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <div className="">
                            <button type="button" onClick={() => setOpen(false)}>
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 32 32"
                                fill="none"
                              >
                                <path
                                  d="M20 12L12 20M12 12L19.9999 20"
                                  stroke="#404040"
                                  strokeWidth="2.4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M4 16C4 10.3431 4 7.51472 5.75736 5.75736C7.51472 4 10.3431 4 16 4C21.6569 4 24.4853 4 26.2426 5.75736C28 7.51472 28 10.3431 28 16C28 21.6569 28 24.4853 26.2426 26.2426C24.4853 28 21.6569 28 16 28C10.3431 28 7.51472 28 5.75736 26.2426C4 24.4853 4 21.6569 4 16Z"
                                  stroke="#404040"
                                  strokeWidth="2.4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </Transition.Child>
                      </div>
                      <div className="relative flex-1 px-4 sm:px-6">
                        <h2 className="text-xl font-semibold mb-4">
                          Information Document
                        </h2>

                        <dd className="mt-2 text-sm text-[#616161] sm:col-span-2 sm:mt-0 border border-gray mb-4">
                          <div className="flex items-center justify-between p-4 border-b border-gray">
                            <h4 className="font-bold">Attached Documents</h4>
                            {document?.documents?.length &&
                              !document?.documents[0].hasDownloaded &&
                              (user.role === "ADMIN" || user.role === "HR") ? (
                                <button
                                  onClick={() => downloadDoc(document.id)}
                                  className="border border-primary text-primary font-medium text-xs px-4 py-2"
                                >
                                  {" "}
                                  Download All File(s)
                                </button>
                              ) : null}
                          </div>

                          <ul role="list" className="divide-y divide-white">
                            {document?.documents &&
                              document.documents.map((document: any) => (
                                <li
                                  key={document.fileName}
                                  className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                                >
                                  <div className="flex w-0 flex-1 items-center">
                                    <Icons.link
                                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                                      aria-hidden="true"
                                    />
                                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                      <span className="truncate font-medium">
                                        {document.fileName}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="ml-4 flex-shrink-0">
                                    <span className="flex-shrink-0 text-gray-400">
                                      {byteSize(document.size).value} {byteSize(document.size).unit}
                                    </span>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </dd>

                        {
                          (document?.documents?.length && (user.role === "ADMIN" || user.role === "HR")) ?<label className="text-primary text-xs inline-flex mb-6">
                            <input type="checkbox" className="!mr-2" checked={isConfirm} onChange={confirmHandler} />
                            Document Received and Downloaded
                          </label> : null
                        }

                        {/* {
                                                document.status === "PENDING" && <label htmlFor="remember">
                                                    <input disabled checked={!(document?.documents?.length && !document?.documents[0].hasDownloaded)} type="checkbox" name="remember" id="remember" className='mb-6 text-xs' />  Document Received and Downloaded</label>
                                            } */}
                        {document.documentRequest && (
                          <div className="border-t border-gray">
                            <div className="my-4">
                              <label className="block mb-2 text-sm">
                                Purpose
                              </label>
                              <input
                                type="input"
                                className="block border-2 border-gray w-full p-2 outline-none"
                                disabled
                                value={document.documentRequest.documentType}
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block mb-2 text-sm">
                                Description
                              </label>
                              <textarea
                                className="block border-2 border-gray w-full p-2 outline-none"
                                rows={5}
                                disabled
                                value={document.documentRequest.description}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="mb-4">
                                <label className="block mb-2 text-sm">
                                  Upload Date
                                </label>
                                <input
                                  type="input"
                                  className="block border-2 border-gray w-full p-2 outline-none"
                                  disabled
                                  value={convertDate(
                                    document.documentRequest.updatedAt,
                                  )}
                                />
                              </div>
                              <div className="mb-4">
                                <label className="block mb-2 text-sm">
                                  Status
                                </label>
                                <select
                                  defaultValue={document.status}
                                  disabled={!isUpdate}
                                  onChange={(e) => setIsApprove(e.target.value)}
                                  className="block border-2 border-gray w-full p-2 outline-none"
                                >
                                  <option disabled>PENDING</option>
                                  <option value="APPROVED">APPROVED</option>
                                  <option value="REJECTED">REJECTED</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}

                        <details
                          className="group [&_summary::-webkit-details-marker]:hidden border-t pt-4 border-gray"
                          open
                        >
                          <summary className="flex cursor-pointer items-center justify-between">
                            <h2 className="text-xl font-semibold">History</h2>
                            <svg
                              className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </summary>

                          <ul>
                            {document.documentHistory
                              ?.map((history: any) => (
                                <li className="flex items-start relative justify-between pl-4 py-4">
                                  <svg
                                    className="absolute  h-[50px] -left-[12px]"
                                    width="24"
                                    height="84"
                                    viewBox="0 0 24 84"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle
                                      cx="12"
                                      cy="12"
                                      r="6"
                                      fill="#004AAB"
                                    />
                                    <path d="M12 28V84" stroke="#004AAB" />
                                  </svg>

                                  <div>
                                    <p className="text-sm">
                                      {history.action.split("'")[0]}{" "}
                                      <span className="font-semibold text-primary">
                                        {" "}
                                        {history.action.split("'")[1]}{" "}
                                      </span>
                                    </p>
                                    {/* <q className='text-xs mt-2 block'>notification.description</q> */}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <p className="text-xs">
                                      {convertDate(history.createdAt)}
                                    </p>
                                    <p className="text-xs">
                                      {formatTime(history.createdAt).toLocaleUpperCase()}
                                    </p>
                                  </div>
                                </li>
                              ))
                              .reverse()}

                            <li className="flex items-start relative justify-between pl-4 py-4">
                              <svg
                                className="absolute h-[50px] -left-[12px]"
                                width="24"
                                height="84"
                                viewBox="0 0 24 84"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="12" cy="12" r="6" fill="#004AAB" />
                              </svg>

                              <div>
                                <p className="text-sm">
                                  Requested document by{" "}
                                  <span className="font-semibold text-primary">
                                    {" "}
                                    {
                                      document.documentRequest?.createdBy
                                        ?.firstName
                                    }{" "}
                                    {
                                      document.documentRequest?.createdBy
                                        ?.lastName
                                    }
                                  </span>
                                </p>
                                {/* <q className='text-xs mt-2 block'>notification.description</q> */}
                              </div>
                              <div className="flex items-center gap-2">
                                <p className="text-xs">
                                  {convertDate(document.documentRequest?.createdAt)}
                                </p>
                                <p className="text-xs">
                                  {formatTime(document.documentRequest?.createdAt).toLocaleUpperCase()}
                                </p>
                              </div>
                            </li>
                          </ul>
                        </details>

                        {isUpdate ? (
                          <div className="flex items-center justify-end mt-16">
                            <button
                              onClick={() => setOpen(false)}
                              type="button"
                              className="py-3 px-10 font-semibold"
                            >
                              Cancel
                            </button>
                            <button
                              disabled={isApprove ? false : true}
                              onClick={updateDoc}
                              className="bg-primary py-3 px-10 text-white font-semibold"
                            >
                              Update
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>

  );
};

export default PanelWrapper;
