"use client";

import Link from "next/link";
import React from "react";

import enovateLogo from "../public/icons/enovate_logo.svg";
import Image from "next/image";
import CustomButton from "./CustomButton";
import HandShake from "@/public/icons/HandShake";
import mail from "../public/icons/mail.svg";
import { redirect } from "next/navigation";

const Footer = () => {
  const handleRedirectToContactPage = () => {
    redirect("/contact-us");
  };
  return (
    <section className=" bg-light-background mt-28 px-2  ">
      <div className="max-w-[1200px] mx-auto py-12 grid grid-cols-[2fr_1fr_1fr_1fr] gap-x-12 max-md:gap-x-4 max-sm:flex max-sm:flex-col max-sm:gap-y-10 max-sm:items-start ">
        <div className=" ">
          <Link href="/" className={` bg-amber-50 `}>
            <Image className={``} src={enovateLogo} alt="enovate_logo" />
          </Link>
          <p
            className={`font-body-inter font-light text-title-gray mt-2 w-[80%] mb-12 max-sm:mb-6 max-sm:w-[70%] max-sm:text-sm `}
          >
            A modern agency focused on giving our clients the best experience.
          </p>
          <CustomButton
            text="Let&rsquo;s work together"
            variant="solid"
            Icon={<HandShake color="#fff" />}
            onClickFn={handleRedirectToContactPage}
          />
          <p className={` mt-6 font-body-inter text-sm w-[70%]  `}>
            Don&rsquo;t like the form? Reach out to us via email:
          </p>
          <div
            className={` mt-6 flex items-center w-fit gap-x-2 border-b border-dashed border-b-light-background hover:border-b-subtitle-gray hover:cursor-pointer max-sm:mt-2 `}
          >
            {" "}
            <div className={``}>
              {" "}
              <Image src={mail} alt="mail" />{" "}
            </div>
            <p
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "mailto:hq@enovate.work";
              }}
              className={``}
            >
              hq@enovate.work
            </p>
          </div>
        </div>
        <div className=" ">
          <p
            className={` text-title-gray font-sans text-xl font-medium mb-4 max-sm:mb-2 `}
          >
            {" "}
            We&rsquo;re Remote!{" "}
          </p>
          <p
            className={`font-body-inter font-normal text-title-gray  max-sm:w-[60%] max-md:w-full `}
          >
            Flexibility is important for great work. We let our team members
            integrate work into their personal lives.
          </p>
        </div>
        <div className=" flex flex-col items-center text-center  ">
          <p
            className={`text-title-gray font-sans text-xl font-medium mb-4 max-sm:mb-2`}
          >
            Explore{" "}
          </p>
          <ul
            className={` font-body-inter font-normal text-title-gray gap-y-2 flex flex-col max-sm:text-left `}
          >
            <li className={``}>
              <Link href="/about-us">About</Link>
            </li>
            <li className={``}>
              <Link href="/contact-us">Contact</Link>
            </li>
            <li className={``}>
              <Link href="/blog">Blog</Link>
            </li>
            {/* <li
                    className={``}
                  >
                    {" "}
                    <Link href="" onClick={(e) => e.preventDefault()}>
                      Success
                    </Link>{" "}
                  </li> */}
          </ul>
        </div>
        <div className="  flex flex-col items-end ">
          <p
            className={`text-title-gray font-sans text-xl font-medium mb-4 max-sm:mb-2`}
          >
            Follow us{" "}
          </p>
          <ul
            className={` font-body-inter font-normal text-title-gray gap-y-2 flex flex-col `}
          >
            <li className={``}>
              {" "}
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/enovatehq/"
              >
                Instagram
              </Link>{" "}
            </li>
            <li className={``}>
              {" "}
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://x.com/EnovateHQ"
              >
                Twitter
              </Link>{" "}
            </li>
            <li className={``}>
              {" "}
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/company/enovatehq/"
              >
                LinkedIn
              </Link>{" "}
            </li>
            {/* <li className={``}>
              {" "}
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.behance.net/enovatework"
              >
                Behance
              </Link>{" "}
            </li>
            <li className={``}>
              {" "}
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://dribbble.com/enovate"
              >
                Dribbble
              </Link>{" "}
            </li> */}
          </ul>
        </div>
      </div>
      <div className="text-center pb-10 flex flex-col items-center justify-center gap-y-4 max-sm:pb-30 ">
        <p className=" font-body-inter font-semibold ">
          Built with 💡, ☕, and clean code{" "}
        </p>
        <p className=" font-body-inter text-sm ">
          Enovate © {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
};

export default Footer;
