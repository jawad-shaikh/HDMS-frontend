"use client";
import PageTitle from "@/components/global/PageTitle";
import { Icons } from "@/components/global/icons";
import ModalWrapper from "@/components/ui/ModalWrapper";
import Table from "@/components/ui/Table";
import CreateUserModal from "@/components/ui/modals/CreateUserModal";
import DeleteUserModal from "@/components/ui/modals/DeleteUserModal";
import EditUserModal from "@/components/ui/modals/EditUserModal";
import API from "@/service/api";
import { convertDate } from "@/utils/helper";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Person = {
  id: number;
  firstName: string;
  lastName: string;
  departmentId: number;
  employeeNumber: string;
  idNumber: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  department: {
    id: number;
    name: string;
  };
};

const columnHelper = createColumnHelper<Person>();

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  const [user, setUser] = useState({});

  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [deleteM, setDelete] = useState(false);

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue().toString(),
      header: () => "ID",
    }),
    columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
      id: "fullName",
      header: "Name",
    }),
    columnHelper.accessor("employeeNumber", {
      cell: (info) => info.getValue(),
      header: "Employee Number",
    }),
    columnHelper.accessor(
      (row) => (row.department ? `${row.department.name}` : "-"),
      {
        id: "department",
        header: "Department",
      },
    ),
    columnHelper.accessor("email", {
      cell: (info) => <i>{info.getValue()}</i>,
      header: "Email",
    }),
    columnHelper.accessor("updatedAt", {
      cell: (info) => convertDate(info.getValue()),
      header: "Last Update",
    }),
    columnHelper.display({
      id: "action",
      header: () => "Action",
      cell: (props) => (
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setUser(props.row.original);
              setUpdate(true);
            }}
          >
            <Icons.edit className="text-blue-500 w-5 h-5" />
          </button>
          <button
            onClick={() => {
              setUser(props.row.original);
              setDelete(true);
            }}
          >
            <Icons.trash className="text-red-500 w-6 h-6" />
          </button>
        </div>
      ),
    }),
    // Add more columns as needed
  ];

  const fetchUsers = async () => {
    try {
      const { data } = await API.users();
      setUsers(data.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [create, update, deleteM]);

  return (
    <>
      <title>Users - HDMS</title>
      <PageTitle
        title={"Users"}
        icon={<Icons.users className="w-8 h-8" />}
        buttonText="Add New User"
        onClick={() => setCreate(true)}
      />
      <Table data={users} columns={columns} />

      <ModalWrapper title="Create New User" open={create} setOpen={setCreate}>
        <CreateUserModal closeModal={() => setCreate(false)} />
      </ModalWrapper>

      <ModalWrapper title="Edit User" open={update} setOpen={setUpdate}>
        <EditUserModal
          defaultValue={user}
          closeModal={() => setUpdate(false)}
        />
      </ModalWrapper>

      <ModalWrapper title="Delete User" open={deleteM} setOpen={setDelete}>
        <DeleteUserModal data={user} closeModal={() => setDelete(false)} />
      </ModalWrapper>
    </>
  );
}
