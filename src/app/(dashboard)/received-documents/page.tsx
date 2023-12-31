"use client";
import PageTitle from "@/components/global/PageTitle";
import { Icons } from "@/components/global/icons";
import PanelWrapper from "@/components/ui/PanelWrapper";
import Table from "@/components/ui/Table";
import API from "@/service/api";
import { convertDate } from "@/utils/helper";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const columnHelper = createColumnHelper<any>();

export default function ReceivedDocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [document, setDocument] = useState<any>({});
  const [isPanelOpen, setPanelOpen] = useState(false);

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue().toString(),
      header: () => "No",
    }),
    columnHelper.accessor((row) => row.user ? `${row.user.firstName} ${row.user.lastName}` : '-', {
      id: "name",
      header: "Name",
    }),

    columnHelper.accessor((row) => row.user ? `${row.user.employeeNumber}` : '-', {
      id: "employeeNumber",
      header: "No Employee",
    }),

    columnHelper.accessor((row) => row.user ? `${row.user.idNumber}` : '-', {
      id: "idNumber",
      header: "No ID",
    }),

    columnHelper.accessor((row) => row.documentRequest ? `${row.documentRequest.title}` : '-', {
      id: "title",
      header: "Title",
    }),


    columnHelper.accessor('updatedAt', {
      cell: (info) => convertDate(info.getValue()),
      header: "Upload Date",
    }),
    columnHelper.accessor('expireDate', {
      cell: (info) => info.getValue() ? convertDate(info.getValue()) : '-',
      header: 'Expiry Date',
    }),

    columnHelper.display({
      id: "action",
      header: () => 'Action',
      cell: props => <button onClick={() => {
        setDocument(props.row.original)
        setPanelOpen(true)
      }}>
        <Icons.eye />
      </button>,
    }),
  ];

  const fetchDocuments = async () => {
    try {
      const { data } = await API.submissionDocuments();
      setDocuments(data.data)
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  
  useEffect(() => {
    if(!isPanelOpen){
      fetchDocuments()

    }
  }, [isPanelOpen])


  return (
    <>
      <PageTitle title={"Received Documents"} icon={<Icons.received className="w-8 h-8" />} />
      <Table data={documents} columns={columns} />

      {document ? (
      <PanelWrapper open={isPanelOpen} setOpen={setPanelOpen} title={'Detail Document'} document={document} />
      ) : null}
    </>
  );
}
