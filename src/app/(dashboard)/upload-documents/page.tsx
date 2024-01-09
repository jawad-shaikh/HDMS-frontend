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
  const [documents, setDocuments] = useState<any>();
  const [document, setDocument] = useState<any>({});
  const [requests, setRequests] = useState<any>([]);
  const [isPanelOpen, setPanelOpen] = useState(false);
  const [upload, setUpload] = useState(false);

  const [hrs, setHrs] = useState([]);

  const [query, setQuery] = useState('');

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
      cell: (info) => (info.getValue() ? convertDate(info.getValue()) : "-"),
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
        <div className="flex items-center gap-4">
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
      const { data } = await API.submissionDocuments(query);
      setDocuments(data.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const fetchRequests = async () => {
    try {
      const { data } = await API.documentRequests();
      console.log(data)
      setRequests(data.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const fetchHrs = async () => {
    try {
      const { data } = await API.hrs();
      setHrs(data.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchHrs();
  }, []);

  useEffect(() => {
    if (!upload) {
      setDocuments('')
      fetchDocuments();
      fetchRequests();
    }
  }, [upload,query]);

  return (
    <>
      <title>Uploaded Departments - HDMS</title>
      <PageTitle
        title={"Uploaded Documents"}
        icon={<Icons.upload className="w-8 h-8" />}
        buttonText="Upload Document"
        onClick={() => setUpload(true)}
        buttonIcon={<Icons.upload className="w-5 h-5" />}

      />
      <Table data={documents} columns={columns} setQuery={setQuery} status={true} expireDate={true} uploadDate={true} hrs={hrs}  />

      {document ? (
        <PanelWrapper
          open={isPanelOpen}
          setOpen={setPanelOpen}
          title={"Detail Document"}
          document={document}
        />
      ) : null}

<ModalWrapper
        title="Upload Documents Form"
        open={upload}
        setOpen={setUpload}
      >
        <UploadDocumentModal
          data={requests}
          closeModal={() => setUpload(false)}
        />
      </ModalWrapper>
    </>
  );
}
