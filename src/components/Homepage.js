"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdSearch } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  titleVariants,
  buttonHover,
  yearVariants,
  desVariants,
} from "@/utils/animation";
import { fetchDataFromApi } from "@/utils/api";
import { MyContext } from "@/context/ThemeContext";

export default function Homepage({ homepageImg, mobilepageImg }) {
  const [showSearch, setShowSearch] = useState(false);

  const [searchFields, setSearchFields] = useState("");

  const router = useRouter();

  const context = useContext(MyContext);

  const onChangeValue = (e) => {
    setSearchFields(e.target.value);
  };

  const searchProducts = (event) => {
    event.preventDefault();
    fetchDataFromApi(`/api/search/filter?q=${searchFields}`).then((res) => {
      context.setSearchData(res);
      router.push("/search");
    });
  };

  const navigateToProducts = () => {
    router.push("/ourproducts");
  };

  const navigateToFeaturedProducts = () => {
    router.push("/featuredproducts");
  };

  const imageBaseUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/uploads/`;

  const getImageUrl = (image) =>
    image ? `${imageBaseUrl}${image}` : "/placeholder.jpg";

  return (
    <div className="flex font-raleway">
      <div
        className="hidden sm:block flex-grow flex-col md:flex-row bg-cover md:bg-center h-[807px] md:h-[1024px] relative"
        style={{
          backgroundImage:
            homepageImg?.length > 0 && homepageImg[0].images.length > 0
              ? `url(${getImageUrl(homepageImg[0].images[0])})`
              : "none",
        }}
      >
        <div className="absolute bottom-5 right-10 flex gap-5">
          <a target="_blank" rel="noopener noreferrer">
            <Image
              src="/instagram.png"
              width={33}
              height={33}
              alt="Logo"
              className=""
            />
          </a>
          <a
            href="https://wa.me/918003888970"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/whatsapp.png"
              width={33}
              height={33}
              alt="Logo"
              className=""
            />
          </a>
        </div>

        {/* Main Container */}

        <div className="flex-1 px-0">
          {/* Navbar for Desktop */}
          <div className="flex items-center justify-between mt-[32px] px-4">
            <div className="flex items-center justify-center w-[100px] md:w-[110px] lg:w-[180px] xl:w-[219px] h-[85px] md:h-[135px] lg:h-[212px] lg:ml-3 self-start">
              <Image
                src="/logo.png"
                width={211}
                height={196}
                alt="Logo"
                className="hidden lg:block"
                // className="hidden lg:block brightness-75"
              />
              <Image
                src="/logo.png"
                width={122}
                height={121}
                alt="Logo"
                className="hidden md:block lg:hidden"
              />
              <Image
                src="/logo.png"
                width={82}
                height={81}
                alt="Logo"
                className="block md:hidden"
              />
            </div>

            <nav className="flex flex-col items-center justify-center rounded-md h-auto w-[500px] md:w-[630px] lg:w-[850px] xl:w-[1115px] text-gray-600 lg:mb-10">
              <ul className="flex items-center justify-center space-x-7 xl:space-x-16 py-3 lg:py-6 h-full md:h-auto text-[11px] md:text-[15px] lg:text-[20px] xl:text-[23px] uppercase text-black font-normal">
                <li>
                  <Link href="#" className="font-semibold">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#featured-products"
                    className="hover:font-semibold"
                  >
                    Featured Products
                  </Link>
                </li>
                <li>
                  <Link href="#our-products" className="hover:font-semibold">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="#about-us" className="hover:font-semibold">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#contact-us" className="hover:font-semibold">
                    Contact Us
                  </Link>
                </li>
                <li
                  className="nav-item rounded-full cursor-pointer lg:ml-4 hidden sm:block"
                  onClick={() => setShowSearch(!showSearch)}
                >
                  {showSearch ? (
                    <MdClose className="text-md md:text-lg lg:text-2xl" />
                  ) : (
                    <IoMdSearch className="text-md md:text-lg lg:text-2xl" />
                  )}
                </li>
              </ul>

              {showSearch && (
                <form
                  className="flex mt-2 pt-1 pb-3 mb-2 md:px-5 lg:px-9 lg:mt-0 w-full"
                  role="search"
                  onSubmit={searchProducts}
                >
                  <input
                    className="form-input w-full px-3 py-1 lg:py-2 border border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d8af88] bg-transparent text-black text-[13px] lg:text-[18px]"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={onChangeValue}
                  />
                  <button
                    className="ml-2 btn bg-[#948473] text-white px-2 lg:px-4 py-1 lg:py-2 rounded-md text-[13px] lg:text-[18px] hover:bg-[#493d32]"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
              )}
            </nav>
          </div>

          <div className="mt-6 flex justify-end items-center font-normal">
            {/* Desktop Content */}
            <div className="flex flex-col pr-14">
              {/* Animate Each Letter in Text */}
              <motion.div
                className="text-black text-[20px] md:text-[24px] lg:text-[34px] font-light tracking-widest sm:items-center lg:flex-row lg:items-start"
                initial="offscreen"
                whileInView="onscreen"
                variants={desVariants}
              >
                <p>Defining Perfection Since</p>
                {/* <p>2005...</p> */}
              </motion.div>
              <motion.div
                className="text-black text-[20px] md:text-[24px] lg:text-[34px] font-light tracking-widest sm:items-center lg:flex-row lg:items-start"
                initial="offscreen"
                whileInView="onscreen"
                variants={yearVariants}
              >
                <p>2005...</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="relative h-[852px] w-full bg-cover filter flex flex-col items-center sm:hidden"
        style={{
          backgroundImage:
            mobilepageImg?.length > 0 && mobilepageImg[0].images.length > 0
              ? `url(${getImageUrl(mobilepageImg[0].images[0])})`
              : "none",
        }}
      >
        {/* Navbar for Mobile */}
        <div className="sm:hidden bg-transparent mt-14 flex items-center justify-between px-4">
          <img
            className="h-[66px] w-[70px] ml-2 mt-3"
            src="/logo.png"
            alt="Logo"
          />
          <div className="flex flex-col w-auto xxs:ml-6 ml-0 xs:w-auto sm:w-96">
            <div className=" flex flex-col items-end justify-end relative w-full">
              {/* Tagline */}
              <div className="flex flex-col items-start">
                <motion.p
                  className="text-[#6C503B] font-platypi text-[36px] tracking-[10px] font-[800]"
                  initial="offscreen"
                  whileInView="onscreen"
                  variants={titleVariants}
                >
                  ANGIRA
                </motion.p>
                <motion.p
                  className="leading-none"
                  initial="offscreen"
                  whileInView="onscreen"
                  variants={yearVariants}
                >
                  <span className="text-[21px] font-medium text-[#6C503B] font-platypi tracking-[5px]">
                    ART EXPORTS
                  </span>
                </motion.p>
              </div>
            </div>
          </div>
        </div>

        {/* <form
          className="flex w-[294px] px-1 mt-2 text-[4px] border border-[#786351] bg-white rounded"
          role="search"
          onSubmit={searchProducts}
        >
          <input
            type="search"
            name="search"
            aria-label="Search"
            className="focus:outline-none form-input w-full p-0.5 bg-[#FFFFFFB2]"
            onChange={onChangeValue}
          />
          <button className="text-[10px] text-[#786351]" type="submit">
            <IoMdSearch />
          </button>
        </form> */}
        <form
          className="flex w-[294px] px-1 mt-4 text-[4px] shadow-[0_0_0_0.4px_#786351] bg-[#FFFFFFB2] rounded-sm"
          role="search"
          onSubmit={searchProducts}
        >
          <input
            type="search"
            name="search"
            aria-label="Search"
            className="focus:outline-none form-input w-full p-0.5 bg-transparent"
            onChange={onChangeValue}
          />
          <button className="text-[10px] text-[#786351]" type="submit">
            <IoMdSearch />
          </button>
        </form>

        {/* <div className="relative z-10 flex flex-col items-center justify-between mt-24 h-[380px] w-[290px]">
          <div className="absolute top-[18px] left-[15px] w-[305px] h-[431px] border-4 border-white -z-10">
            <div className="absolute -bottom-12 -right-1 flex gap-3">
              <a target="_blank" rel="noopener noreferrer">
                <Image
                  src="/instagram.png"
                  width={20}
                  height={20}
                  alt="Logo"
                  className=""
                />
              </a>
              <a
                href="https://wa.me/918003888970"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/whatsapp.png"
                  width={20}
                  height={20}
                  alt="Logo"
                  className=""
                />
              </a>
            </div>
          </div>

          <motion.button
            onClick={navigateToFeaturedProducts}
            className="w-full h-[50px] bg-[rgba(255,255,255,0.65)] text-[#6C503B] font-light text-[25px]"
            whileHover="hover"
            variants={buttonHover}
          >
            FEATURED PRODUCTS
          </motion.button>
          <motion.button
            onClick={navigateToProducts}
            className="w-full h-[50px] bg-[rgba(255,255,255,0.65)] text-[#6C503B] font-light text-[25px]"
            whileHover="hover"
            variants={buttonHover}
          >
            PRODUCTS
          </motion.button>
          <a
            href="#about-us"
            className="w-full flex items-center justify-center h-[50px] bg-[rgba(255,255,255,0.65)] text-[#6C503B] font-light text-[25px]"
          >
            ABOUT US
          </a>
          <a
            href="#contact-us"
            className="w-full flex items-center justify-center h-[50px] bg-[rgba(255,255,255,0.65)] text-[#6C503B] font-light text-[25px]"
          >
            CONTACT US
          </a>
        </div> */}

        <div className="relative z-10 flex flex-col items-center justify-between mt-24 h-[380px] w-[290px]">
          {/* ---- Borders ---- */}
          {/* Top border */}
          {/* <div className="absolute top-[18px] -right-[30px] w-[30px] h-0 border-t-4 border-white"></div> */}

          {/* Left border */}
          {/* <div className="absolute top-[18px] -right-[30px] h-[420px] w-0 border-l-4 border-white"></div> */}

          {/* Right border (split into top, middle gaps, and bottom) */}
          {/* <div className="absolute top-[50px] left-[15px] h-[60px] w-0 border-r-4 border-white"></div>
          <div className="absolute top-[160px] left-[15px] h-[60px] w-0 border-r-4 border-white"></div>
          <div className="absolute top-[270px] left-[15px] h-[60px] w-0 border-r-4 border-white"></div>
          <div className="absolute -bottom-[60px] left-[15px] h-[60px] w-0 border-r-4 border-white"></div> */}

          {/* Bottom border */}
          {/* <div className="absolute -bottom-[60px] left-[15px] w-[305px] h-0 border-b-4 border-white"></div> */}

          <div className="absolute -bottom-[100px] -right-[30px] flex gap-3">
              <a target="_blank" rel="noopener noreferrer">
                <Image
                  src="/instagram.png"
                  width={20}
                  height={20}
                  alt="Logo"
                  className=""
                />
              </a>
              <a
                href="https://wa.me/918003888970"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/whatsapp.png"
                  width={20}
                  height={20}
                  alt="Logo"
                  className=""
                />
              </a>
            </div>

          {/* ---- Buttons ---- */}
          <motion.button
            onClick={navigateToFeaturedProducts}
            className="w-full h-[50px] bg-[rgba(255,255,255,0.65)] text-[#6C503B] font-light text-[25px]"
            whileHover="hover"
            variants={buttonHover}
          >
            FEATURED PRODUCTS
          </motion.button>

          <motion.button
            onClick={navigateToProducts}
            className="w-full h-[50px] bg-[rgba(255,255,255,0.65)] text-[#6C503B] font-light text-[25px]"
            whileHover="hover"
            variants={buttonHover}
          >
            PRODUCTS
          </motion.button>

          <a
            href="#about-us"
            className="w-full flex items-center justify-center h-[50px] bg-[rgba(255,255,255,0.65)] text-[#6C503B] font-light text-[25px]"
          >
            ABOUT US
          </a>

          <a
            href="#contact-us"
            className="w-full flex items-center justify-center h-[50px] bg-[rgba(255,255,255,0.65)] text-[#6C503B] font-light text-[25px]"
          >
            CONTACT US
          </a>
        </div>

        {/* <div className="absolute bottom-5 right-5 flex gap-3">
          <a target="_blank" rel="noopener noreferrer">
            <Image
              src="/instagram.png"
              width={20}
              height={20}
              alt="Logo"
              className=""
            />
          </a>
          <a
            href="https://wa.me/918003888970"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/whatsapp.png"
              width={20}
              height={20}
              alt="Logo"
              className=""
            />
          </a>
        </div> */}
      </div>
    </div>
  );
}
