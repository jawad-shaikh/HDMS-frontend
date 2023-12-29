'use client'
import PageTitle from "@/components/global/PageTitle";
import { Icons } from "@/components/global/icons";
import ModalWrapper from "@/components/ui/ModalWrapper";
import Table from "@/components/ui/Table";
import CreateDepartmentModal from "@/components/ui/modals/CreateDepartmentModal";
import DeleteDepartmentModal from "@/components/ui/modals/DeleteDepartmentModal";
import EditDepartmentModal from "@/components/ui/modals/EditDepartmentModal";
import API from "@/service/api";
import { convertDate } from "@/utils/helper";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Department = {
  id: number;
  name: string;
  headOfDepartment: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  updatedAt: string;
};

const columnHelper = createColumnHelper<Department>();

export default function DepartmentPage() {
  const [departments, setDepartments] = useState([]);

  const [department, setDepartment] = useState({});

  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [deleteM, setDelete] = useState(false);


  const columns = [
    columnHelper.accessor('id', {
      cell: (info) => info.getValue().toString(),
      header: () => 'ID',
    }),
    columnHelper.accessor('name', {
      cell: (info) => info.getValue(),
      header: 'Name',
    }),
    // columnHelper.accessor('headOfDepartment', {
    //   cell: (info) => info.getValue(),
    //   header: 'Head of Department',
    // }),
    columnHelper.accessor((row) => row.headOfDepartment ? `${row.headOfDepartment.firstName} ${row.headOfDepartment.lastName}` : '-', {
      id: "headOfDepartment",
      header: "Head of Department",
    }),
    columnHelper.accessor('updatedAt', {
      cell: (info) => convertDate(info.getValue()),
      header: 'Last Update',
    }),
    columnHelper.display({
      id: "action",
      header: () => 'Action',
      cell: props => <div className="flex items-center gap-4">
      <button onClick={() => {
        setDepartment(props.row.original)
        setUpdate(true)
        }}>
        <Icons.edit className="text-blue-500 w-5 h-5" />
      </button>
      <button onClick={() => {
        setDepartment(props.row.original)
        setDelete(true)
        }}>
        <Icons.trash className="text-red-500 w-6 h-6" />
      </button>
    </div>,
    }),
    // Add more columns as needed
  ];

  const fetchUsers = async () => {
    try {
      const {data} = await API.departments();
      setDepartments(data.data)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [create, update])

  return (
    <>
      <PageTitle title={"Department"} icon={<Icons.department className="w-8 h-8" />} buttonText="Add New Department" onClick={() => setCreate(true)} />
      <Table data={departments} columns={columns} />

      <ModalWrapper title="Create New Department" open={create} setOpen={setCreate}>
        <CreateDepartmentModal closeModal={() => setCreate(false)} />
      </ModalWrapper>

      <ModalWrapper title="Edit User" open={update} setOpen={setUpdate}>
        <EditDepartmentModal defaultValue={department} closeModal={() => setUpdate(false)} />
      </ModalWrapper>

      <ModalWrapper title="Delete Department" open={deleteM} setOpen={setDelete}>
        <DeleteDepartmentModal data={department} closeModal={() => setDelete(false)} />
      </ModalWrapper>
    </>
  )
}
