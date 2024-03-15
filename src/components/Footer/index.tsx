"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LiaTelegram } from "react-icons/lia";
import { LiaInstagram } from "react-icons/lia";

const Footer = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ email: string }>();

  useEffect(() => {
    if (subscribed) {
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    }
  }, [subscribed]);

  const submit = (state: { email: string }) => {
    setLoading(true);
    // TODO: make subscribed logic
    reset();
    setSubscribed(true);
    setLoading(false);
  };

  return (
    <footer className="bg-base-200 text-white relative text-xs sm:text-sm">
      <div className="container py-8">
        <div className="flex justify-between leading-relaxed gap-x-16 gap-y-8 flex-col md:flex-row">
          <div>
            <div className="uppercase">about</div>
            <div className="md:mt-6 mt-2 max-w-[60ch]">
              Welcome to our cutting-edge web service dedicated to enhancing
              your online presence! Our service revolves around seamlessly
              integrating Instagram widgets into your website, allowing you to
              effortlessly display your latest posts and captivating content.
            </div>
            <ul className="flex gap-3 mt-6">
              {/* <li>
                <a
                  className="flex md:w-8 w-6 aspect-square [&>svg]:w-full [&>svg]:h-full hover:text-primary transition-colors"
                  href="#"
                  target="_blank"
                >
                  <LiaTelegram />
                </a>
              </li> */}
              <li>
                <a
                  className="flex md:w-8 w-6 aspect-square [&>svg]:w-full [&>svg]:h-full hover:text-primary transition-colors"
                  href="https://www.instagram.com/widgeterius"
                  target="_blank"
                >
                  <LiaInstagram />
                </a>
              </li>
            </ul>
          </div>

          <div className="flex-shrink-0">
            <div className="uppercase">information</div>
            <ul className="md:mt-6 mt-2">
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href={"#"}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href={"#"}
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div className="">
            <div className="uppercase">get in touch</div>
            <ul className="md:mt-6 mt-2">
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href="mailto:mail@weblab420.com"
                >
                  mail@weblab420.com
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href="tel:+971524468331"
                >
                  971 52 446 83 31
                </a>
              </li>
              {/* <li className="max-w-[38ch] mt-6">
                Dubai National Insurance Building, 906-109 Port Saeed, Dubai,
                United Arab Emirates <br />
                Alexander Khomushko It Services, L.L.C
              </li> */}
            </ul>
          </div>
        </div>

        <div className="md:mt-8 sm:gap-y-6 mt-8 grid grid-cols-[auto_1fr_auto] items-center sm:text-right">
          <div className="mt-2 sm:mt-0 col-span-3 sm:col-auto text-center sm:text-left">
            ©{new Date().getFullYear()}. All rights reserver
          </div>
          {/* <div className="flex items-center gap-4 grow lg:justify-center flex-wrap col-[1/4] row-start-1 lg:col-auto lg:row-auto">
            <div>SUBSCRIBE TO OUR NEWSLETTER</div>
            <form
              onSubmit={handleSubmit(submit)}
              className="flex items-center gap-2 relative"
            >
              <input
                {...register("email", {
                  required: true,
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                })}
                aria-invalid={errors.email ? "true" : "false"}
                className="input input-sm w-3/4 sm:w-auto"
                type="text"
              />
              <button className="btn btn-primary btn-sm" disabled={loading}>
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "SUBMIT"
                )}
              </button>
              {subscribed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -right-24 "
                >
                  Subscribed!
                </motion.div>
              )}
            </form>
          </div> */}
          <div className="col-span-3 mt-6 row-start-2 sm:col-auto sm:row-auto sm:mt-0 text-center sm:text-right">
            <a
              className="transition-colors hover:text-primary"
              href="https://weblab420.com/"
              target="_blank"
            >
              Created by WEBLAB 420
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
