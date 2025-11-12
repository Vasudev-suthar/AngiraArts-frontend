"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  togVariants,
  slideIn,
  slideInRight,
  buttonHover,
  slideUp,
} from "@/utils/animation";

export default function OurProducts({ categories }) {
  const imageBaseUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/uploads/`;

  const getImageUrl = (image) =>
    image ? `${imageBaseUrl}${image}` : "/placeholder.jpg";

  return (
    <div className="block relative bg-white pb-8 3xl:container 2xl:mx-auto overflow-x-hidden font-raleway">
      {/* Title */}
      <div className="flex justify-center items-center bg-[#F4F3F0] h-10 sm:h-20 mt-4 md:mt-8 w-44 sm:w-[360px] lg:w-[459px]">
        <motion.p
          className="text-lg sm:text-[30px] lg:text-[40px] font-light tracking-wider sm:tracking-[7.2px] font-light"
          initial="offscreen"
          whileInView="onscreen"
          variants={slideIn}
        >
          Our Products
        </motion.p>
      </div>

      <div className="w-full lg:w-[770px] lg:ml-16 mt-0 lg:mt-6 px-6 py-5 sm:py-8 lg:px-0 lg:py-0">
        <motion.p
          className="text-xs sm:text-[14px] lg:text-[18px] leading-6 sm:leading-8 tracking-wider capitalize font-light"
          initial="offscreen"
          whileInView="onscreen"
          variants={togVariants}
        >
          dive into the exquisite realm of our meticulously crafted product
          categories, where each piece embodies the artistry of expert
          craftsmanship. here, the warm embrace of natural wood seamlessly
          merges with the sturdy grace of iron, creating furniture that
          transcends ordinary standards.
        </motion.p>
      </div>

      <div className="hidden lg:flex flex-row w-full lg:gap-0 xs:px-6 mt-12">
        <div className="w-full lg:w-2/6 flex flex-col gap-6 lg:gap-10 items-start xl:px-10">
          {categories?.length > 0 && (
            <motion.div
              className="w-full lg:w-auto text-center relative"
              initial="offscreen"
              whileInView="onscreen"
              variants={slideIn}
            >
              <Link href="/chair">
                <div className="w-full lg:w-[300px] lg:h-[300px] xl:w-[320px] xl:h-[320px] aspect-[4/3] lg:aspect-[7/6] relative">
                  <Image
                    src={getImageUrl(categories[0]?.images[0])}
                    fill
                    className="object-cover"
                    alt={categories[0].name}
                  />
                </div>
                <motion.button
                  className="bg-white border border-[#766554] px-4 py-1 md:text-base absolute lg:bottom-[10px] lg:right-[-35px] xl:right-[-45px] tracking-widest lg:left-auto"
                  whileHover="hover"
                  variants={buttonHover}
                >
                  <span className="text-[21px] font-extralight">
                    {categories[0].name}
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          )}

          {categories?.length > 1 && (
            <motion.div
              className="w-full relative flex lg:justify-end"
              initial="offscreen"
              whileInView="onscreen"
              variants={slideIn}
            >
              <Link href="/stool" className="text-end">
                <div className="w-full lg:w-[300px] lg:h-[300px] xl:w-[320px] xl:h-[320px] aspect-[4/3] relative">
                  <Image
                    src={getImageUrl(categories[1]?.images[0])}
                    fill
                    className="object-cover"
                    alt={categories[1].name}
                  />
                </div>
                <motion.button
                  className="bg-white border border-[#766554] px-4 py-1 absolute lg:bottom-[10px] left-0 lg:left-[15px] xl:left-[10px] 2xl:left-[30px] tracking-widest"
                  whileHover="hover"
                  variants={buttonHover}
                >
                  <span className="text-[21px] font-extralight">
                    {categories[1].name}
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>

        <div className="w-full relative lg:flex justify-center items-center lg:w-2/6 mt-6 md:mt-0 mb-0 px-0">
          {categories?.length > 2 && (
            <motion.div
              className="w-full text-center relative mb-4"
              initial="offscreen"
              whileInView="onscreen"
              variants={slideUp}
            >
              <Link href="/diningtable" className="flex justify-center">
                <div className="w-full lg:w-[300px] lg:h-[300px] xl:w-[350px] xl:h-[350px] aspect-[4/3] lg:aspect-[3/3.5] relative">
                  <Image
                    src={getImageUrl(categories[2]?.images[0])}
                    fill
                    className="object-cover"
                    alt={categories[2].name}
                  />
                </div>
                <motion.button
                  className="bg-white border border-[#766554] px-4 py-1 bottom-[-10px] absolute tracking-widest left-0 xs:left-auto"
                  whileHover="hover"
                  variants={buttonHover}
                >
                  <span className="text-[21px] font-extralight">
                    {categories[2].name}
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>

        <div className="w-2/6 flex flex-col gap-10 xl:px-10 items-end">
          {categories?.length > 3 && (
            <motion.div
              className="w-full lg:w-auto relative flex justify-end"
              initial="offscreen"
              whileInView="onscreen"
              variants={slideInRight}
            >
              <Link href="/coffeetable">
                <div className="w-full lg:w-[300px] lg:h-[300px] xl:w-[320px] xl:h-[320px] aspect-[11/10] relative">
                  <Image
                    src={getImageUrl(categories[3]?.images[0])}
                    fill
                    className="object-cover"
                    alt={categories[3].name}
                  />
                </div>
                <motion.button
                  className="bg-white border border-[#766554] px-4 py-1 absolute bottom-[10px] lg:left-[-35px] xl:left-[-75px] tracking-widest"
                  whileHover="hover"
                  variants={buttonHover}
                >
                  <span className="text-[21px] font-extralight">
                    {categories[3].name}
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          )}

          {categories?.length > 4 && (
            <motion.div
              className="w-full relative flex justify-end lg:justify-start"
              initial="offscreen"
              whileInView="onscreen"
              variants={slideInRight}
            >
              <Link href="/diningtableleg">
                <div className="xl:mr-8 w-full lg:w-[300px] lg:h-[300px] xl:w-[320px] xl:h-[320px] aspect-[4/3] relative">
                  <Image
                    src={getImageUrl(categories[4]?.images[0])}
                    fill
                    className="object-cover"
                    alt={categories[4].name}
                  />
                </div>
                <motion.button
                  className="bg-white border border-[#766554] px-4 py-1 absolute bottom-[10px] lg:right-[-20px] tracking-widest"
                  whileHover="hover"
                  variants={buttonHover}
                >
                  <span className="text-[21px] font-extralight">
                    {categories[4].name}
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      {/* for mobile version */}
      <div className="mt-14 flex flex-row lg:hidden w-full md:gap-12 px-6 items-center justify-between md:justify-evenly mb-10">
        <div className="w-[45%] md:w-1/2 lg:w-2/6 flex flex-col gap-12 md:gap-16 items-center">
        
          {categories?.length > 2 && (
            <motion.div
              className="w-full text-center relative"
              initial="offscreen"
              whileInView="onscreen"
              variants={slideUp}
            >
              <Link href="/diningtable" className="flex justify-center">
                <div className="w-full md:w-[300px] md:h-[270px] aspect-[4/3] relative">
                  <Image
                    src={getImageUrl(categories[2]?.images[0])}
                    fill
                    className="object-cover"
                    alt={categories[2].name}
                  />
                </div>
                <motion.button
                  className="bg-white border border-[#766554] px-1 sm:py-1 md:text-base -bottom-4 absolute tracking-widest"
                  whileHover="hover"
                  variants={buttonHover}
                >
                  <span className="text-[11px] md:text-[20px] font-extralight">
                    {categories[2].name}
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          )}

          {categories?.length > 0 && (
            <motion.div
              className="w-full lg:w-auto text-center md:text-left relative"
              initial="offscreen"
              whileInView="onscreen"
              variants={slideIn}
            >
              <Link href="/chair" className="flex justify-center">
                <div className="w-full md:w-[300px] md:h-[270px] aspect-[4/3] relative">
                  <Image
                    src={getImageUrl(categories[0]?.images[0])}
                    fill
                    className="object-cover"
                    alt={categories[0].name}
                  />
                </div>
                <motion.button
                  className="bg-white border border-[#766554] px-1 sm:py-1 md:text-base absolute -bottom-4 tracking-widest"
                  whileHover="hover"
                  variants={buttonHover}
                >
                  <span className="text-[11px] md:text-[20px] font-extralight">
                    {categories[0].name}
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>


        <div className="w-[45%] md:w-1/2 lg:w-2/6 flex flex-col gap-12 md:gap-16 items-center">
          {categories?.length > 3 && (
            <motion.div
              className="w-full relative md:flex justify-center"
              initial="offscreen"
              whileInView="onscreen"
              variants={slideInRight}
            >
              <Link href="/coffeetable" className="flex justify-center">
                <div className="w-full md:w-[300px] md:h-[270px] aspect-[4/3] relative">
                  <Image
                    src={getImageUrl(categories[3]?.images[0])}
                    fill
                    className="object-cover"
                    alt={categories[3].name}
                  />
                </div>
                <motion.button
                  className="bg-white border border-[#766554] px-1 sm:py-1 absolute -bottom-4 tracking-widest"
                  whileHover="hover"
                  variants={buttonHover}
                >
                  <span className="text-[11px] md:text-[20px] font-extralight">
                    {categories[3].name}
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          )}

          {categories?.length > 4 && (
            <motion.div
              className="w-full relative md:flex justify-center"
              initial="offscreen"
              whileInView="onscreen"
              variants={slideIn}
            >
              <Link href="/diningtableleg" className="flex justify-center">
                <div className="w-full md:w-[300px] md:h-[270px] aspect-[4/3] relative">
                  <Image
                    src={getImageUrl(categories[4]?.images[0])}
                    fill
                    className="object-cover"
                    alt={categories[4].name}
                  />
                </div>
                <motion.button
                  className="bg-white border border-[#766554] px-1 sm:py-1 absolute -bottom-4 tracking-widest"
                  whileHover="hover"
                  variants={buttonHover}
                >
                  <span className="text-[11px] md:text-[20px] font-extralight">
                    {categories[4].name}
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          )}

          {categories?.length > 1 && (
            <motion.div
              className="w-full relative md:flex justify-center"
              initial="offscreen"
              whileInView="onscreen"
              variants={slideIn}
            >
              <Link href="/stool" className="flex justify-center">
                <div className="w-full md:w-[300px] md:h-[270px] aspect-[4/3] relative">
                  <Image
                    src={getImageUrl(categories[1]?.images[0])}
                    fill
                    className="object-cover"
                    alt={categories[1].name}
                  />
                </div>
                <motion.button
                  className="bg-white border border-[#766554] px-1 sm:py-1 absolute -bottom-4 tracking-widest"
                  whileHover="hover"
                  variants={buttonHover}
                >
                  <span className="text-[11px] md:text-[20px] font-extralight">
                    {categories[1].name}
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// export default function OurProducts({categories}) {

//   const imageBaseUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/uploads/`;

//   const getImageUrl = (image) => (image ? `${imageBaseUrl}${image}` : "/placeholder.jpg");

//   return (
//     <div className="block relative bg-white pb-8 2xl:container 2xl:mx-auto overflow-x-hidden font-raleway">
//       {/* Title */}
//       <div className="flex justify-center items-center bg-[#F4F3F0] h-10 sm:h-20 mt-4 md:mt-8 w-44 sm:w-[360px] lg:w-[459px]">
//         <motion.p
//           className="text-lg sm:text-[30px] lg:text-[40px] font-light tracking-wider sm:tracking-[7.2px] font-light"
//           initial="offscreen"
//           whileInView="onscreen"
//           variants={slideIn}
//         >
//           Our Products
//         </motion.p>
//       </div>

//       <div className="w-full md:w-[60%] lg:w-[840px] md:ml-8 lg:ml-16 mt-0 md:mt-6 px-10 py-5 xs:px-6 sm:px-14 sm:py-8 md:px-0 md:py-0">
//         <motion.p
//           className="text-xs sm:text-[18px] leading-6 sm:leading-8 tracking-wider capitalize font-light"
//           initial="offscreen"
//           whileInView="onscreen"
//           variants={togVariants}
//         >
//           dive into the exquisite realm of our meticulously crafted product categories, where each piece embodies the artistry of expert craftsmanship. here, the warm embrace of natural wood seamlessly merges with the sturdy grace of iron, creating furniture that transcends ordinary standards.
//         </motion.p>
//       </div>

//       <div className="w-1/2 hidden md:block lg:hidden absolute right-0 top-0 lg:w-1/5 mt-5 md:mt-0 mb-5 md:mb-0 sm:px-4 md:px-0">
//         {categories?.length > 2 && (
//           <motion.div
//             className="text-center relative mt-8 ml-20 flex justify-center"
//             initial="offscreen"
//             whileInView="onscreen"
//             variants={slideUp}
//           >
//             <Link href="/diningtable" className="relative">
//               <Image
//                 src={getImageUrl(categories[2]?.images[0])}
//                 width="530"
//                 height="326"
//                 className="w-[260px] h-[280px]"
//                 alt={categories[2].name}
//               />
//               <motion.button
//                 className="bg-white border border-[#766554] px-2 sm:px-4 sm:py-1 md:text-base md:ml-[-32px] md:mt-[-30px] absolute tracking-widest bottom-0 left-8 lg:left-auto"
//                 whileHover="hover"
//                 variants={buttonHover}
//               >
//                 <span className="text-md md:text-[21px] font-extralight">{categories[2].name}</span>
//               </motion.button>
//             </Link>
//           </motion.div>
//         )}
//       </div>
//       <div className="md:mt-14 flex flex-col md:flex-row w-full md:gap-12 lg:gap-0 px-10 xs:px-6 sm:px-14 lg:px-6">
//         <div className="w-full md:w-1/2 lg:w-2/6 flex flex-col xs:flex-row md:flex-col gap-6 lg:gap-10 items-start xl:px-10">
//           {categories?.length > 0 && (
//             <motion.div
//               className="w-full lg:w-auto text-center md:text-left relative"
//               initial="offscreen"
//               whileInView="onscreen"
//               variants={slideIn}
//             >
//               <Link href="/chair">
//                 <div className="w-full md:w-[350px] md:h-[350px] lg:w-[300px] lg:h-[300px] xl:w-[320px] xl:h-[320px] aspect-[4/3] lg:aspect-[7/6] relative">
//                   <Image
//                     src={getImageUrl(categories[0]?.images[0])}
//                     fill
//                     className="object-cover"
//                     alt={categories[0].name}
//                   />
//                 </div>
//                 <motion.button
//                   className="bg-white border border-[#766554] px-2 sm:px-4 sm:py-1 md:text-base absolute bottom-[0px] lg:bottom-[10px] lg:right-[-35px] xl:right-[-45px] tracking-widest left-0 lg:left-auto"
//                   whileHover="hover"
//                   variants={buttonHover}
//                 >
//                   <span className="text-md md:text-[21px] font-extralight">{categories[0].name}</span>
//                 </motion.button>
//               </Link>
//             </motion.div>
//           )}

//           {categories?.length > 1 && (
//             <motion.div
//               className="w-full relative md:flex lg:justify-end"
//               initial="offscreen"
//               whileInView="onscreen"
//               variants={slideIn}
//             >
//               <Link href="/stool" className="text-end">
//                 <div className="w-full md:w-[350px] md:h-[350px] lg:w-[300px] lg:h-[300px] xl:w-[320px] xl:h-[320px] aspect-[4/3] relative">
//                   <Image
//                     src={getImageUrl(categories[1]?.images[0])}
//                     fill
//                     className="object-cover"
//                     alt={categories[1].name}
//                   />
//                 </div>
//                 <motion.button
//                   className="bg-white border border-[#766554] px-2 sm:px-4 sm:py-1 absolute bottom-0 lg:bottom-[10px] left-0 lg:left-[15px] xl:left-[10px] tracking-widest"
//                   whileHover="hover"
//                   variants={buttonHover}
//                 >
//                   <span className="text-md md:text-[21px] font-extralight">{categories[1].name}</span>
//                 </motion.button>
//               </Link>
//             </motion.div>
//           )}
//         </div>

//         <div className="w-full block md:hidden relative lg:flex justify-center items-center lg:w-2/6 mt-6 md:mt-0 mb-5 md:mb-0 md:px-0">
//           {categories?.length > 2 && (
//             <motion.div
//               className="w-full text-center relative mb-4"
//               initial="offscreen"
//               whileInView="onscreen"
//               variants={slideUp}
//             >
//               <Link href="/diningtable" className="flex justify-center">
//                 <div className="w-full xs:w-[50%] lg:w-[300px] lg:h-[300px] xl:w-[350px] xl:h-[350px] aspect-[4/3] lg:aspect-[3/3.5] relative">
//                   <Image
//                     src={getImageUrl(categories[2]?.images[0])}
//                     fill
//                     className="object-cover"
//                     alt={categories[2].name}
//                   />
//                 </div>
//                 <motion.button
//                   className="bg-white border border-[#766554] px-2 sm:px-4 sm:py-1 md:text-base bottom-0 lg:bottom-[-10px] absolute tracking-widest left-0 xs:left-auto"
//                   whileHover="hover"
//                   variants={buttonHover}
//                 >
//                   <span className="text-md md:text-[21px] font-extralight">{categories[2].name}</span>
//                 </motion.button>
//               </Link>
//             </motion.div>
//           )}
//         </div>

//         <div className="w-full md:w-1/2 lg:w-2/6 flex flex-col xs:flex-row md:flex-col gap-6 lg:gap-10 xl:px-10 items-end">
//           {categories?.length > 3 && (
//             <motion.div
//               className="w-full lg:w-auto relative md:flex justify-end"
//               initial="offscreen"
//               whileInView="onscreen"
//               variants={slideInRight}
//             >
//               <Link href="/coffeetable">
//                 <div className="w-full md:w-[350px] md:h-[350px] lg:w-[300px] lg:h-[300px] xl:w-[320px] xl:h-[320px] aspect-[4/3] lg:aspect-[11/10] relative">
//                   <Image
//                     src={getImageUrl(categories[3]?.images[0])}
//                     fill
//                     className="object-cover"
//                     alt={categories[3].name}
//                   />
//                 </div>
//                 <motion.button
//                   className="bg-white border border-[#766554] px-2 sm:px-4 sm:py-1 absolute bottom-[0px] lg:bottom-[10px] lg:left-[-35px] xl:left-[-75px] tracking-widest"
//                   whileHover="hover"
//                   variants={buttonHover}
//                 >
//                   <span className="text-md md:text-[21px] font-extralight">{categories[3].name}</span>
//                 </motion.button>
//               </Link>
//             </motion.div>
//           )}

//           {categories?.length > 4 && (
//             <motion.div
//               className="w-full relative md:flex justify-end lg:justify-start"
//               initial="offscreen"
//               whileInView="onscreen"
//               variants={slideInRight}
//             >
//               <Link href="/diningtableleg">
//                 <div className="xl:mr-8 w-full md:w-[350px] md:h-[350px] lg:w-[300px] lg:h-[300px] xl:w-[320px] xl:h-[320px] aspect-[4/3] relative">
//                   <Image
//                     src={getImageUrl(categories[4]?.images[0])}
//                     fill
//                     className="object-cover"
//                     alt={categories[4].name}
//                   />
//                 </div>
//                 <motion.button
//                   className="bg-white border border-[#766554] px-2 sm:px-4 sm:py-1 absolute bottom-[0px] lg:bottom-[10px] lg:right-[-20px] tracking-widest"
//                   whileHover="hover"
//                   variants={buttonHover}
//                 >
//                   <span className="text-md md:text-[21px] font-extralight">{categories[4].name}</span>
//                 </motion.button>
//               </Link>
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
