"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { fetchDataFromApi } from "@/utils/api";
import toast, { Toaster } from 'react-hot-toast';
import { IoBagOutline } from 'react-icons/io5';
import Link from "next/link";

export default function DiningDetails({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [edges, setEdges] = useState([]);
  const [tops, setTops] = useState([]);
  const [finishes, setFinishes] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filteredImages, setFilteredImages] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [queryCount, setQueryCount] = useState(0);
  const [queryItems, setQueryItems] = useState([]);
  const [isInQuery, setIsInQuery] = useState(false);

  const sliderRef = useRef(null);

  useEffect(() => {
    const queryItems = JSON.parse(localStorage.getItem('queryItems')) || [];
    setIsInQuery(queryItems.some(item => item.id === id));
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchDataFromApi(`/api/products/${id}`).then((res) => {
        setProduct(res);
        setSelectedImage(res?.images?.[0]);
        setFilteredImages(res?.images || []); // Initialize with all images
      });
      fetchDataFromApi(`/api/productedge/productedges?productId=${id}`).then((res) => {
        setEdges(res?.edge?.edges);
      });

      fetchDataFromApi(`/api/producttop/producttops?productId=${id}`).then((res) => {
        setTops(res?.top?.tops);
      });

      fetchDataFromApi(`/api/productfinish/productfinishes?productId=${id}`).then((res) => {
        setFinishes(res?.finish?.finishes);
      });
    }
  }, [id]);

  useEffect(() => {
    const savedQueryItems = JSON.parse(localStorage.getItem('queryItems')) || [];
    setQueryItems(savedQueryItems);
    setQueryCount(savedQueryItems.length);
  }, []);

  const handleAddToQuery = () => {
    const newQueryItem = {
      id: product._id,
      code: product.code,
      name: product.name,
      image: product.images?.[0]?.url ? `${imageBaseUrl}${product.images[0].url}` : "/placeholder.jpg"
    };

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

  if (!product) {
    return <p>Loading...</p>;
  }

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
    <div className="overflow-x-hidden 2xl:container mx-auto">
      <Toaster position="bottom-center" reverseOrder={false} toastOptions={{ style: { background: '#6c4722', color: '#fff', }, }} />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-start">
          <h1 className="text-3xl font-normal tracking-[12px] text-[#8F7C6D] mb-10">{product.code}</h1>
          <div className="ml-auto flex rounded-full border border-[#8F7C6D] bg-neutral-100">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <Link className="flex" href="/query">
                <button className="text-[#8F7C6D] font-bold">
                  <IoBagOutline className="h-6 w-6" />
                  {queryCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs text-white bg-orange-600 rounded-full">
                      {queryCount}
                    </span>
                  )}
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-4/12 px-8 space-y-6 flex flex-col justify-center items-center">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`rotate-90 z-10 h-7 w-7 bg-white p-1 rounded-full shadow-md ${currentSlide === 0
                ? "opacity-70 cursor-not-allowed"
                : "cursor-pointer"
                }`}
            >
              <svg
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
              </svg>
            </button>

            <div className="flex md:flex-col gap-3 sm:gap-8 md:gap-6 overflow-hidden"
              ref={sliderRef}
            >
              {filteredImages
                .slice(currentSlide, currentSlide + 2)
                .map((image, index) => (
                  <div key={index} className="bg-gray-100 flex h-60 p-4">
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
              className={`h-7 w-7 md:rotate-90 z-10 bg-white p-1 rounded-full shadow-md ${currentSlide >= filteredImages.length - 2
                ? "opacity-70 cursor-not-allowed"
                : "cursor-pointer"
                }`}
            >
              <svg
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
              </svg>
            </button>

            <div className="flex flex-col font-medium justify-center items-center text-md text-[#8F7C6D]">
              <div className="tracking-[6px]">{product.length} x {product.width} x {product.height}.</div>
              <div className="tracking-[6px] mt-3 mb-6">CBM : {product.cbm}</div>
            </div>
          </div>

          <div className="w-8/12 flex flex-col">
            <div>
              <h2 className="text-2xl font-normal tracking-[8px] text-[#8F7C6D]">
                {product.name}
              </h2>
            </div>

            <div className="p-8 border-l flex-1 flex flex-col justify-center" style={{ borderLeftColor: '#8F7C6D', borderLeftWidth: '2px' }}>
              <div className="bg-gray-100 p-4 h-96 flex relative">
                <div className="absolute top-0 left-0 w-32 h-32">
                  <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-gray-700 via-gray-300 to-gray-100"></div>
                  <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-gray-700 via-gray-300 to-gray-100"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-32 h-32">
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

              <div className="mt-14 flex">
                <div className="w-7/12 space-y-5">
                  <div className="flex">
                    <span className="text-md font-semibold tracking-[6px] text-[#8F7C6D]">Material:</span>
                    <span className="text-md tracking-[4px] text-[#8F7C6D] pl-2">{product.topmaterial?.name}, {product.legmaterial?.name}</span>
                  </div>

                  <div className="border-t-2 ml-5 opacity-50" style={{ borderColor: '#8F7C6D' }}></div>

                  <div className="flex">
                    <span className="text-md font-semibold tracking-[6px] text-[#8F7C6D]">Finish:</span>
                    <span className="text-md tracking-[4px] text-[#8F7C6D] pl-2">
                      {activeFilter?.type === 'finish'
                        ? activeFilter.name
                        : `${product.topfinish?.name}, ${product.legfinish?.name}`}
                    </span>
                  </div>
                </div>
                <div className="w-5/12 flex justify-end items-center relative">
                  {isInQuery ? (
                    <Link href="/query" passHref>
                      <button className="bg-[#8F7C6D] text-white px-4 py-2 font-semibold rounded-full hover:bg-[#6E5D4F] transition-colors">
                        View Query List
                      </button>
                    </Link>
                  ) : (
                    <button
                      onClick={handleAddToQuery}
                      className="bg-[#8F7C6D] text-white px-4 py-2 font-semibold rounded-full hover:bg-[#6E5D4F] transition-colors"
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


      <div className="flex flex-col gap-6 md:gap-10 bg-white md:mt-10 px-2 pt-6 md:pt-10 border-t border-gray-400">
        {/* Filter status and reset button */}
        {activeFilter && (
          <div className="flex justify-between items-center px-4">
            <div className="text-sm font-medium">
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

        <div className="flex justify-center items-center text-sm sm:text-xl md:text-2xl font-light">Pair It With :</div>

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
              <p className="pt-1 text-[10px] md:text-sm xl:text-base">{top?.name?.name}</p>
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
              <p className="pt-1 text-[10px] md:text-sm xl:text-base">{edge?.name?.name}</p>
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
              <p className="pt-1 text-[10px] md:text-sm xl:text-base">{finish?.name?.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}