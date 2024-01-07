import React from "react";
import { Icons } from "./icons";

type PageTitleProps = {
  title: string;
  buttonText?: string;
  icon: React.ReactNode;
  onClick?: () => void;
};
const PageTitle: React.FC<PageTitleProps> = ({
  title,
  icon,
  onClick,
  buttonText,
}) => {
  return (
    <div className="flex justify-between my-6">
      <div className="flex items-center gap-4">
        {icon}
        <h1 className="text-3xl font-semibold">{title}</h1>
      </div>

      {onClick && (
        <button
          onClick={onClick}
          className="bg-primary p-3 text-sm font-semibold text-white flex items-center gap-3"
        >
          <Icons.add />
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default PageTitle;
