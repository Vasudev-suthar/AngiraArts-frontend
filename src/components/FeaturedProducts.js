"use client";

import Image from "next/image";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { togVariants, slideIn, fadeVariants, textUpVariants } from "@/utils/animation";

export default function FeaturedProducts({ featuredProducts }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredProducts.length - 1 : prevIndex - 1
    );
  };

  // Auto slide every 2 seconds unless paused
  useEffect(() => {
    if (!featuredProducts || featuredProducts.length === 0) return;
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [featuredProducts, isPaused]);

  if (!featuredProducts || featuredProducts.length === 0) return null;

  const prevIndex = currentIndex === 0 ? featuredProducts.length - 1 : currentIndex - 1;
  const nextIndex = (currentIndex + 1) % featuredProducts.length;

  const imageBaseUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/uploads/`;

  const getImageUrl = (image) => {
    return image?.url ? `${imageBaseUrl}${image.url}` : "/placeholder.jpg";
  };


  return (
    <div className="block bg-[#F4F3F0] w-full overflow-x-hidden h-[100vh] sm:h-auto pb-9 sm:pb-20 xl:pb-28 3xl:container 2xl:mx-auto font-raleway">
      {/* Title */}
      <div className="flex justify-center items-center bg-white h-10 sm:h-20 mt-10 w-52 sm:w-[450px] lg:w-[593px]">
        <motion.p
          className="text-lg sm:text-[30px] lg:text-[40px] font-light tracking-wider sm:tracking-[7.2px]"
          initial="offscreen"
          whileInView="onscreen"
          variants={slideIn}
        >
          Featured Products
        </motion.p>
      </div>

      {/* Description */}
      <div className="mt-6 px-4 sm:px-8 lg:px-16 w-full lg:w-[870px]">
        <motion.p
          className="text-xs sm:text-[18px] font-light leading-6 sm:leading-8 tracking-wider capitalize break-words"
          initial="offscreen"
          whileInView="onscreen"
          variants={togVariants}
        >
          Welcome To Our Featured Products Section, Here We Proudly Present
          This Collection Of True Gems That Transcend Ordinary Expectations And
          Redefine The Very Essence Of Excellence.
        </motion.p>
      </div>

      {/* Main Section */}
      <div className="w-full relative">
        <div className="flex justify-between items-center pt-16 sm:pt-10 pb-5">
          {/* Left Circle */}
          <div className="relative justify-center items-center rounded-full bg-white w-[26vw] lg:w-[300px] xl:w-[400px] h-[26vw] lg:h-[300px] xl:h-[400px] cursor-pointer -ml-[13.5%] hidden lg:flex">
            <div className="absolute w-[110%] h-[100%] aspect-square flex justify-center items-center">
              <Image
                src={getImageUrl(featuredProducts[prevIndex]?.images[0])}
                fill
                alt="Previous Image"
                className="object-contain cursor-pointer max-w-none hidden lg:block z-20 opacity-50"
              />
            </div>
          </div>

          {/* Main Image */}
          <div className="flex justify-between items-center mx-auto md:px-0">
            <div
              onClick={prevImage}
              className="relative flex justify-center items-center right-6 lg:-right-6 rounded-full bg-[#E7E4E1] p-2 cursor-pointer z-10 w-[32px] h-[32px] sm:w-[45px] sm:h-[45px] lg:w-[55px] lg:h-[55px]"
            >
              <BsArrowLeft className="text-[26px] text-[#766554]" />
            </div>

            <Link href={`/diningtable/${featuredProducts[currentIndex]?._id}`} passHref>
              <div
                className="relative flex justify-center items-center rounded-full bg-white w-[55vw] lg:w-[500px] xl:w-[600px] h-[55vw] lg:h-[500px] xl:h-[600px] cursor-pointer"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    variants={fadeVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute w-[110%] h-[55%] aspect-square"
                  >
                    <Image
                      src={getImageUrl(featuredProducts[currentIndex]?.images[0])}
                      fill
                      alt="Current Image"
                      className="object-contain cursor-pointer"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </Link>

            <div
              onClick={nextImage}
              className="relative flex justify-center items-center left-6 lg:-left-6 rounded-full bg-[#E7E4E1] p-2 cursor-pointer z-10 w-[32px] h-[32px] sm:w-[45px] sm:h-[45px] lg:w-[55px] lg:h-[55px]"
            >
              <BsArrowRight className="text-[26px] text-[#766554]" />
            </div>
          </div>

          {/* Right Circle */}
          <div className="relative justify-center items-center rounded-full bg-white w-[26vw] lg:w-[300px] xl:w-[400px] h-[26vw] lg:h-[300px] xl:h-[400px] cursor-pointer -mr-[13.5%] hidden lg:flex">
            <div className="absolute w-[110%] h-[100%] aspect-square flex justify-center items-center">
              <Image
                src={getImageUrl(featuredProducts[nextIndex]?.images[0])}
                fill
                alt="Next Image"
                className="object-contain cursor-pointer max-w-none hidden lg:block z-20 opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Product Name */}
        <motion.div
          key={currentIndex}
          variants={textUpVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full px-4 self-end flex justify-center absolute bottom-6 md:bottom-12"
        >
          <p className="tracking-[3px] sm:tracking-[10px] text-center text-xs xs:text-lg sm:text-[24px] lg:text-[32px] font-extralight">
            {featuredProducts[currentIndex]?.name || "Product Name"}
          </p>
        </motion.div>
      </div>
    </div>
  );
}





// "use client"

// import Image from "next/image";
// import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
// import React, { useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { togVariants, slideIn, titleVariants } from "@/utils/animation";

// export default function FeaturedProducts({ featuredProducts }) {

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextImage = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length);
//   };

//   const prevImage = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? featuredProducts.length - 1 : prevIndex - 1
//     );
//   };

//   if (featuredProducts.length === 0) {
//     return
//   }

//   const prevIndex = currentIndex === 0 ? featuredProducts.length - 1 : currentIndex - 1;
//   const nextIndex = (currentIndex + 1) % featuredProducts.length;


//   const imageBaseUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/uploads/`;

//   const getImageUrl = (image) => {
//     return image?.url ? `${imageBaseUrl}${image.url}` : "/placeholder.jpg";
//   };

//   return (
//     <div className="block bg-[#F4F3F0] w-full overflow-x-hidden h-[100vh] sm:h-auto pb-9 sm:pb-20 xl:pb-28 3xl:container 2xl:mx-auto font-raleway">
//       {/* Title */}
//       <div className="flex justify-center items-center bg-white h-10 sm:h-20 mt-10 w-52 sm:w-[450px] lg:w-[593px]">
//         <motion.p className="text-lg sm:text-[30px] lg:text-[40px] font-light tracking-wider sm:tracking-[7.2px]"
//           initial="offscreen"
//           whileInView="onscreen"
//           variants={slideIn}
//         >
//           Featured Products
//         </motion.p>
//       </div>

//       {/* Description */}
//       <div className="mt-6 px-4 sm:px-8 lg:px-16 w-full lg:w-[870px]">
//         <motion.p
//           className="text-xs sm:text-[18px] font-light leading-6 sm:leading-8 tracking-wider capitalize break-words"
//           initial="offscreen"
//           whileInView="onscreen"
//           variants={togVariants}
//         >
//           Welcome To Our Featured Products Section, Here We Proudly Present
//           This Collection Of True Gems That Transcend Ordinary Expectations And
//           Redefine The Very Essence Of Excellence.
//         </motion.p>
//       </div>

//       <div>
//         <div className="w-full relative">
//           <div className="flex justify-between items-center pt-16 sm:pt-10 pb-5">
//             {/* Left White Circle with Previous Image */}
//             <div className="relative justify-center items-center rounded-full bg-white w-[26vw] lg:w-[300px] xl:w-[400px] h-[26vw] lg:h-[300px] xl:h-[400px] cursor-pointer -ml-[13.5%] hidden lg:flex">
//               <div className="absolute w-[110%] h-[100%] aspect-square flex justify-center items-center">
//                 <Image
//                   src={getImageUrl(featuredProducts[prevIndex]?.images[0])}
//                   fill
//                   alt="Previous Image"
//                   className="object-contain cursor-pointer max-w-none hidden lg:block z-20 opacity-50"
//                 />
//               </div>
//             </div>

//             {/* Main Image with Arrows */}
//             <div className="flex justify-between items-center mx-auto md:px-0">
//               <div onClick={prevImage} className="relative flex justify-center items-center right-6 lg:-right-6 rounded-full bg-[#E7E4E1] p-2 cursor-pointer z-10 w-[32px] h-[32px] sm:w-[45px] sm:h-[45px] lg:w-[55px] lg:h-[55px]">
//                 <BsArrowLeft
//                   className="text-[26px] text-[#766554]"
//                 />
//               </div>


//               <Link href={`/diningtable/${featuredProducts[currentIndex]?._id}`} passHref>
//                 <div className="relative flex justify-center items-center rounded-full bg-white w-[55vw] lg:w-[500px] xl:w-[600px] h-[55vw] lg:h-[500px] xl:h-[600px] cursor-pointer">
//                   <div className="absolute w-[110%] h-[55%] aspect-square">
//                     <Image
//                       src={getImageUrl(featuredProducts[currentIndex]?.images[0])}
//                       fill
//                       alt="Current Image"
//                       className="object-contain cursor-pointer"
//                     />
//                   </div>
//                 </div>
//               </Link>

//               <div onClick={nextImage} className="relative flex justify-center items-center left-6 lg:-left-6 rounded-full bg-[#E7E4E1] p-2 cursor-pointer z-10 w-[32px] h-[32px] sm:w-[45px] sm:h-[45px] lg:w-[55px] lg:h-[55px]">
//                 <BsArrowRight
//                   className="text-[26px] text-[#766554]"
//                 />
//               </div>
//             </div>

//             {/* Right White Circle with Next Image */}
//             <div className="relative justify-center items-center rounded-full bg-white w-[26vw] lg:w-[300px] xl:w-[400px] h-[26vw] lg:h-[300px] xl:h-[400px] cursor-pointer -mr-[13.5%] hidden lg:flex">
//               <div className="absolute w-[110%] h-[100%] aspect-square flex justify-center items-center">
//                 <Image
//                   src={getImageUrl(featuredProducts[nextIndex]?.images[0])}
//                   fill
//                   alt="Next Image"
//                   className="object-contain cursor-pointer max-w-none hidden lg:block z-20 opacity-50"
//                 />
//               </div>
//             </div>
//           </div>

//           <motion.div className="w-full px-4 self-end flex justify-center absolute bottom-6 md:bottom-12"
//             initial="offscreen"
//             whileInView="onscreen"
//             variants={titleVariants}
//           >
//             <p className="tracking-[3px] sm:tracking-[10px] text-center text-xs xs:text-lg sm:text-[24px] lg:text-[32px] font-extralight">
//               {featuredProducts[currentIndex]?.name || "Product Name"}
//             </p>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }
