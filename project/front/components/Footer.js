import React from "react";
import bloobolt_logo_nobg from "../public/bloobolt_logo_nobg.png";
import Image from "next/image";
import Link from "next/link";
import { BoltIcon } from "@heroicons/react/20/solid";

const Footer = () => {
  return (
    <footer className="mx-auto mt-32 w-full max-w-container px-4 sm:px-6 lg:px-8">
      <div className="border-t border-slate-900/5 py-10">
        <div className="flex w-36 items-center left-0 right-0 mx-auto">
          <div className="w-7 h-7">
            <Image src={bloobolt_logo_nobg} />
          </div>
          <span className="text-[22px] font-bold ml-1.5 text-indigo-500">
            BlooBolt
          </span>
        </div>
        <p className="mt-3 text-center text-sm leading-6 text-slate-500">
          © {new Date().getFullYear()} BlooBolt. All rights reserved.
        </p>
        <p className="text-center  text-sm leading-6 text-slate-500">
          <BoltIcon className="mr-0.5 w-3.5 inline relative bottom-[1px]" />
          Powered by yjglab
        </p>
        <div className="mt-16 flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-slate-700">
          <a href="/privacy-policy">Privacy policy</a>
          <div className="h-4 w-px bg-slate-500/20"></div>
          <a href="/version">Version update</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
