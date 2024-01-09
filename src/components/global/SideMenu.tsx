"use client";
import { site } from "@/data";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Icons } from "./icons";
import SideLink from "../ui/SideLink";
import { useRouter } from "next/navigation";

const SideMenu = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>({});

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    router.push("/login");
  };

  useEffect(() => {
    setUser(JSON.parse(window?.localStorage.getItem("user") || ""));
  }, []);

  return (
    <div className="flex h-screen w-[72px] transition-all group hover:w-[280px] flex-col justify-between border-e border-gray">
      <div>
        <div className="inline-flex items-center p-5 justify-center w-full">
          <Image
            src={"/icon.svg"}
            height={32}
            width={32}
            className="w-8 h-8 group-hover:hidden"
            alt={`${site.name} icon`}
          />
          <Image
            src={"/logo.svg"}
            height={32}
            width={180}
            quality={500}
            className="hidden group-hover:block h-8"
            alt={`${site.name} icon`}
          />
        </div>

        <ul className="space-y-3 m-3">
          {user?.role === "ADMIN" ? (
            <>
              <SideLink
                icon={<Icons.users className=" w-5" />}
                url="/users"
                name="User"
              />
              <SideLink
                icon={<Icons.department className=" w-5" />}
                url="/department"
                name="Department"
              />
              <SideLink
                icon={<Icons.required className=" w-5" />}
                url="/required-documents"
                name="Required Documents"
              />
              <SideLink
                icon={<Icons.received className=" w-5" />}
                url="/received-documents"
                name="Received Documents"
              />
              <SideLink
                icon={<Icons.history className=" w-5" />}
                url="/document-history"
                name="Document History"
              />
              <SideLink
                icon={<Icons.error className=" w-5" />}
                url="/expired-documents"
                name="Expired Documents"
              />
            </>
          ) : user?.role === "HR" ? (
            <>
              <SideLink
                icon={<Icons.required className=" w-5" />}
                url="/required-documents"
                name="Required Documents"
              />
              <SideLink
                icon={<Icons.received className=" w-5" />}
                url="/received-documents"
                name="Received Documents"
              />
              <SideLink
                icon={<Icons.history className=" w-5" />}
                url="/document-history"
                name="Document History"
              />
              <SideLink
                icon={<Icons.error className=" w-5" />}
                url="/expired-documents"
                name="Expired Documents"
              />
            </>
          ) : user?.role === "HOD" ? (
            <>
              {/* <SideLink
                icon={<Icons.required className=" w-5" />}
                url="/required-documents"
                name="Required Documents"
              /> */}
              <SideLink
                icon={<Icons.upload className=" w-5" />}
                url="/upload-documents"
                name="Upload Documents"
              />
              {/* <SideLink
                icon={<Icons.history className=" w-5" />}
                url="/document-history"
                name="Document History"
              /> */}
              <SideLink
                icon={<Icons.error className=" w-5" />}
                url="/expired-documents"
                name="Expired Documents"
              />
              <SideLink
                icon={<Icons.departmentEx className=" w-5" />}
                url="/department-expired-documents"
                name="Department Documents"
              />
            </>
          ) : (
            <>
              {/* <SideLink
                icon={<Icons.required className=" w-5" />}
                url="/required-documents"
                name="Required Documents"
              /> */}
              <SideLink
                icon={<Icons.upload className=" w-5" />}
                url="/upload-documents"
                name="Upload Documents"
              />
              {/* <SideLink
                icon={<Icons.history className=" w-5" />}
                url="/document-history"
                name="Document History"
              /> */}
              <SideLink
                icon={<Icons.error className=" w-5" />}
                url="/expired-documents"
                name="Expired Documents"
              />
            </>
          )}
        </ul>
      </div>

      <button onClick={logout} className="flex items-center">
        <span className={`flex items-center justify-center p-6`}>
          <Icons.logout className=" w-5" />
        </span>
        <span className="hidden group-hover:inline text-sm font-semibold">
          Logout
        </span>
      </button>
    </div>
  );
};

export default SideMenu;
