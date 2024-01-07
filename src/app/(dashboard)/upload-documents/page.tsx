"use client";
import PageTitle from "@/components/global/PageTitle";
import { Icons } from "@/components/global/icons";
import ModalWrapper from "@/components/ui/ModalWrapper";
import PanelWrapper from "@/components/ui/PanelWrapper";
import Table from "@/components/ui/Table";
import UpdateUploadDocumentModal from "@/components/ui/modals/UpdateUploadDocumentModal";
import UploadDocumentModal from "@/components/ui/modals/UploadDocumentModal";
import API from "@/service/api";
import { convertDate } from "@/utils/helper";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const columnHelper = createColumnHelper<any>();

export default function UploadDocumentPage() {
  const [documents, setDocuments] = useState([]);
  const [document, setDocument] = useState<any>({});
  const [isPanelOpen, setPanelOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue().toString(),
      header: () => "No",
    }),
    columnHelper.accessor(
      (row) => (row.documentRequest ? `${row.documentRequest.title} ` : "-"),
      {
        id: "title",
        header: "Title",
      },
    ),
    columnHelper.accessor(
      (row) =>
        row.documentRequest
          ? `${row.documentRequest.createdBy.firstName} ${row.documentRequest.createdBy.lastName}`
          : "-",
      {
        id: "hrEmployee",
        header: "HR Employee",
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
      header: () => "status",
      cell: (props) => (
        <p
          className={`px-4 py-2 text-center border ${
            props.row.original.status === "PENDING"
              ? "border-black/50 text-black/50"
              : props.row.original.status === "REJECTED"
                ? "border-red text-red"
                : "border-primary text-primary"
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
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setDocument(props.row.original);
              setUpdate(true);
            }}
          >
            <Icons.edit className="text-blue-500 w-5 h-5" />
          </button>
          <button
            onClick={() => {
              setDocument(props.row.original);
              setPanelOpen(true);
            }}
          >
            <Icons.eye />
          </button>
        </div>
      ),
    }),
    // Add more columns as needed
  ];

  const fetchDocuments = async () => {
    try {
      const { data } = await API.submissionDocuments();
      setDocuments(data.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!update) {
      fetchDocuments();
    }
  }, [update]);

  return (
    <>
      <title>Uploaded Departments - HDMS</title>
      <PageTitle
        title={"Uploaded Documents"}
        icon={<Icons.upload className="w-8 h-8" />}
      />
      <Table data={documents} columns={columns} />

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
