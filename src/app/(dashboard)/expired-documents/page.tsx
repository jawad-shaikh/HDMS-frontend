"use client";
import PageTitle from "@/components/global/PageTitle";
import { Icons } from "@/components/global/icons";
import ModalWrapper from "@/components/ui/ModalWrapper";
import PanelWrapper from "@/components/ui/PanelWrapper";
import Table from "@/components/ui/Table";
import UpdateUploadDocumentModal from "@/components/ui/modals/UpdateUploadDocumentModal";
import API from "@/service/api";
import { convertDate } from "@/utils/helper";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const columnHelper = createColumnHelper<any>();

export default function ExpiredDocumentsPage() {
  const [documents, setDocuments] = useState<any>();
  const [document, setDocument] = useState<any>({});
  const [isPanelOpen, setPanelOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [user, setUser] = useState<any>({});

  const [query, setQuery] = useState('');

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue().toString(),
      header: () => "No",
    }),
    columnHelper.accessor(
      (row) => (row.user ? `${row.user.firstName} ${row.user.lastName}` : "-"),
      {
        id: "name",
        header: "Name",
      },
    ),
    columnHelper.accessor(
      (row) => (row.user ? `${row.user.employeeNumber}` : "-"),
      {
        id: "noEmployee",
        header: "No Employee",
      },
    ),
    columnHelper.accessor((row) => (row.user ? `${row.user.idNumber}` : "-"), {
      id: "noId",
      header: "No ID",
    }),
    columnHelper.accessor(
      (row) => (row.documentRequest ? `${row.documentRequest.title}` : "-"),
      {
        id: "title",
        header: "Title",
      },
    ),
    columnHelper.accessor(
      (row) =>
        row.user
          ? `${row.user.department.name}`
          : "-",
      {
        id: "department",
        header: "Department",
      },
    ),

    columnHelper.accessor("updatedAt", {
      cell: (info) => convertDate(info.getValue()),
      header: "Upload Date",
    }),
    columnHelper.accessor("expireDate", {
      cell: (info) => convertDate(info.getValue()),
      header: "Expiry Date",
    }),
    columnHelper.display({
      id: "status",
      header: () => "Status",
      cell: (props) => (
        <p
          className={`px-4 py-2 text-center border-2 rounded-md font-semibold ${
            props.row.original.status === "PENDING"
              ? "border-black/50 bg-black/10 text-black/50"
              : props.row.original.status === "REJECTED"
                ? "border-red text-red bg-red/20"
                : "border-[#43936C] text-[#43936C] bg-[#43936C]/20"
          } `}
        >
          {props.row.original.status}
        </p>
      ),
    }),
    columnHelper.display({
      id: "action",
      header: () => "Action",
      cell: (props) => (
        <div className="flex items-center justify-start gap-4">
          <button
            onClick={() => {
              setDocument(props.row.original);
              setPanelOpen(true);
            }}
          >
            <Icons.eye />
          </button>
          {user.role === "STAFF" || user.role === "HOD" ? (
            <button
              onClick={() => {
                setDocument(props.row.original);
                setUpdate(true);
              }}
            >
              <Icons.upload className="text-blue-500 w-5 h-5" />
            </button>
          ) : null}
        </div>
      ),
    }),
    // Add more columns as needed
  ];

  const fetchDocuments = async () => {
    try {
      const { data } = await API.expiredHistory(query);
      setDocuments(data.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem("user") || ""));
  }, []);

  useEffect(() => {
    setDocuments('')
    fetchDocuments();
  }, [isPanelOpen, update, query]);

  return (
    <>
      <title>Expired Document - HDMS</title>
      <PageTitle
        title={"Expired Document"}
        icon={<Icons.error className="w-8 h-8" />}
      />
      <Table data={documents} columns={columns} setQuery={setQuery} uploadDate={true} expireDate={true} status={true} />

      {document ? (
        <PanelWrapper
          open={isPanelOpen}
          setOpen={setPanelOpen}
          title={"Detail Document"}
          document={document}
        />
      ) : null}
      <ModalWrapper
        title="Update Documents Form"
        open={update}
        setOpen={setUpdate}
      >
        <UpdateUploadDocumentModal
          data={document}
          closeModal={() => setUpdate(false)}
        />
      </ModalWrapper>
    </>
  );
}
