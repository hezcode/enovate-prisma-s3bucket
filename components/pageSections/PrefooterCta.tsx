"use client";

import React from "react";
import CustomButton from "../CustomButton";
import HandShake from "@/public/icons/HandShake";
import { redirect } from "next/navigation";

const PrefooterCta = () => {
  const handleRedirectToContactPage = () => {
    redirect("/contact-us");
  };
  return (
    <section className=" px-4 ">
      <div className="max-w-[1200px] mx-auto rounded-2xl my-28 bg-light-background py-16  relative max-sm:mx-2">
        <div className="bg-[url('/images/pattern_bg.png')] bg-center bg-cover  opacity-10 z-0 absolute inset-0 bg-no-repeat "></div>
        <div className=" z-20 relative flex flex-col gap-y-6 items-center ">
          <h4
            className={` font-body-inter text-5xl text-title-gray font-semibold max-sm:text-4xl max-sm:text-center `}
          >
            We deliver what you need
          </h4>
          <CustomButton
            text="Let&rsquo;s work together"
            variant="outline"
            Icon={<HandShake color="#5A5A5A" />}
            onClickFn={handleRedirectToContactPage}
          />
        </div>
      </div>
    </section>
  );
};

export default PrefooterCta;
