'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoBagOutline } from 'react-icons/io5';
import toast from "react-hot-toast";
import { RiArrowDownWideFill, RiArrowUpWideFill } from "react-icons/ri";

export default function ProductDetail({ product, edges, tops, finishes }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filteredImages, setFilteredImages] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [queryCount, setQueryCount] = useState(0);
  const [queryItems, setQueryItems] = useState([]);
  const [isInQuery, setIsInQuery] = useState(false);

  const sliderRef = useRef(null);

  useEffect(() => {
    setSelectedImage(product?.images?.[0]);
    setFilteredImages(product?.images || []);
  }, []);

  useEffect(() => {
    const savedQueryItems = JSON.parse(localStorage.getItem('queryItems')) || [];
    setIsInQuery(savedQueryItems.some(item => item.id === product._id));
    setQueryItems(savedQueryItems);
    setQueryCount(savedQueryItems.length);
  }, []);

  const handleAddToQuery = () => {
    const newQueryItem = {
      id: product._id,
      code: product.code,
      name: product.name,
      image: product.images?.[0]?.url ? `${imageBaseUrl}${product.images[0].url}` : "/placeholder.jpg"
    }
    const updatedQueryItems = [...queryItems, newQueryItem];
    setQueryItems(updatedQueryItems);
    localStorage.setItem('queryItems', JSON.stringify(updatedQueryItems));
    setIsInQuery(true);
    toast.success("Product Added To Query List");

    const items = JSON.parse(localStorage.getItem('queryItems')) || [];
    setQueryCount(items.length);
  };

  // Function to filter images based on selected edge/top/finish
  const filterImages = (type, value, name) => {
    if (!product?.images) return;

    // If clicking the same filter again, reset to show all images
    if (activeFilter?.type === type && activeFilter?.value === value) {
      setFilteredImages(product.images);
      setActiveFilter(null);
      setSelectedImage(product.images[0]);
      setCurrentSlide(0);
      return;
    }

    // Filter images based on the selected type
    const filtered = product.images.filter(image => {
      switch (type) {
        case 'top':
          return image.topType === value;
        case 'edge':
          return image.edgeType === value;
        case 'finish':
          return image.finishType === value;
        default:
          return true;
      }
    });

    setFilteredImages(filtered);
    setActiveFilter({ type, value, name });
    setSelectedImage(filtered.length ? filtered[0] : null);
    setCurrentSlide(0);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilteredImages(product?.images || []);
    setActiveFilter(null);
    setSelectedImage(product?.images?.[0] || null);
    setCurrentSlide(0);
  };



  const imageBaseUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/uploads/`;

  const getImageUrl = (image) => {
    return image?.url ? `${imageBaseUrl}${image.url}` : "/placeholder.jpg";
  };

  const getImage = (image) => (image ? `${imageBaseUrl}${image}` : "/placeholder.jpg");

  const nextSlide = () => {
    if (currentSlide < filteredImages.length - 2) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };


  return (
    <>
      <div className="container px-2 sm:px-4 mx-auto py-10 font-raleway">
        <div className="flex items-start">
          <h1 className="text-[15px] md:text-[49px] font-normal tracking-[10px] ml-3 md:ml-14 mb-10">{product.code}</h1>
          <div className="ml-auto flex rounded-full border border-[#8F7C6D] bg-neutral-100">
            <div className="relative w-8 h-8 md:w-12 md:h-12 flex items-center justify-center">
              <Link className="flex" href="/query">
                <button className="font-bold">
                  <IoBagOutline className="h-4 w-4 md:h-6 md:w-6 text-[#8F7C6D]" />
                  {queryCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 md:w-5 md:h-5 text-xs text-white bg-orange-600 rounded-full">
                      {queryCount}
                    </span>
                  )}
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-4/12 pr-4 space-y-2 hidden md:flex flex-col justify-center items-center">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`z-10 h-7 w-8 bg-[#EFEFEF80] flex justify-center items-center p-1 rounded-full shadow-md ${currentSlide === 0
                ? "cursor-not-allowed"
                : "cursor-pointer"
                }`}
            >
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg> */}
              <RiArrowUpWideFill />
            </button>

            <div className="flex md:flex-col gap-8 overflow-hidden"
              ref={sliderRef}
            >
              {filteredImages
                .slice(currentSlide, currentSlide + 2)
                .map((image, index) => (
                  <div key={index} className="flex h-60 pr-4 bg-[#EFEFEF80]">
                    <Image
                      key={index}
                      src={getImageUrl(image)}
                      width={175}
                      height={145}
                      alt={`Thumbnail ${index + 1}`}
                      className={`object-contain w-full`}
                      onClick={() => setSelectedImage(image)}
                    />
                  </div>
                ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide >= filteredImages.length - 2}
              className={`h-7 w-8 z-10 bg-[#EFEFEF80] flex justify-center items-center p-1 rounded-full shadow-md ${currentSlide >= filteredImages.length - 2
                ? "cursor-not-allowed"
                : "cursor-pointer"
                }`}
            >
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg> */}
               <RiArrowDownWideFill />

            </button>

            <div className="flex flex-col font-normal justify-center items-center text-[13px] lg:text-[19px] xl:text-[22px]">
              <div className="tracking-[4px] xl:tracking-[6px] mt-6">{product.length} x {product.width} x {product.height}.</div>
              <div className="tracking-[4px] xl:tracking-[6px] mt-4">CBM : {product.cbm}</div>
            </div>
          </div>

          <div className="w-full md:w-8/12 flex flex-col">
            <div className="flex justify-start md:block">
              <h2 className="text-[14px] md:text-[33px] sm:leading-10 relative md:ml-[-3px] font-light tracking-[6px] sm:tracking-[8px] capitalize">
                {product.name}
              </h2>
            </div>

            <div className="flex relative">
              <div className="hidden md:block border-l-[2.58px] border-solid border-[#0000004D] relative top-[-9px] h-[103%]"></div>
              <div className="md:pl-8 flex-1 flex flex-col justify-center">
                <div className="p-10 md:p-4 md:h-96 mt-10 md:mt-24 flex relative bg-[#EFEFEF80]">
                  <div className="absolute top-0 left-0 w-16 h-16 md:w-32 md:h-32">
                    <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-gray-700 via-gray-300 to-gray-100"></div>
                    <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-gray-700 via-gray-300 to-gray-100"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 md:w-32 md:h-32">
                    <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-gray-100 via-gray-300 to-gray-700"></div>
                    <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-gray-100 via-gray-300 to-gray-700"></div>
                  </div>
                  <Image
                    src={getImageUrl(selectedImage) || "/placeholder.jpg"}
                    alt="Live Edge Slab Dining Table Main View"
                    width={500}
                    height={300}
                    className="object-contain w-full"
                  />
                </div>

                <div className="flex md:hidden flex-col font-normal justify-center items-center text-[11px]">
                  <div className="tracking-[6px] mt-6">{product.length} x {product.width} x {product.height}.</div>
                </div>

                <div className="mt-16 hidden md:flex">
                  <div className="w-8/12 space-y-6">
                    <div className="flex text-[15px] lg:text-[19px] xl:text-[23.21px] tracking-[4px] xl:tracking-[6px]">
                      <span className="font-normal">Material:</span>
                      <span className="font-light pl-2">{product.topmaterial?.name}, {product.legmaterial?.name}</span>
                    </div>

                    <div className="border-t-[1.29px] border-solid border-[#0000003D]"></div>

                    <div className="flex text-[15px] lg:text-[19px] xl:text-[23.21px] tracking-[4px] xl:tracking-[6px]">
                      <span className="font-normal">Finish:</span>
                      <span className="font-light pl-2">
                        {activeFilter?.type === 'finish'
                          ? activeFilter.name
                          : `${product.topfinish?.name}, ${product.legfinish?.name}`}
                      </span>
                    </div>
                  </div>
                  <div className="w-4/12 flex justify-end items-center relative">
                    {isInQuery ? (
                      <Link href="/query" passHref>
                        <button className="bg-white text-[15px] xl:text-[18px] border-2 border-[#8F7C6D] text-[#8F7C6D] px-3 xl:px-6 py-3 font-semibold rounded-full hover:text-white hover:bg-[#6E5D4F] transition-colors">
                          View Query List
                        </button>
                      </Link>
                    ) : (
                      <button
                        onClick={handleAddToQuery}
                        className="bg-white text-[15px] xl:text-[18px] text-[#8F7C6D] border-2 border-[#8F7C6D] px-3 xl:px-6 py-3 font-semibold rounded-full hover:bg-[#6E5D4F] hover:text-white transition-colors"
                      >
                        Add to Query
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex md:hidden">
              <div className="w-6/12 mt-4 space-y-2 flex flex-col md:hidden justify-center items-center">
                <button
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className={`z-10 h-5 w-6 sm:h-7 sm:w-8 bg-[#EFEFEF80] flex justify-center items-center p-1 rounded-full ${currentSlide === 0
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                    }`}
                >
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg> */}
                  <RiArrowUpWideFill />

                </button>

                <div className="flex flex-col gap-8 overflow-hidden"
                  ref={sliderRef}
                >
                  {filteredImages
                    .slice(currentSlide, currentSlide + 2)
                    .map((image, index) => (
                      <div key={index} className="flex bg-[#EFEFEF80] p-3">
                        <Image
                          key={index}
                          src={getImageUrl(image)}
                          width={175}
                          height={145}
                          alt={`Thumbnail ${index + 1}`}
                          className={`object-contain w-full`}
                          onClick={() => setSelectedImage(image)}
                        />
                      </div>
                    ))}
                </div>

                <button
                  onClick={nextSlide}
                  disabled={currentSlide >= filteredImages.length - 2}
                  className={`h-5 w-6 sm:h-7 sm:w-8 z-10 bg-[#EFEFEF80] flex justify-center items-center p-1 rounded-full ${currentSlide >= filteredImages.length - 2
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                    }`}
                >
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg> */}
                  <RiArrowDownWideFill />

                </button>
              </div>
              <div className="mt-16 xs:mt-20 ml-6 w-full">
                <div className="w-full space-y-7 xs:space-y-12">
                  <div className="flex">
                    <span className="text-[10px] font-normal tracking-[4px]">Material:</span>
                    <span className="text-[10px] tracking-[4px] font-light pl-2">{product.topmaterial?.name}, {product.legmaterial?.name}</span>
                  </div>

                  <div className="flex">
                    <span className="text-[10px] font-normal tracking-[4px]">Finish:</span>
                    <span className="text-[10px] tracking-[4px] font-light pl-2">
                      {activeFilter?.type === 'finish'
                        ? activeFilter.name
                        : `${product.topfinish?.name}, ${product.legfinish?.name}`}
                    </span>
                  </div>
                </div>
                <div className="w-full flex flex-col xs:flex-row items-center xs:items-normal gap-2 xs:gap-0 justify-between mt-7 xs:mt-14">
                  <div className="tracking-[4px] text-[11px] font-light mt-6">CBM : {product.cbm}</div>
                  <div className="flex justify-end items-center relative">
                    {isInQuery ? (
                      <Link href="/query" passHref>
                        <button className="bg-white text-[12px] border-2 border-[#8F7C6D] text-[#8F7C6D] px-2 py-2 font-semibold rounded-full hover:text-white hover:bg-[#6E5D4F] transition-colors">
                          View Query List
                        </button>
                      </Link>
                    ) : (
                      <button
                        onClick={handleAddToQuery}
                        className="bg-white text-[#8F7C6D] text-[12px] border-2 border-[#8F7C6D] px-4 py-2 font-semibold rounded-full hover:bg-[#6E5D4F] hover:text-white transition-colors"
                      >
                        Add to Query
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 md:gap-10 bg-white px-2 pt-6 md:pt-10 border-t-[2px] border-solid border-[#0000004D] font-raleway">
        {/* Filter status and reset button */}
        {activeFilter && (
          <div className="flex justify-between items-center px-4 sm:tracking-widest">
            <div className="text-sm font-medium ml-4">
              Showing {filteredImages.length} images filtered by: {activeFilter.name}
            </div>
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Reset Filters
            </button>
          </div>
        )}

        <div className="flex justify-center items-center text-sm sm:text-xl md:text-2xl tracking-widest font-light">Pair It With :</div>

        {/* Tops */}
        <div className="flex flex-wrap justify-around items-center">
          {tops?.map((top, index) => (
            <div
              key={index}
              className={`flex flex-col items-center cursor-pointer p-2 rounded ${activeFilter?.type === 'top' && activeFilter?.value === top.name._id ? 'bg-blue-100' : ''
                }`}
              onClick={() => filterImages('top', top.name._id, top.name.name)}
            >
              <Image
                src={getImage(top?.name?.images?.[0]) || "/placeholder.jpg"}
                alt={top?.name?.name || "Top Name"}
                width={100}
                height={50}
                className="w-[50px] h-[25px] md:w-[100px] md:h-[50px]"
              />
              <p className="pt-1 text-[10px] md:text-sm xl:text-base tracking-widest">{top?.name?.name}</p>
            </div>
          ))}
        </div>

        {/* Edges */}
        <div className="flex flex-wrap justify-around items-center">
          {edges?.map((edge, index) => (
            <div
              key={index}
              className={`flex flex-col items-center cursor-pointer p-2 rounded ${activeFilter?.type === 'edge' && activeFilter?.value === edge.name._id ? 'bg-blue-100' : ''
                }`}
              onClick={() => filterImages('edge', edge.name._id, edge.name.name)}
            >
              <Image
                src={getImage(edge?.name?.images?.[0]) || "/placeholder.jpg"}
                alt={edge?.name?.name || "Edge Name"}
                width={100}
                height={18}
                className="w-[70px] h-[10px] md:w-[100px] md:h-[18px]"
              />
              <p className="pt-1 text-[10px] md:text-sm xl:text-base tracking-widest">{edge?.name?.name}</p>
            </div>
          ))}
        </div>

        {/* Finishes */}
        <div className="flex flex-wrap justify-around items-center mb-8">
          {finishes?.map((finish, index) => (
            <div
              key={index}
              className={`flex flex-col items-center cursor-pointer p-2 rounded ${activeFilter?.type === 'finish' && activeFilter?.value === finish.name._id ? 'bg-blue-100' : ''
                }`}
              onClick={() => filterImages('finish', finish.name._id, finish.name.name)}
            >
              <Image
                src={getImage(finish?.name?.images?.[0]) || "/placeholder.jpg"}
                alt={finish?.name?.name || "Finish Name"}
                width={100}
                height={80}
                className="w-[50px] h-[40px] md:w-[100px] md:h-[80px]"
              />
              <p className="pt-1 text-[10px] md:text-sm xl:text-base tracking-widest">{finish?.name?.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
