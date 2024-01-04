'use client'
import PageTitle from "@/components/global/PageTitle";
import { Icons } from "@/components/global/icons";
import ModalWrapper from "@/components/ui/ModalWrapper";
import Table from "@/components/ui/Table";
import CreateRequiredDocumentModal from "@/components/ui/modals/CreateRequiredDocumentModal";
import DeleteRequiredDocumentModal from "@/components/ui/modals/DeleteRequiredDocumentModal";
import EditRequiredDocumentModal from "@/components/ui/modals/EditRequiredDocumentModal";
import UploadDocumentModal from "@/components/ui/modals/UploadDocumentModal";
import API from "@/service/api";
import { convertDate } from "@/utils/helper";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const columnHelper = createColumnHelper<any>();

export default function RequiredDocumentsPage() {

  const [documents, setDocuments] = useState([]);

  const [document, setDocument] = useState({});

  const [upload, setUpload] = useState(false);
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [deleteM, setDelete] = useState(false);

  const [user, setUser] = useState<any>({});


  const columns = [
    columnHelper.accessor('id', {
      cell: (info) => info.getValue().toString(),
      header: () => 'ID',
    }),
    columnHelper.accessor('title', {
      cell: (info) => info.getValue(),
      header: 'Title',
    }),
    columnHelper.accessor('createdAt', {
      cell: (info) => convertDate(info.getValue()),
      header: 'Requested Date',
    }),
    columnHelper.display({
      id: "action",
      header: () => 'Action',
      cell: props => <div className="flex items-center gap-4">
        {user.role === "ADMIN" || user.role === "HR" ?
          <>
            <button onClick={() => {
              setDocument(props.row.original)
              setUpdate(true)
            }}>
              <Icons.edit className="text-blue-500 w-5 h-5" />
            </button>
            <button onClick={() => {
              setDocument(props.row.original)
              setDelete(true)
            }}>
              <Icons.trash className="text-red-500 w-6 h-6" />
            </button></> :
          <button onClick={() => {
            setDocument(props.row.original)
            setUpload(true)
          }}>
            <Icons.upload className="text-green-500 w-5 h-5" />
          </button>

        }
      </div>,
    }),
    // Add more columns as needed
  ];

  const fetchDocuments = async () => {
    try {
      const { data } = await API.requiredDocuments();
      setDocuments(data.data)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem('user') || ''))
  }, [])

  useEffect(() => {
    if (!create && !update && !deleteM && !upload) {
      fetchDocuments()
    }
  }, [create, update, deleteM, upload])


  return (
    <>

      {
        user.role === "ADMIN" || user.role === "HR" ? <PageTitle title={"Required Documents"} icon={<Icons.required className="w-8 h-8" />} buttonText="Add Document" onClick={() => setCreate(true)} />
          : <PageTitle title={"Required Documents"} icon={<Icons.required className="w-8 h-8" />} />

      }
      <Table data={documents} columns={columns} />

      <ModalWrapper title="Create New Document" open={create} setOpen={setCreate}>
        <CreateRequiredDocumentModal closeModal={() => setCreate(false)} />
      </ModalWrapper>

      <ModalWrapper title="Edit Required Documents Form" open={update} setOpen={setUpdate}>
        <EditRequiredDocumentModal defaultValue={document} closeModal={() => setUpdate(false)} />
      </ModalWrapper>

      <ModalWrapper title="Delete Document?" open={deleteM} setOpen={setDelete}>
        <DeleteRequiredDocumentModal data={document} closeModal={() => setDelete(false)} />
      </ModalWrapper>

      <ModalWrapper title="Upload Documents Form" open={upload} setOpen={setUpload}>
        <UploadDocumentModal data={document} closeModal={() => setUpload(false)} />
      </ModalWrapper>
    </>
  )
}
