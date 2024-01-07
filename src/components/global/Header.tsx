"use client";
import React, { useEffect, useRef, useState } from "react";
import { Icons } from "./icons";
import { usePathname } from "next/navigation";
import API from "@/service/api";
import { convertDate } from "@/utils/helper";

const Header: React.FC = () => {
  const path = usePathname();
  const notificationBoxRef = useRef<any>(null);
  const [user, setUser] = useState<any>({});

  const [page, setPage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState<any>([]);

  const fetchNotifications = async () => {
    const { data } = await API.notifications();
    setNotifications(data.data);
  };

  const readNotifications = async () => {
    await API.readNotifications();
    fetchNotifications();
    setShowNotification(false);
  };

  useEffect(() => {
    setUser(JSON.parse(window?.localStorage.getItem("user") || ""));

    if (path === "/users") {
      setPage("Users");
    } else if (path === "/department") {
      setPage("Departments");
    } else if (path === "/required-documents") {
      setPage("Required Documents");
    } else if (path === "/received-documents") {
      setPage("Received Documents");
    } else if (path === "/document-history") {
      setPage("Document History");
    } else if (path === "/upload-documents") {
      setPage("upload Documents");
    } else {
      setPage("Expired Documents");
    }
  }, [path]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        notificationBoxRef.current &&
        !notificationBoxRef.current.contains(event.target)
      ) {
        setShowNotification(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <header className="flex items-center justify-between py-4 px-8 border-b border-gray">
      <p className="text-sm text-[#9E9E9E]">
        Dashboard / <span className="text-black font-semibold">{page}</span>
      </p>
      <div className="flex items-center gap-4">
        <div className="relative">
          {showNotification && (
            <div
              ref={notificationBoxRef}
              className="absolute bg-white border border-gray right-0 top-16 p-4 w-[480px] h-[600px] overflow-scroll"
            >
              <div className="flex items-center justify-between text-sm pb-4 border-b border-gray">
                <p className="flex items-center justify-center font-semibold">
                  Notifications{" "}
                  {notifications.length && !notifications[0]?.hasSeen ? (
                    <div className="ml-2 h-2 w-2 bg-red rounded-full" />
                  ) : null}
                </p>

                <button
                  onClick={readNotifications}
                  className="text-xs font-semibold text-primary flex items-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M5.77734 8.22222L6.78123 9.36952C7.06349 9.6921 7.57244 9.66833 7.8234 9.32084L10.2218 6"
                      stroke="#004AAB"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 8C2 5.17157 2 3.75736 2.87868 2.87868C3.75736 2 5.17157 2 8 2C10.8284 2 12.2426 2 13.1213 2.87868C14 3.75736 14 5.17157 14 8C14 10.8284 14 12.2426 13.1213 13.1213C12.2426 14 10.8284 14 8 14C5.17157 14 3.75736 14 2.87868 13.1213C2 12.2426 2 10.8284 2 8Z"
                      stroke="#004AAB"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{" "}
                  Mark all as read
                </button>
              </div>

              <ul className="h-[64%]">
                {notifications.length ? (
                  notifications?.map((notification: any, index: number) => (
                    <li
                      key={index}
                      className="flex items-start justify-between border-t border-gray py-4"
                    >
                      <div>
                        <p className="text-sm font-semibold">
                          {!notification.hasSeen && (
                            <span className="text-primary border border-primary text-[10px] p-1 px-2 rounded-md mr-2">
                              New
                            </span>
                          )}{" "}
                          {notification.title}{" "}
                        </p>
                        <q className="text-xs mt-4 block">
                          {notification.description}
                        </q>
                      </div>
                      <p className="text-xs">
                        {convertDate(notification.createdAt)}
                      </p>
                    </li>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full mt-20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      fill="none"
                    >
                      <rect width="60" height="60" fill="white" />
                      <path
                        d="M48.8062 28.1198V21.5777C48.8062 20.4284 48.4178 19.3693 47.7688 18.508L38.6598 4H10.1458L0.711648 18.986L0.714945 18.9879C0.262498 19.7513 0 20.6339 0 21.5777V38.6864C0 41.5513 2.38623 43.8815 5.31856 43.8815H31.2287C32.2299 50.7225 38.2647 56 45.5402 56C53.5134 56 60 49.664 60 41.876C60 35.1851 55.2111 29.57 48.8062 28.1198ZM11.9892 7.22113H36.8137L42.5656 16.3827H32.7938L32.4931 17.6215C31.6047 21.2807 28.2779 23.8364 24.4025 23.8364C20.5263 23.8364 17.1989 21.2807 16.3118 17.6222L16.0117 16.3827H6.22213L11.9892 7.22113ZM31.1384 40.6603H5.31856C4.20459 40.6603 3.29772 39.7745 3.29772 38.6864V21.5777C3.29772 21.1867 3.41841 20.824 3.61958 20.5167L3.65585 20.4606C4.02058 19.944 4.62934 19.6038 5.31856 19.6038H13.4804C15.1194 24.0502 19.4394 27.0575 24.4031 27.0575C29.3649 27.0575 33.6849 24.0509 35.3252 19.6038H43.4877C44.1235 19.6038 44.6841 19.8976 45.0554 20.3472L45.3535 20.822C45.4524 21.0552 45.5085 21.3097 45.5085 21.5777V27.7526C37.9693 27.7687 31.7709 33.4495 31.1384 40.6603ZM45.5408 52.7782C39.386 52.7782 34.3787 47.8873 34.3787 41.8753C34.3787 35.8634 39.386 30.9725 45.5408 30.9725C51.6957 30.9725 56.7029 35.8634 56.7029 41.8753C56.7029 47.8873 51.6957 52.7782 45.5408 52.7782ZM45.5408 34.2181C44.63 34.2181 43.892 34.939 43.892 35.8286V42.4854C43.892 43.3751 44.63 44.096 45.5408 44.096C46.4517 44.096 47.1897 43.3751 47.1897 42.4854V35.8286C47.1897 34.939 46.451 34.2181 45.5408 34.2181ZM45.5408 45.7066C44.63 45.7066 43.892 46.4274 43.892 47.3171V47.4247C43.892 48.3144 44.63 49.0353 45.5408 49.0353C46.4517 49.0353 47.1897 48.3144 47.1897 47.4247V47.3171C47.1897 46.4274 46.451 45.7066 45.5408 45.7066Z"
                        fill="black"
                      />
                    </svg>
                    <p className="test-lg font-semibold mt-4">
                      No notification
                    </p>
                    <p className="text-sm text-[#9E9E9E] mt-2">
                      You’re up to date
                    </p>
                  </div>
                )}
              </ul>
            </div>
          )}

          <button
            className="relative"
            onClick={() => setShowNotification(!showNotification)}
          >
            {notifications.length && !notifications[0]?.hasSeen ? (
              <div className="top-0 right-0 h-2 w-2 bg-red rounded-full absolute" />
            ) : null}
            <Icons.notification />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Icons.user />
          <div>
            <p className="text-sm font-semibold">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-[#9E9E9E]">{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
