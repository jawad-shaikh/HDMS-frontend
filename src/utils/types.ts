import { ReactNode } from "react";

export type IconProps = React.HTMLAttributes<SVGElement>

export type SideLinkProps = {
    icon: ReactNode;
    url: string;
    name: string;
}

export type InputProps = {
    register: any;
    name: string;
    errors: any;
    label: string;
    placeholder?: string;
    options?: string[];
}
export type LoginForm = {
    email: string;
    password: string;
}

export type RegisterForm = {
    firstName: string;
    lastName: string;
    departmentId: string;
    employeeNumber: string;
    idNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type TUser = {
    firstName: string;
    lastName: string;
    departmentId?: string | number;
    employeeNumber: string;
    idNumber: string;
    role: string;
    email: string;
    password: string;
}

export type TDepartment = {
    name: string;
    headOfDepartmentId?: string | number;
}

export type TRequiredDocument = {
    title: string;
    description: string;
    documentType: string;
    repeated?: boolean;
}
