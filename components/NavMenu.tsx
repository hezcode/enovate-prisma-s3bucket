import Link from "next/link";
import React from "react";
import CustomButton from "./CustomButton";
import ArrowRight from "@/public/icons/ArrowRight";
import CloseIcon from "@/public/icons/CloseIcon";
import { AnimatePresence, motion } from "motion/react";
import { redirect } from "next/navigation";

interface NavMenuProps {
  closeMenu: () => void;
}

const NavMenu = ({ closeMenu }: NavMenuProps) => {
  const handleWorkTogetherClick = () => {
    closeMenu();
    redirect("/contact-us");
  };
  return (
    <motion.div
      className=" responsive-nav-menu absolute md:right-[16px] md:mt-1 md:min-w-[27rem] min-h-[40rem] flex flex-col justify-between md:p-6 p-3 bg-[#FFFFFFB3] border border-enovate-light-blue rounded-2xl backdrop-blur-[20px] -z-10 max-sm:mb-1 max-sm:max-w-[100%] max-md:min-w-full max-sm:left-0"
      key="nav_menu"
      initial={{ opacity: 0, y: "var(--hidden-y)" }}
      animate={{
        opacity: 1,
        y: "var(--visible-y)",
        transition: { duration: 0.5 },
      }}
      exit={{ opacity: 0, y: "var(--hidden-y)", transition: { duration: 0.5 } }}
    >
      <div className=" flex items-center justify-between ">
        <p className=" text-title-gray font-medium font-body-inter text-xl  ">
          Explore
        </p>
        <div
          onClick={closeMenu}
          className=" flex items-center gap-x-[1rem] hover:cursor-pointer "
        >
          <p className=" text-subtitle-gray font-body-inter font-medium ">
            Close
          </p>
          <CloseIcon />
        </div>
      </div>
      <ul
        className={` font-body-inter font-medium text-title-gray gap-y-4 flex flex-col text-3xl  `}
      >
        <li onClick={closeMenu} className={` w-fit`}>
          <Link href="/">Home</Link>
        </li>
        <li onClick={closeMenu} className={` w-fit`}>
          <Link href="/about-us">About</Link>
        </li>
        <li onClick={closeMenu} className={` w-fit`}>
          <Link href="/contact-us">Contact</Link>
        </li>
        <li onClick={closeMenu} className={` w-fit`}>
          <Link href="/blog">Blog</Link>
        </li>
      </ul>
      <div className=" flex justify-between items-end ">
        <CustomButton
          variant="solid"
          text="Let&rsquo;s work together"
          Icon={<ArrowRight />}
          onClickFn={handleWorkTogetherClick}
        />
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
    </motion.div>
  );
};

export default NavMenu;
