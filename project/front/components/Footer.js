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
          © 2023 yjglab. All rights reserved.
        </p>
        {/* <p className="text-center  text-sm leading-6 text-slate-500">
          <BoltIcon className="mr-0.5 w-3.5 inline relative bottom-[1px]" />
          Powered by yjglab
        </p> */}
        <div className="mt-16 flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-slate-700">
          <Link href="/service/terms">
            <span className="cursor-pointer">서비스 이용 약관</span>
          </Link>
          <div className="h-4 w-px bg-slate-500/20"></div>
          <Link href="/service/version-log">
            <span className="cursor-pointer">버전 정보</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
