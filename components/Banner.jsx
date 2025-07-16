import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Banner = () => {
  return (
    <div className=" w-full flex items-center justify-center mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between py-14 md:py-0 bg-[#E6E9F2] my-16 rounded-xl overflow-hidden">
        <Image
          className=" w-[200px] md:w-[250px] lg:w-[300px] rounded-lg"
          src={assets.page1}
          alt="jbl_soundbox_image"
        />
        <div className="flex flex-col items-center justify-center text-center space-y-2 px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold max-w-[290px]">
            Elevate Your Look with Timeless Culture
          </h2>
          <p className="max-w-[343px] font-medium text-gray-800/60">
            Discover the beauty of tradition — bold, elegant, and uniquely Ethiopian.
          </p>
          <button className="group flex items-center justify-center gap-1 px-12 py-2.5 bg-orange-600 rounded text-white">
            Buy now
            <Image className="group-hover:translate-x-1 transition" src={assets.arrow_icon_white} alt="arrow_icon_white" />
          </button>
        </div>
        <Image
          className="hidden md:block  w-[200px] md:w-[250px] lg:w-[300px] rounded-lg"
          src={assets.page2}
          alt="md_controller_image"
        />
        <Image
          className="md:hidden w-[200px] md:w-[250px] lg:w-[300px]"
          src={assets.page2}
          alt="sm_controller_image"
        />
      </div>
    </div>
  );
};

export default Banner;