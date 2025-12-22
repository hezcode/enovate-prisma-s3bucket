"use client";
import React from "react";

import prisma from "@/lib/prisma";
import MemberCard from "@/components/TeamCard";
import Image from "next/image";
import { howWeWork } from "@/data/howWeWork";
import CustomButton from "@/components/CustomButton";
import Suitcase from "@/public/icons/Suitcase";

import { fetchTeam } from "@/lib/tanstackQuery/queries/teamMembersQuery";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";

const AboutUs = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["team-members"],
    queryFn: fetchTeam,
  });

  if (isLoading)
    return (
      <div className=" flex items-center flex-col my-8 gap-y-4 ">
        <ClipLoader color="#7683ee" size={70} />
        <h2 className=" font-body-inter text-[1.2rem] text-center font-medium italic ">
          {" "}
          Fetching team members details...{" "}
        </h2>
      </div>
    );
  if (error)
    return (
      <div className=" flex items-center flex-col my-8 ">
        <p className=" font-body-inter text-[1.2rem] text-center font-medium ">
          {" "}
          Encountered error while fetching team members.{" "}
        </p>
      </div>
    );
  return (
    <main className=" ">
      <section className=" bg-[url('/images/pathhero_path.png')] bg-center bg-contain bg-no-repeat  mx-auto relative px-2 max-sm:bg-cover ">
        <div className="pt-41 max-md:pt-20 max-w-[1200px] mx-auto max-sm:pt-12 ">
          <h2 className=" font-sans font-semibold text-7xl text-center text-title-gray z-20 max-sm:text-6xl  ">
            About us
          </h2>
          <p className=" font-body-inter text-subtitle-gray mt-4 text-[1rem] font-light text-center w-[70%] mx-auto max-sm:w-full max-sm:text-left px-2  ">
            Our team blends creativity with technical expertise to build digital
            products that are not only visually appealing but also scalable and
            performance-driven. At Enovate, we believe in innovation,
            collaboration, and delivering solutions that empower brands to grow
            and make an impact online.
          </p>
          <div className="mt-24">
            <h2 className="font-sans font-semibold text-5xl text-center text-title-gray max-sm:text-4xl ">
              We are builders & innovators
            </h2>
            <div className=" pt-8 flex gap-x-6 items-center justify-center max-sm:flex-col max-sm:gap-y-4 ">
              {/* {isLoading && <p> Team Members details loading... </p>}
              {error && <p>Error Loading Team Members</p>} */}
              {data?.map((member) => {
                return (
                  <MemberCard
                    key={member.id}
                    id={member.id}
                    name={member.name}
                    position={member.position}
                    imgUrl={member.imageUrl}
                    bio={member.bio}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* SECTION FOR SWIGGLY IMAGE */}
      <section className="w-full max-sm:h-[10rem] h-[20rem] relative">
        <Image
          src={`${
            process.env.AWS_S3_BUCKET_BASE_URL ||
            process.env.NEXT_PUBLIC_AWS_S3_BUCKET_BASE_URL
          }swiggly.png`}
          alt="enovate-path"
          fill
          className=" object-contain "
        />
      </section>
      <section className="max-w-[1200px] mx-auto mb-28 ">
        <h2 className=" font-sans text-title-gray text-5xl font-[600] text-center max-sm:text-4xl ">
          How we work
        </h2>
        <div className=" grid grid-cols-[1fr_1fr] max-md:flex max-md:flex-col max-md:items-center ">
          {howWeWork.map((data) => {
            return (
              <div
                className=" flex flex-col items-center py-6 px-16 gap-y-2 max-sm:px-8 "
                key={data.id}
              >
                <Image src={data.imgUrl} alt={data.title} />

                <h3
                  className={` font-body-inter font-medium text-2xl text-title-gray `}
                >
                  {data.title}
                </h3>
                <p
                  className={` text-center text-subtitle-gray font-body-inter font-[400] text-[1rem] max-sm:w-full max-md:w-[70%]  `}
                >
                  {data.detail}
                </p>
              </div>
            );
          })}
        </div>
      </section>
      <section className=" px-4 ">
        <div className="max-w-[1200px] mx-auto rounded-2xl my-28 bg-enovate-dark-green py-16 relative ">
          <div className="bg-[url('/images/pattern_bg.png')] bg-cover  opacity-10 z-0 absolute inset-0 bg-center "></div>
          <div className=" z-20 relative flex flex-col gap-y-6 items-center ">
            <h4
              className={` font-sans text-5xl text-white text-center font-semibold max-sm:text-4xl max-sm:text-center `}
            >
              Let&rsquo;s help build & launch your product
            </h4>
            <CustomButton
              text="Work with us"
              variant="solid"
              Icon={<Suitcase color="#fff" />}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
