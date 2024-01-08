import { TDepartment, TUser } from "@/utils/types";
import axios, { AxiosError, AxiosInstance } from "axios";

interface Credentials {
  password: string;
  email: string;
}

interface APIInstance extends AxiosInstance {
  login: (credentials: Credentials) => Promise<any>;
  register: (credentials: any) => Promise<any>;

  users: () => Promise<any>;
  hods: () => Promise<any>;
  createUser: (data: TUser) => Promise<any>;
  updateUser: (id: string, user: any) => Promise<any>;
  deleteUser: (id: string) => Promise<any>;

  departments: () => Promise<any>;
  createDepartment: (department: TDepartment) => Promise<any>;
  updateDepartment: (id: string, department: TDepartment) => Promise<any>;
  deleteDepartment: (id: string) => Promise<any>;

  requiredDocuments: () => Promise<any>;
  createRequiredDocument: (data: any) => Promise<any>;
  updateRequiredDocument: (id: string, data: any) => Promise<any>;
  deleteRequiredDocument: (id: string) => Promise<any>;

  documentHistory: () => Promise<any>;
  expiredHistory: () => Promise<any>;
  departmentExpiredHistory: () => Promise<any>;

  submissionDocuments: () => Promise<any>;
  uploadDocument: (data: any) => Promise<any>;
  documentRequests: () => Promise<any>;
  updateUploadDocument: (id: string, data: any) => Promise<any>;
  downloadDocuments: (id: string, query: any) => Promise<any>;

  documentApprove: (id: string) => Promise<any>;
  documentReject: (id: string) => Promise<any>;

  notifications: () => Promise<any>;
  readNotifications: () => Promise<any>;
}

const API = axios.create({
  baseURL: "https://s2wz3vsq-4400.inc1.devtunnels.ms/api/v1",
  timeout: 30000,
  timeoutErrorMessage: "Timeout error",
}) as APIInstance;

API.login = (credentials) => {
  return API.post("/users/auth/login", credentials);
};

API.register = (credentials) => {
  return API.post("/users/auth/register", credentials);
};

// users
API.users = () => {
  return API.get("/users");
};

API.hods = () => {
  return API.get("/users?role=HOD");
};

API.createUser = (data: TUser) => {
  return API.post("/users", data);
};

API.updateUser = (id: string, data: any) => {
  return API.patch(`/users/${id}`, data);
};

API.deleteUser = (id: string) => {
  return API.delete(`/users/${id}`);
};
// departments
API.departments = () => {
  return API.get("/departments");
};

API.createDepartment = (department: TDepartment) => {
  return API.post("/departments", department);
};

API.updateDepartment = (id: string, department: TDepartment) => {
  return API.patch(`departments/${id}`, department);
};

API.deleteDepartment = (id: string) => {
  return API.delete(`departments/${id}`);
};

// required documents
API.requiredDocuments = () => {
  return API.get("/documents/requests");
};

API.createRequiredDocument = (data: any) => {
  return API.post("/documents/requests", data);
};

API.updateRequiredDocument = (id: string, data: any) => {
  return API.patch(`/documents/requests/${id}`, data);
};

API.deleteRequiredDocument = (id: string) => {
  return API.delete(`/documents/requests/${id}`);
};

// document history
API.documentHistory = () => {
  return API.get(`/documents/history`);
};

API.expiredHistory = () => {
  return API.get(`/documents/expired`);
};
API.departmentExpiredHistory = () => {
  return API.get(`/documents/expired?department=true`);
};

API.submissionDocuments = () => {
  return API.get("/documents/submissions");
};

API.documentRequests = () => {
  return API.get("/documents/requests");
};

API.uploadDocument = (data: any) => {
  return API.post("/documents/submissions", data);
};
API.updateUploadDocument = (id: string, data: any) => {
  return API.patch(`/documents/submissions/${id}`, data);
};

API.downloadDocuments = (id: string, query?: any) => {
  return API.get(`/documents/submissions/${id}/docs${query}`);
};

API.documentApprove = (id: string) => {
  return API.patch(`documents/submissions/${id}/approve`);
};
API.documentReject = (id: string) => {
  return API.patch(`documents/submissions/${id}/reject`);
};

API.notifications = () => {
  return API.get("/notifications");
};

API.readNotifications = () => {
  return API.post("notifications/mark-all-as-seen");
};

API.interceptors.request.use(
  (config: any) => {
    // Do something before request is sent
    const token =
      window.localStorage.getItem("token") ||
      window.sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error: AxiosError) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  (response: any) => {
    // Do something with successful response
    return response;
  },
  (error: any) => {
    const { data } = error.response;
    if (data.error === "Authorization Token not provided.") {
      window.location.href = "/login";
    }
    // Do something with response error
    return Promise.reject(error);
  },
);

export default API;
