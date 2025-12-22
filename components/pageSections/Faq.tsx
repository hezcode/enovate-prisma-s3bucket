"use client";

import { faq } from "@/data/faq";
import React, { useState } from "react";

import MailIcon from "@/public/icons/MailIcon";
import plus from "../../public/icons/plus.svg";
import minus from "../../public/icons/minus.svg";
import ChatIcon from "@/public/icons/ChatIcon";
import Image from "next/image";
import CustomButton from "../CustomButton";

const Faq = () => {
  const [showAnswer, setShowAnswer] = useState<Record<string, boolean>>({});
  const toggleAnswer = (id: string) => {
    setShowAnswer({
      [id]: !showAnswer[id],
    });
  };

  const handleShootEmail = () => {
    window.location.href = "mailto:hq@enovate.work";
  };

  return (
    <section className="max-w-[1200px] mx-auto my-28 px-2 ">
      <h4
        className={` text-title-gray font-sans text-5xl font-[700] leading-snug mx-auto text-center mb-12 max-sm:text-4xl  `}
      >
        Frequently asked questions
      </h4>
      <div
        className={`grid grid-cols-[2fr_1fr] gap-x-12 max-md:flex max-md:flex-col max-md:gap-y-9  `}
      >
        <div className={``}>
          {faq.map((item) => {
            return (
              <div
                key={item.id}
                className={` max-sm:w-full  max-md:w-[90%] mx-auto  border-b border-b-light-background py-6 `}
                onClick={() => toggleAnswer(item.id)}
              >
                <div className={` flex items-center justify-between pb-3.5 `}>
                  <p className={` font-body-inter font-medium  `}>
                    {item.question}
                  </p>
                  {showAnswer[item.id] ? (
                    <Image src={minus} alt="minus" />
                  ) : (
                    <Image src={plus} alt="plus" />
                  )}
                </div>
                <p
                  className={` font-body-inter font-light w-[90%] text-justify `}
                >
                  {" "}
                  {showAnswer[item.id] && item.answer}{" "}
                </p>
              </div>
            );
          })}
        </div>
        <div
          className={` bg-light-background rounded-2xl p-6 flex flex-col items-center place-self-start`}
        >
          <div className="py-[0.53rem] px-[0.42rem]  ">
            <ChatIcon />
          </div>
          <h4
            className={` text-title-gray text-2xl font-medium font-sans text-center mt-4 `}
          >
            Do you have any more questions?
          </h4>
          <p
            className={` text-center font-body-inter text-subtitle-gray mt-4 mb-10 `}
          >
            Feel free to write us now. We’d be glad to give adequate information
            in response{" "}
          </p>
          <CustomButton
            text="Shoot us an email"
            variant="solid"
            Icon={<MailIcon color="#fff" />}
            onClickFn={handleShootEmail}
          />
          {/* <motion.button
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "mailto:HQ@enovate.work";
            }}
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={{
              gap: isHovered ? "1rem" : "0.5rem",
              transition: { duration: 0.7, ease: easeInOut },
            }}
            className={``}
          >
            <p>Shoot us an email</p>
            <div className={styles["arrow-right"]}>
              {" "}
            <Image
              className={``}
              src={mail}
              alt="arrow-right"
            />{" "}
            {/* </div>
          </motion.button> */}
        </div>
      </div>
    </section>
  );
};

export default Faq;
