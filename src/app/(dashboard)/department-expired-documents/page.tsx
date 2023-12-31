"use client";
import PageTitle from "@/components/global/PageTitle";
import { Icons } from "@/components/global/icons";
import ModalWrapper from "@/components/ui/ModalWrapper";
import PanelWrapper from "@/components/ui/PanelWrapper";
import Table from "@/components/ui/Table";
import UpdateUploadDocumentModal from "@/components/ui/modals/UpdateUploadDocumentModal";
import API from "@/service/api";
import { calculateDateDifferenceInDays, convertDate } from "@/utils/helper";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const columnHelper = createColumnHelper<any>();

export default function ExpiredDocumentsPage() {
  const [documents, setDocuments] = useState();
  const [document, setDocument] = useState<any>({});
  const [isPanelOpen, setPanelOpen] = useState(false);
  const [update, setUpdate] = useState(false);

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
      (row) => row.documentRequest
        ? `${row.documentRequest.title}` : "-",
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

    columnHelper.accessor(
      (row) =>
        row.documentRequest
          ? `${calculateDateDifferenceInDays(row.updatedAt,row.expireDate)} days`
          : "-",
      {
        id: "calculateDateDifferenceInDays",
        header: "Days Since Expiry",
      },
    ),
    
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
        </div>
      ),
    }),
    // Add more columns as needed
  ];

  const fetchDocuments = async () => {
    try {
      const { data } = await API.departmentExpiredHistory(query);
      setDocuments(data.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [isPanelOpen, update, query]);
  return (
    <>
      <title>Department Expire Documents - HDMS</title>
      <PageTitle
        title={"Department Expired Documents"}
        icon={<Icons.departmentEx className="w-8 h-8" />}
      />
      <Table data={documents} columns={columns} setQuery={setQuery} uploadDate={true} expireDate={true} />

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
