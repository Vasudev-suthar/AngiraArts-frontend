"use client"

import React, { useContext, useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import { IoMdSearch } from "react-icons/io";
import { MdClose } from 'react-icons/md'
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { titleVariants, buttonHover, yearVariants, desVariants } from "@/utils/animation";
import { fetchDataFromApi } from '@/utils/api';
import { MyContext } from "@/context/ThemeContext";

export default function Homepage({ homepageImg, mobilepageImg }) {
  const [showSearch, setShowSearch] = useState(false);

  const [searchFields, setSearchFields] = useState("")

  const router = useRouter();


  const context = useContext(MyContext);

  const onChangeValue = (e) => {
    setSearchFields(e.target.value)
  }

  const searchProducts = (event) => {
    event.preventDefault();
    fetchDataFromApi(`/api/search/filter?q=${searchFields}`).then((res) => {
      context.setSearchData(res)
      router.push("/search")
    })
  }

  const navigateToProducts = () => {
    router.push('/ourproducts');
  };

  const navigateToFeaturedProducts = () => {
    router.push('/featuredproducts');
  };

  const imageBaseUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/uploads/`;

  const getImageUrl = (image) => (image ? `${imageBaseUrl}${image}` : "/placeholder.jpg");

  return (
    <div className="flex font-raleway">
      <div className="hidden sm:block flex-grow flex-col md:flex-row bg-cover md:bg-center h-[807px] md:h-[1024px] relative"
        style={{
          backgroundImage: homepageImg?.length > 0 && homepageImg[0].images.length > 0
            ? `url(${getImageUrl(homepageImg[0].images[0])})`
            : "none",
        }}
      >

        <div className='absolute bottom-5 right-8 flex gap-5'>
          <a target="_blank" rel="noopener noreferrer">
            <Image src="/instagram.png" width={33} height={33} alt="Logo" className="" />
          </a>
          <a href="https://wa.me/918003888970" target="_blank" rel="noopener noreferrer">
            <Image src="/whatsapp.png" width={33} height={33} alt="Logo" className="" />
          </a>
        </div>

        {/* Main Container */}

        <div className="flex-1 px-0">

          {/* Navbar for Desktop */}
          <div className="flex items-center justify-between mt-[32px] px-4">
            <div className="flex items-center justify-center w-[100px] md:w-[110px] lg:w-[180px] xl:w-[219px] h-[85px] md:h-[135px] lg:h-[212px] lg:ml-3 self-start">
              <Image src="/logo.png" width={211} height={196} alt="Logo" className="hidden lg:block" />
              <Image src="/logo.png" width={122} height={121} alt="Logo" className=" hidden md:block lg:hidden" />
              <Image src="/logo.png" width={82} height={81} alt="Logo" className=" block md:hidden" />
            </div>


            <nav className="flex flex-col items-center justify-center rounded-md h-auto w-[500px] md:w-[630px] lg:w-[850px] xl:w-[1115px] text-gray-600 lg:mb-10">
              <ul className="flex items-center justify-center space-x-7 xl:space-x-16 py-3 lg:py-6 h-full md:h-auto text-[11px] md:text-[15px] lg:text-[20px] xl:text-[23px] uppercase text-black font-normal">
                <li><Link href="#" className="font-semibold">Home</Link></li>
                <li><Link href="#featured-products" className="hover:font-semibold">Featured Products</Link></li>
                <li><Link href="#our-products" className="hover:font-semibold">Products</Link></li>
                <li><Link href="#about-us" className="hover:font-semibold">About Us</Link></li>
                <li><Link href="#contact-us" className="hover:font-semibold">Contact Us</Link></li>
                <li className="nav-item rounded-full cursor-pointer lg:ml-4 hidden sm:block" onClick={() => setShowSearch(!showSearch)} >
                  {showSearch ? (<MdClose className="text-md md:text-lg lg:text-2xl" />) : (<IoMdSearch className="text-md md:text-lg lg:text-2xl" />)}</li>
              </ul>

              {showSearch && (
                <form className="flex mt-2 pt-1 pb-3 mb-2 md:px-5 lg:px-9 lg:mt-0 w-full" role="search" onSubmit={searchProducts}>
                  <input className="form-input w-full px-3 py-1 lg:py-2 border border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d8af88] bg-transparent text-black text-[13px] lg:text-[18px]"
                    type="search" placeholder="Search" aria-label="Search" onChange={onChangeValue} />
                  <button className="ml-2 btn bg-[#948473] text-white px-2 lg:px-4 py-1 lg:py-2 rounded-md text-[13px] lg:text-[18px] hover:bg-[#493d32]"
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
            <div className="flex pr-14">
              {/* Animate Each Letter in Text */}
              <motion.div
                className="text-black text-[20px] md:text-[24px] lg:text-[34px] font-light tracking-widest sm:items-center lg:flex-row lg:items-start"
                initial="offscreen"
                whileInView="onscreen"
                variants={desVariants}
              >
                <p>Defining Perfection Since</p>
                <p>2005...</p>
              </motion.div>
            </div>
          </div>



        </div>
      </div>
      <div
        className="relative h-[852px] w-full bg-cover filter flex flex-col items-center sm:hidden"
        style={{
          backgroundImage: mobilepageImg?.length > 0 && mobilepageImg[0].images.length > 0
            ? `url(${getImageUrl(mobilepageImg[0].images[0])})`
            : "none",
        }}
      >


        {/* Navbar for Mobile */}
        <div className="sm:hidden bg-transparent h-[120px] flex items-center justify-between px-4">
          <img className="h-[77px] w-[81px]" src="/logo.png" alt="Logo" />
          <div className="flex flex-col w-64 xxs:ml-2 ml-0 xs:w-72 sm:w-96">
            <div className=" flex flex-col items-end justify-end relative mt-3 w-full">

              {/* Tagline */}
              <div className="flex flex-col w-[245px] items-start">
                <motion.p
                  className="text-black text-[15px] tracking-[2.5px] font-medium"
                  initial="offscreen"
                  whileInView="onscreen"
                  variants={titleVariants}
                >
                  Defining Perfection Since
                </motion.p>
                <motion.p
                  className="tracking-[3px] leading-none text-black"
                  initial="offscreen"
                  whileInView="onscreen"
                  variants={yearVariants}
                >
                  <span className="text-[15px] font-medium">2005...</span>
                </motion.p>
              </div>
              <form className='flex w-[245px] px-1 mt-2 text-[8px] border border-[#766554] bg-white rounded' role="search" onSubmit={searchProducts}>
                <input
                  type="search"
                  name='search'
                  aria-label="Search"
                  className="focus:outline-none form-input w-full p-0.5"
                  onChange={onChangeValue}
                />
                <button className="text-[11px]"
                  type="submit" ><IoMdSearch /></button>
              </form>
            </div>
          </div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-between mt-28 h-[421px] w-[320px]">
          {/* Buttons */}
            <motion.button
              onClick={navigateToFeaturedProducts}
              className="w-full h-[69px] py-2 border border-black bg-[#D9D9D966] text-black font-normal text-[23px]"
              whileHover="hover"
              variants={buttonHover}
            >
              FEATURED PRODUCTS
            </motion.button>
            <motion.button
              onClick={navigateToProducts}
              className="w-full h-[69px] py-2 border border-black bg-[#D9D9D966] text-black font-normal text-[23px]"
              whileHover="hover"
              variants={buttonHover}
            >
              PRODUCTS
            </motion.button>
            <a href="#about-us" className="w-full h-[69px] flex items-center justify-center  py-2 border border-black bg-[#D9D9D966] text-black font-normal text-[23px]">
              ABOUT US
            </a>
            <a href="#contact-us" className="w-full h-[69px] flex items-center justify-center py-2 border border-black bg-[#D9D9D966] text-black font-normal text-[23px]">
              CONTACT US
            </a>
        </div>

        <div className='absolute bottom-5 right-5 flex gap-3'>
          <a target="_blank" rel="noopener noreferrer">
            <Image src="/instagram.png" width={20} height={20} alt="Logo" className="" />
          </a>
          <a href="https://wa.me/918003888970" target="_blank" rel="noopener noreferrer">
            <Image src="/whatsapp.png" width={20} height={20} alt="Logo" className="" />
          </a>
        </div>
      </div>
    </div>
  );
}
