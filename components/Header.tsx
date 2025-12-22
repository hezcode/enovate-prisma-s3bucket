"use client";

import React, { useState } from "react";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import Image from "next/image";
import NavIcon from "@/public/icons/nav-icon";
import NavMenu from "./NavMenu";
import Link from "next/link";

const Header = () => {
  const [navHovered, setNavHovered] = useState<boolean>(false);
  const [showNavMenu, setShowNavMenu] = useState<boolean>(false);
  const handleExploreToggle = () => {
    setShowNavMenu(!showNavMenu);
  };
  const closeNavMenu = () => {
    setShowNavMenu(false);
  };
  return (
    <header className=" z-40 lg:max-w-[1200px] mx-auto fixed right-0 left-0 md:top-0 max-md:max-w-[340px] max-sm:bottom-4 md:my-4 ">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.2, duration: 0.7, ease: easeInOut },
        }}
        exit={{
          opacity: 0,
          y: -100,
          transition: { delay: 0.2, duration: 0.7, ease: easeInOut },
        }}
        className="rounded-2xl  bg-linear-90 from-enovate-light-blue via-enovate-light-purple to-enovate-light-green p-[2px]   "
      >
        {/* LHS OF HEADER --- WITH LOGO */}
        <div className=" bg-white flex items-center justify-between py-6 px-6 max-sm:py-4 rounded-2xl max-sm:justify-center ">
          <Link className=" block max-sm:hidden " href="/">
            <div className="flex flex-col gap-y-1  ">
              <div className="w-32 h-8 relative">
                <Image
                  src="/icons/LogoDescription.svg"
                  alt="enovate_logo"
                  objectFit="contain"
                  fill
                  fetchPriority="high"
                  loading="lazy"
                />
              </div>
              <p className=" font-sans text-[10px] text-text-dark-gray font-medium ">
                Creative Design and Development Agency
              </p>
            </div>
          </Link>

          {/* RHS OF HEADER --- WITH NAV ICON */}
          <AnimatePresence>
            <motion.div
              key="explore"
              initial={{ opacity: 1, y: 0 }}
              animate={{
                opacity: showNavMenu ? 0 : 1,
                y: showNavMenu ? 10 : 0,
                transition: {
                  delay: showNavMenu ? 0 : 0.3,
                  duration: 0.5,
                },
              }}
              exit={{
                opacity: 0,
                y: 10,
                // transition: {
                //   duration: 0.5,
                //   delay: 0.8,
                // },
              }}
              onMouseOver={() => setNavHovered(true)}
              onMouseLeave={() => setNavHovered(false)}
              onClick={handleExploreToggle}
              className=" flex items-center gap-x-2 hover:cursor-pointer "
            >
              <p className="font-body-inter font-medium hover:text-shadow-2xs">
                Explore
              </p>
              <div
                className={`p-1 ${
                  navHovered ? "bg-text-dark-gray" : "bg-none"
                }  rounded-xl transition-all delay-150 ease-out `}
              >
                <NavIcon color={navHovered ? "#fff" : "#5A5A5A"} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* CONDITIONAL DISPLAY OF NAV MENU */}
        <AnimatePresence>
          {showNavMenu ? <NavMenu closeMenu={closeNavMenu} /> : null}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

export default Header;
