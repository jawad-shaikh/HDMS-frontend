'use client'
import PageTitle from "@/components/global/PageTitle";
import { Icons } from "@/components/global/icons";
import ModalWrapper from "@/components/ui/ModalWrapper";
import Table from "@/components/ui/Table";
import UploadDocumentModal from "@/components/ui/modals/UploadDocumentModal";
import API from "@/service/api";
import { convertDate } from "@/utils/helper";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const columnHelper = createColumnHelper<any>();

export default function UploadDocumentPage() {
  const [documents, setDocuments] = useState([]);

  const [upload, setUpload] = useState(false);
  const [view, setView] = useState(false);

  const columns = [
    columnHelper.accessor('id', {
      cell: (info) => info.getValue().toString(),
      header: () => 'No',
    }),
    columnHelper.accessor('title', {
      cell: (info) => info.getValue(),
      header: 'Title',
    }),
    columnHelper.accessor('createdAt', {
      cell: (info) => info.getValue(),
      header: 'HR Employee',
    }),
    columnHelper.accessor('title', {
      cell: (info) => convertDate(info.getValue()),
      header: 'Upload Date',
    }),
    columnHelper.accessor('title', {
      cell: (info) => convertDate(info.getValue()),
      header: 'Expiry Date',
    }),
    columnHelper.display({
      id: "status",
      header: () => 'status',
      cell: props => <div className="flex items-center gap-4">

      </div>,
    }),
    columnHelper.display({
      id: "action",
      header: () => 'action',
      cell: props => <div className="flex items-center gap-4">

      </div>,
    }),
    // Add more columns as needed
  ];

  const fetchDocuments = async () => {
    try {
      const { data } = await API.submissionDocuments();
      setDocuments(data.data)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

  return (
    <>
      <PageTitle title={"Upload Documents"} icon={<Icons.history className="w-8 h-8" />} buttonText="Upload Document" onClick={() => setUpload(true)} />
      <Table data={documents} columns={columns} />


    </>
  )
}
