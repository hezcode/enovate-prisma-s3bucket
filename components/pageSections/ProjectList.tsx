"use client";

import { fetchProjects } from "@/lib/tanstackQuery/queries/projectsQuery";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Folder from "../Folder";
import ClipLoader from "react-spinners/ClipLoader";

const ProjectList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
  console.log(data);
  // if (isLoading)
  //   return (
  //     <div className=" flex items-center flex-col my-8 gap-y-4 ">
  //       <ClipLoader color="#7683ee" size={70} />
  //       <h2 className=" font-body-inter text-[1.2rem] text-center font-medium italic ">
  //         {" "}
  //         Fetching all projects...{" "}
  //       </h2>
  //     </div>
  //   );
  if (error)
    return (
      <div className=" flex items-center flex-col my-8 ">
        <p className=" font-body-inter text-[1.2rem] text-center font-medium ">
          {" "}
          Encountered error while fetching projects.{" "}
        </p>
      </div>
    );
  return (
    <section className=" mx-auto lg:grid w-fit gap-x-24 lg:gap-y-28 lg:grid-cols-[1fr_1fr] lg:mt-21 mt-[180px] lg:place-content-center flex flex-col max-sm:w-full gap-y-[230px] ">
      {/* {data && data.map((project) => {
        return (
          <Folder
            key={project.id}
            id={project.id}
            title={project.title}
            imageUrl={project.imageUrl}
            link={project.link}
            detail={project.detail}
            tag={project.tag}
          />
        );
      })} */}
    </section>
  );
};

export default ProjectList;
