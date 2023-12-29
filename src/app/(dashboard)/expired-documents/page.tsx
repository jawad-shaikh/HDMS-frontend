'use client'
import PageTitle from "@/components/global/PageTitle";
import { Icons } from "@/components/global/icons";
import Table from "@/components/ui/Table";
import API from "@/service/api";
import { convertDate } from "@/utils/helper";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const columnHelper = createColumnHelper<any>();

export default function ExpiredDocumentsPage() {
  const [documents, setDocuments] = useState([]);

  const columns = [
    columnHelper.accessor('id', {
      cell: (info) => info.getValue().toString(),
      header: () => 'No',
    }),
    columnHelper.accessor('title', {
      cell: (info) => info.getValue(),
      header: 'Name',
    }),
    columnHelper.accessor('createdAt', {
      cell: (info) => info.getValue(),
      header: 'No Employee',
    }),
    columnHelper.accessor('title', {
      cell: (info) => info.getValue(),
      header: 'No ID',
    }),
    columnHelper.accessor('title', {
      cell: (info) => info.getValue(),
      header: 'Title',
    }),
    columnHelper.accessor('title', {
      cell: (info) => convertDate(info.getValue()),
      header: 'Upload Date',
    }),
    columnHelper.accessor('title', {
      cell: (info) => convertDate(info.getValue()),
      header: 'Expiry Date',
    }),
    // Add more columns as needed
  ];

  const fetchDocuments = async () => {
    try {
      const { data } = await API.expiredHistory();
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
                  <PageTitle title={"Document History"} icon={<Icons.error className="w-8 h-8" />} />
                  <Table data={documents} columns={columns} />

    </>
  )
}
