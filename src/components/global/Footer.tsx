import { site } from "@/data";
import Image from "next/image";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary">
      <div className="container flex items-center justify-between py-8">
        <Image
          src={"/footer-logo.svg"}
          height={42}
          width={214}
          alt={`${site.name} Footer Logo`}
        />
        <p className="text-white font-semibold ">Copyright © 2023 - MCHD</p>
        <div className="flex items-center gap-4">
          <a
            href={site.social.facebook}
            target="_blank"
            className="bg-white p-4 bg-opacity-10 rounded-full"
          >
            <Image
              src={"/facebook.svg"}
              height={20}
              width={20}
              alt="Facebook Logo"
            />
          </a>
          <a
            href={site.social.twitter}
            target="_blank"
            className="bg-white p-4 bg-opacity-10 rounded-full"
          >
            <Image
              src={"/twitter.svg"}
              height={20}
              width={20}
              alt="Twitter Logo"
            />
          </a>
          <a
            href={site.social.instagram}
            target="_blank"
            className="bg-white p-4 bg-opacity-10 rounded-full"
          >
            <Image
              src={"/instagram.svg"}
              height={20}
              width={20}
              alt="Instagram Logo"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
