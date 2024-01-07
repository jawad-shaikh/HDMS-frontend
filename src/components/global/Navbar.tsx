import { site } from "@/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <header className="container flex items-center justify-between py-4">
      <Image
        src={"/logo.svg"}
        height={48}
        width={238}
        alt={`${site.name} Logo`}
      />
      <nav className="flex items-center gap-4">
        <Link href={"/register"} className="text-primary font-semibold px-2">
          Register
        </Link>
        <Link href={"login"} className="text-primary font-semibold px-2">
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
