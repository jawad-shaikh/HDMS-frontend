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
    const { data } = await API.notifications()
    setNotifications(data.data)
  }

  const readNotifications = async () => {
    await API.readNotifications();
    fetchNotifications();
    setShowNotification(false);
  };


  useEffect(() => {

    setUser(JSON.parse(window?.localStorage.getItem('user') || ''))

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
    }
    else {
      setPage("Expired Documents");
    }
  }, [path]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (notificationBoxRef.current && !notificationBoxRef.current.contains(event.target)) {
        setShowNotification(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchNotifications()
  }, [])

  return (
    <header className="flex items-center justify-between py-4 px-8 border-b border-gray">
      <p className="text-sm text-[#9E9E9E]">
        Dashboard / <span className="text-black font-semibold">{page}</span>
      </p>
      <div className="flex items-center gap-4">
        <div className="relative">
          {showNotification && (
            <div ref={notificationBoxRef} className="absolute bg-white border border-gray right-0 top-16 p-4 w-[480px] h-[600px] overflow-scroll">
              <div className="flex items-center justify-between text-sm mb-4">
                <p className="flex items-center justify-center font-semibold">
                  Notifications{" "}
                  {notifications.length && !notifications[0]?.hasSeen ? (
                    <div className="ml-2 h-2 w-2 bg-red rounded-full" />
                  ) : null}
                </p>

                <button
                  onClick={readNotifications}
                  className="text-xs font-semibold text-primary"
                >
                  Mark all as read
                </button>
              </div>

              <ul>
                {notifications?.map((notification: any, index: number) => (
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
                    <p className="text-xs">{convertDate(notification.createdAt)}</p>
                  </li>
                ))}
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
            <p className="text-sm font-semibold">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-[#9E9E9E]">{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
