"use client";

import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import {
  foundOptions,
  serviceCharges,
  workOptions,
} from "@/data/contactFormData";
import ArrowRight from "@/public/icons/ArrowRight";
import MailIcon from "@/public/icons/MailIcon";
import TurnstileWidget from "@/components/TurnstileWidget";
import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import toast from "react-hot-toast";

const ContactUs = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<"naira" | "dollar">(
    "naira"
  );
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [turnstileWidgetKey, setTurnstileWidgetKey] = useState<number>(0);
  const handleTurnstileToken = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const serviceChargeData = serviceCharges.map((data) => {
    return data;
  });
  const currentCharge = serviceChargeData.find(
    (data) => data.currency === selectedCurrency
  );

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const [formValue, setFormValue] = useState({
    name: "",
    // companyName: "",
    gotToKnowEnovate: "",
    service: "",
    budget: "",
    email: "",
    moreDetails: "",
    website: "", // honeypot
  });

  const handleShootEmail = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (turnstileSiteKey && !turnstileToken) {
        toast.error("Please complete the verification and try again.", {
          duration: 9000,
          position: "top-right",
        });
        return;
      }

      const res = await fetch("/api/web3forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formValue,
          turnstileToken,
        }),
      });

      const result = (await res.json().catch(() => null)) as
        | { success?: boolean; message?: string }
        | null;

      if (res.ok && result?.success) {
        toast.success("Your message was successfully sent!", {
          duration: 9000,
          position: "top-right",
        });
        setFormValue({
          name: "",
          gotToKnowEnovate: "",
          service: "",
          budget: "",
          email: "",
          moreDetails: "",
          website: "",
        });
        setTurnstileToken("");
        setTurnstileWidgetKey((k) => k + 1);
        return;
      }

      toast.error(result?.message ?? "Unable to send your message. Try again.", {
        duration: 9000,
        position: "top-right",
      });
      setTurnstileToken("");
      setTurnstileWidgetKey((k) => k + 1);
    } catch {
      toast.error("Network error. Please try again.", {
        duration: 9000,
        position: "top-right",
      });
    }
  };

  return (
    <main>
      <section className="pt-41 max-md:pt-20 max-w-[1200px] mx-auto px-2 max-sm:pt-12 ">
        <h2 className=" font-sans text-title-gray text-[5rem] font-[700] w-[80%] text-center mx-auto leading-[5rem] max-md:text-[3.2rem] max-md:leading-none max-sm:w-full  ">
          Let&rsquo;s make it work{" "}
          <span className="bg-linear-to-tr from-enovate-blue  to-enovate-green bg-clip-text text-transparent">
            together
          </span>
        </h2>
        <form
          className=" font-body-inter mt-[5rem] gap-y-2 flex flex-col max-sm:mt-[3rem]"
          onSubmit={handleShootEmail}
        >
          {/* Honeypot field (hidden from humans) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              name="website"
              value={formValue.website}
              onChange={handleTextChange}
              autoComplete="off"
              tabIndex={-1}
            />
          </div>
          <div className=" flex gap-x-4 py-4 max-sm:flex-col max-sm:gap-y-4  ">
            <div className=" flex items-baseline gap-x-4 max-sm:flex-col  ">
              <p className={` text-2xl font-medium `}>Hi, My name is </p>
              <CustomInput
                type="text"
                placeHolder="Type your name"
                name="name"
                value={formValue.name}
                onChangeHandler={handleTextChange}
                required={true}
              />
            </div>
          </div>
          <div className=" flex items-center gap-x-4 py-4 max-md:flex-col max-md:items-start ">
            <p className=" text-2xl font-medium ">
              I found Enovate Agency using
            </p>
            <div className=" flex gap-x-2 flex-wrap gap-y-2 max-sm:gap-x-1 max-md:mt-2 ">
              {foundOptions.map((option) => {
                return (
                  <div key={option.id}>
                    <CustomInput
                      type="radio"
                      name="gotToKnowEnovate"
                      value={option.name}
                      onChangeHandler={handleTextChange}
                      required={false}
                      label={option.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" flex items-start gap-4 flex-nowrap  py-4 max-md:flex-col max-md:items-start">
            <p className={` text-2xl font-medium `}>
              I’m looking for help with
            </p>
            <div className=" flex flex-wrap  gap-2 w-[70%] max-md:w-full max-sm:w-full max-sm:gap-x-1 ">
              {workOptions.map((option) => {
                return (
                  <div key={option.id}>
                    <CustomInput
                      type="radio"
                      name="service"
                      value={option.name}
                      onChangeHandler={handleTextChange}
                      required={true}
                      label={option.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" flex items-center gap-x-4 py-4 max-md:flex-col max-md:items-start max-md:gap-y-2 ">
            <p className={` text-2xl font-medium `}>My budget is around</p>
            <div className="flex items-center p-2 gap-x-1 border rounded-2xl ">
              {serviceChargeData.map((data) => {
                return (
                  <div
                    key={data.currency}
                    className={` flex items-center gap-x-0.5 `}
                  >
                    <div
                      className={` border w-4 h-4 rounded-full hover:cursor-pointer ${
                        data.currency === selectedCurrency
                          ? "bg-title-gray"
                          : "bg-transparent"
                      } `}
                      onClick={() => setSelectedCurrency(data.currency)}
                    ></div>
                    <p className={``}>
                      {" "}
                      {data.currency === "naira"
                        ? "₦"
                        : data.currency === "dollar"
                        ? "$"
                        : null}{" "}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-2 flex-wrap max-sm:gap-x-1 max-sm:mt-2 ">
              {currentCharge?.charges.map((data) => {
                return (
                  <div className={``} key={data.id}>
                    <CustomInput
                      type="radio"
                      name="budget"
                      onChangeHandler={handleTextChange}
                      value={data.amount}
                      // id={data.id}
                      required={false}
                      label={data.amount}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" flex gap-x-4 py-4 max-sm:flex-col max-sm:gap-y-2 ">
            <p className={` text-2xl font-medium `}>Kindly contact me at</p>
            <CustomInput
              name="email"
              value={formValue.email}
              onChangeHandler={handleTextChange}
              required={true}
              type="text"
              placeHolder="Type your email"
            />
            <p className={` text-2xl font-medium `}>
              to start the conversation.
            </p>
          </div>
          <div className=" flex flex-col gap-y-4 py-4 ">
            <p className=" text-title-gray text-2xl font-medium ">
              I will like to share more details about the project{" "}
              <span className=" text-subtitle-gray ">(optional):</span>{" "}
            </p>
            <textarea
              name="moreDetails"
              id="moreDetails"
              value={formValue.moreDetails}
              onChange={handleTextChange}
              className=" resize-none border outline-none p-6 rounded-2xl w-[50%] max-sm:w-full  "
              rows={4}
            ></textarea>
          </div>
          {turnstileSiteKey ? (
            <div className="py-4">
              <TurnstileWidget
                key={turnstileWidgetKey}
                siteKey={turnstileSiteKey}
                onToken={handleTurnstileToken}
              />
            </div>
          ) : null}
          <div>
            <CustomButton
              text="Let&rsquo;s collaborate"
              variant="solid"
              Icon={<ArrowRight />}
            />
          </div>
        </form>
      </section>
      <section className="max-w-[1200px] mx-auto rounded-2xl my-28 bg-enovate-dark-purple py-16 relative max-sm:mx-2  ">
        <div className="bg-[url('/images/pattern_bg.png')] bg-cover  opacity-10 z-0 absolute inset-0 bg-center "></div>
        <div className=" z-20 relative flex flex-col gap-y-6 items-center ">
          <h4
            className={` font-sans text-5xl text-white font-semibold max-sm:text-4xl max-sm:text-center `}
          >
            Do you have more questions?
          </h4>
          <CustomButton
            text="Shoot us an email"
            variant="outline"
            Icon={<MailIcon color="#5a5a5a" />}
          />
        </div>
      </section>
    </main>
  );
};

export default ContactUs;
