"use client"

import { useState } from "react";
import { RiArrowDownWideFill } from "react-icons/ri"; // Importing an icon for the down arrow
import { motion } from "framer-motion";
import { desVariants, titleVariants, togVariants, slideIn } from "@/utils/animation";

export default function AboutUsSection() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="bg-[#F4F3F0] border border-[#F4F3F0] pt-4 pb-16 font-raleway">
            <div className="flex justify-center items-center bg-white mt-5 w-28 sm:w-[280px] lg:w-[362px] h-10 sm:h-[75px]">
                <motion.p
                    className="text-lg sm:text-[30px] lg:text-[40px] font-light tracking-wider sm:tracking-[7.2px] font-light"
                    initial="offscreen"
                    whileInView="onscreen"
                    variants={slideIn}
                >
                    About Us
                </motion.p>
            </div>
            <div className="relative h-auto sm:pb-4 flex">
                <div className="w-full bg-[#F4F3F0]">
                    <div className="inset-0 flex flex-wrap sm:mt-6">
                        <div className="w-full px-8 sm:px-16 font-normal">
                            <div className="my-4 sm:my-8">
                                <div className="capitalize">
                                    <motion.p
                                        className="text-xs sm:text-[18px] lg:text-[20px] leading-6 sm:leading-7 tracking-wider"
                                        initial="offscreen"
                                        whileInView="onscreen"
                                        variants={titleVariants}
                                    >
                                        Established in <span className="font-semibold">2005, Angira Art Exports</span> is a globally
                                        recognized manufacturer and exporter of solid wood and iron furniture. We take pride in serving diverse
                                        markets across the world, catering to various levels of demand. Our extensive product range includes
                                        exquisite items such as <span className="font-semibold">Dining Tables, Chairs, Bedroom Sets, Bookshelves, Cabinets, Sideboards,
                                            Drawer Chests, Stool Sets, Wardrobes, Dressers, Live Edge Furniture</span>, and more.
                                    </motion.p>
                                    {/* Conditionally show the rest of the text based on screen size */}
                                    <div className={`text-xs sm:text-[18px] lg:text-[20px] leading-6 sm:leading-8 tracking-wider mt-1 sm:mt-5 ${isExpanded ? '' : 'hidden sm:block'}`}>
                                        <motion.p
                                            initial="offscreen"
                                            whileInView="onscreen"
                                            variants={togVariants}
                                        >
                                            Over the years, Angira Art Exports has experienced remarkable growth, enabling us to offer contemporary-style furniture sales worldwide. Our company is equipped with state-of-the-art facilities, including advanced seasoning and treatment plants, cutting-edge woodworking machinery, and cutting-edge painting spraying systems. By incorporating advanced woodwork processing technology, we consistently create products with exquisite appearances. Whether you require large professional orders or customized designs, our capabilities ensure your needs are met with precision.
                                        </motion.p>
                                        <motion.p
                                            className="mt-1 sm:mt-5"
                                            initial="offscreen"
                                            whileInView="onscreen"
                                            variants={togVariants}
                                        >
                                            We are proud to be exporting our products to esteemed destinations such as the <span className="font-semibold">USA, UK, Middle
                                                East, Greece, Spain, Italy, Germany</span>, and many others. At Angira Art Exports, we strive to be your ultimate solution for furniture needs,
                                            providing top-notch quality, value, and exceptional service.
                                        </motion.p>
                                        <motion.p
                                            className="mt-1 sm:mt-5"
                                            initial="offscreen"
                                            whileInView="onscreen"
                                            variants={desVariants}
                                        >
                                            Driven by our commitment to customer satisfaction, we continuously innovate and employ cutting-edge
                                            manufacturing techniques. Our innovative marketing concepts, coupled with our dedication to delivering quality goods, have fueled our growth.
                                            As a result, a stream of satisfied customers propels us forward, enabling us to expand our business and cater to the evolving global demands.
                                        </motion.p>
                                        <motion.p
                                            className="mt-1 sm:mt-5 font-semibold"
                                            initial="offscreen"
                                            whileInView="onscreen"
                                            variants={desVariants}
                                        >
                                            Choose Angira Art Exports as your trusted partner, and let us exceed your expectations in fulfilling your furniture requirements.
                                        </motion.p>
                                    </div>
                                    {/* Read More Toggle for Small Screens */}
                                    <div className="flex justify-center sm:hidden mt-2 text-center">
                                        <button
                                            className="text-[#766554] flex flex-col items-center justify-center"
                                            onClick={toggleExpand}
                                        >
                                            {isExpanded ? 'Show Less' : 'Read More'} <RiArrowDownWideFill className={`transform ${isExpanded ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Second Half - Background Image */}
                <div
                    className="w-1/2 absolute bg-cover bg-center right-0 h-[-webkit-fill-available]"
                    style={{ backgroundImage: "url('/textbg.png')" }}
                ></div>
            </div>
        </div>
    );
}
