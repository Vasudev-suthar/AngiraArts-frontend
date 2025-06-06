"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { postData } from "@/utils/api";
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';

export default function QueryPage() {
    const router = useRouter();
    const [queryItems, setQueryItems] = useState([]);
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load query items from localStorage on component mount
    useEffect(() => {
        const savedQueryItems = JSON.parse(localStorage.getItem('queryItems')) || [];
        // Initialize quantity to 1 if not already set
        const itemsWithQuantity = savedQueryItems.map(item => ({
            ...item,
            quantity: item.quantity || 1
        }));
        setQueryItems(itemsWithQuantity);
    }, []);

    const updateQueryItems = (updatedItems) => {
        setQueryItems(updatedItems);
        localStorage.setItem('queryItems', JSON.stringify(updatedItems));
    };

    const removeFromQuery = (index) => {
        const updatedQueryItems = queryItems.filter((_, i) => i !== index);
        updateQueryItems(updatedQueryItems);
    };

    const updateQuantity = (index, newQuantity) => {
        if (newQuantity < 1) return; // Don't allow quantities less than 1
        
        const updatedQueryItems = [...queryItems];
        updatedQueryItems[index].quantity = newQuantity;
        updateQueryItems(updatedQueryItems);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prev => ({ ...prev, [name]: value }));
    };

    const sendQuery = async (e) => {
        e.preventDefault();
        
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email);
        
        if (!isValidEmail) {
            toast.error("Please enter a valid email address.");
            return;
        }
        
        setIsSubmitting(true);
        await postData("/api/query", {
            items: queryItems,
            user: userDetails
        }).then((res) => {
            if (res.error !== true) {
                // Clear query after successful submission
                setQueryItems([]);
                localStorage.removeItem('queryItems');

                toast.success(res.msg || "Your query has been sent successfully!");
                setTimeout(() => {
                    router.push("/");
                }, 1500);
            } else {
                toast.error(res.msg || "There was an error sending your query. Please try again.");
            }
        }).catch((error) => {
            console.error('Error sending query:', error);
            toast.error("There was an error sending your query. Please try again.");
        }).finally(() => {
            setIsSubmitting(false);
        });
    };

    if (queryItems.length === 0) {
        return (
            <div className="min-h-screen px-2 flex items-center justify-center bg-gray-50">
                <Toaster position="bottom-center" reverseOrder={false} toastOptions={{ style: { background: '#6c4722', color: '#fff', }, }} />
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <h1 className="text-lg sm:text-2xl font-bold text-[#8F7C6D] mb-4">Your Query is Empty</h1>
                    <p className="mb-6 text-gray-600 text-sm sm:text-lg">You haven't added any products to your query yet.</p>
                    <button
                        onClick={() => router.push('/')}
                        className="px-4 xs:px-6 py-2 text-sm sm:text-base bg-[#8F7C6D] text-white rounded-md hover:bg-[#6E5D4F] transition-colors"
                    >
                        Add Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
                <Toaster position="bottom-center" reverseOrder={false} toastOptions={{ style: { background: '#6c4722', color: '#fff', }, }} />
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-6 sm:mb-12">
                        <h1 className="text-lg sm:text-3xl font-bold text-[#8F7C6D]">Your Product Query List</h1>
                        <p className="mt-2 text-gray-600 text-sm sm:text-lg">
                            Review your selected items and provide your contact information
                        </p>
                    </div>

                    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6 sm:mb-8">
                        <div className="px-3 py-3 sm:py-5 sm:px-6 border-b border-gray-200">
                            <h3 className="text-sm sm:text-lg leading-6 font-medium text-gray-900">
                                Selected Items ({queryItems.length})
                            </h3>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {queryItems.map((item, index) => (
                                <div key={index} className="flex justify-between items-center p-2 sm:p-4 space-x-2">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-8 xs:h-10 sm:h-20 w-12 xs:w-16 sm:w-28 relative">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                layout="fill"
                                                objectFit="contain"
                                            />
                                        </div>
                                        <div className="ml-2 sm:ml-4">
                                            <h4 className="text-xs xs:text-sm sm:text-lg font-medium text-gray-900">{item.name}</h4>
                                            <p className="text-xs sm:text-sm text-gray-500">Code : {item.code}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 sm:space-x-4">
                                        <div className="flex items-center border border-gray-300 rounded-md">
                                            <button
                                                onClick={() => updateQuantity(index, item.quantity - 1)}
                                                className="px-1 xs:px-2 sm:px-3 sm:py-1 text-gray-600 hover:bg-gray-100"
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="px-1 xs:px-2 sm:px-3 sm:py-1 text-center text-[10px] xs:text-xs sm:text-base sm:min-w-[2rem]">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(index, item.quantity + 1)}
                                                className="px-1 xs:px-2 sm:px-3 sm:py-1 text-gray-600 hover:bg-gray-100"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromQuery(index)}
                                            className="text-red-600 hover:text-red-800 text-[10px] xs:text-xs sm:text-sm font-medium"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-3 py-3 sm:py-5 sm:px-6 border-b border-gray-200">
                            <h3 className="text-sm sm:text-lg leading-6 font-medium text-gray-900">
                                Contact Information
                            </h3>
                        </div>
                        <form onSubmit={sendQuery} className="px-4 py-5 sm:p-6">
                            <div className="grid grid-cols-1 gap-y-4 sm:gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={userDetails.name}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 sm:py-2 px-3 focus:outline-none focus:ring-[#8F7C6D] focus:border-[#8F7C6D] text-xs sm:text-sm"
                                    />
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={userDetails.email}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 sm:py-2 px-3 focus:outline-none focus:ring-[#8F7C6D] focus:border-[#8F7C6D] text-xs sm:text-sm"
                                    />
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        value={userDetails.phone}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 sm:py-2 px-3 focus:outline-none focus:ring-[#8F7C6D] focus:border-[#8F7C6D] text-xs sm:text-sm"
                                    />
                                </div>

                                <div className="sm:col-span-6">
                                    <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700">
                                        Additional Message
                                    </label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows={4}
                                        value={userDetails.message}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 sm:py-2 px-3 focus:outline-none focus:ring-[#8F7C6D] focus:border-[#8F7C6D] text-xs sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 sm:mt-8 flex justify-between sm:justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => router.push('/')}
                                    className="px-3 sm:px-4 py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8F7C6D]"
                                >
                                    Back To Home
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4 sm:px-6 py-2 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-[#8F7C6D] hover:bg-[#6E5D4F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8F7C6D] disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Query'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

// "use client"
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { postData } from "@/utils/api";
// import toast, { Toaster } from 'react-hot-toast';
// import Image from 'next/image';

// export default function QueryPage() {
//     const router = useRouter();
//     const [queryItems, setQueryItems] = useState([]);
//     const [userDetails, setUserDetails] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         message: ''
//     });
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     // Load query items from localStorage on component mount
//     useEffect(() => {
//         const savedQueryItems = JSON.parse(localStorage.getItem('queryItems')) || [];
//         setQueryItems(savedQueryItems);
//     }, []);

//     const removeFromQuery = (index) => {
//         const updatedQueryItems = queryItems.filter((_, i) => i !== index);
//         setQueryItems(updatedQueryItems);
//         localStorage.setItem('queryItems', JSON.stringify(updatedQueryItems));
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setUserDetails(prev => ({ ...prev, [name]: value }));
//     };

//     const sendQuery = async (e) => {
//         e.preventDefault();
        
//         const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email);
        
//         if (!isValidEmail) {
//             toast.error("Please enter a valid email address.");
//             return;
//         }
        
//         setIsSubmitting(true);
//         await postData("/api/query", {
//             items: queryItems,
//             user: userDetails
//         }).then((res) => {
//             if (res.error !== true) {
//                 // Clear query after successful submission
//                 setQueryItems([]);
//                 localStorage.removeItem('queryItems');

//                 toast.success(res.msg || "Your query has been sent successfully!");
//                 console.log(res.msg)
//                 setTimeout(() => {
//                     router.push("/");
//                 }, 1500);
//             } else {
//                 toast.error(res.msg || "There was an error sending your query. Please try again.");
//             }
//         }).catch((error) => {
//             console.error('Error sending query:', error);
//             toast.error("There was an error sending your query. Please try again.");
//         }).finally(() => {
//             setIsSubmitting(false);
//         });
//     };

//     if (queryItems.length === 0) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-50">
//                 <Toaster position="bottom-center" reverseOrder={false} toastOptions={{ style: { background: '#6c4722', color: '#fff', }, }} />
//                 <div className="text-center p-8 bg-white rounded-lg shadow-md">
//                     <h1 className="text-2xl font-bold text-[#8F7C6D] mb-4">Your Query is Empty</h1>
//                     <p className="mb-6">You haven't added any products to your query yet.</p>
//                     <button
//                         onClick={() => router.push('/')}
//                         className="px-6 py-2 bg-[#8F7C6D] text-white rounded-md hover:bg-[#6E5D4F] transition-colors"
//                     >
//                         Add Products
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <>
//             <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//                 <Toaster position="bottom-center" reverseOrder={false} toastOptions={{ style: { background: '#6c4722', color: '#fff', }, }} />
//                 <div className="max-w-4xl mx-auto">
//                     <div className="text-center mb-12">
//                         <h1 className="text-3xl font-bold text-[#8F7C6D]">Your Product Query List</h1>
//                         <p className="mt-2 text-gray-600">
//                             Review your selected items and provide your contact information
//                         </p>
//                     </div>

//                     <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
//                         <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
//                             <h3 className="text-lg leading-6 font-medium text-gray-900">
//                                 Selected Items ({queryItems.length})
//                             </h3>
//                         </div>
//                         <div className="divide-y divide-gray-200">
//                             {queryItems.map((item, index) => (
//                                 <div key={index} className="flex justify-between items-center p-2 sm:p-4">
//                                     <div className="flex items-center">
//                                         <div className="flex-shrink-0 h-20 w-28 relative">
//                                             <Image
//                                                 src={item.image}
//                                                 alt={item.name}
//                                                 layout="fill"
//                                                 objectFit="contain"
//                                             />
//                                         </div>
//                                         <div className="ml-4">
//                                             <h4 className="text-lg font-medium text-gray-900">{item.name}</h4>
//                                             <p className="text-sm text-gray-500">Code: {item.code}</p>
//                                         </div>
//                                     </div>
//                                     <button
//                                         onClick={() => removeFromQuery(index)}
//                                         className="text-red-600 hover:text-red-800 text-sm font-medium"
//                                     >
//                                         Remove
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//                         <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
//                             <h3 className="text-lg leading-6 font-medium text-gray-900">
//                                 Contact Information
//                             </h3>
//                         </div>
//                         <form onSubmit={sendQuery} className="px-4 py-5 sm:p-6">
//                             <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
//                                 <div className="sm:col-span-3">
//                                     <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                                         Name <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="name"
//                                         id="name"
//                                         value={userDetails.name}
//                                         onChange={handleChange}
//                                         required
//                                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8F7C6D] focus:border-[#8F7C6D] sm:text-sm"
//                                     />
//                                 </div>

//                                 <div className="sm:col-span-3">
//                                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                                         Email <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="email"
//                                         name="email"
//                                         id="email"
//                                         value={userDetails.email}
//                                         onChange={handleChange}
//                                         required
//                                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8F7C6D] focus:border-[#8F7C6D] sm:text-sm"
//                                     />
//                                 </div>

//                                 <div className="sm:col-span-3">
//                                     <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//                                         Phone Number
//                                     </label>
//                                     <input
//                                         type="tel"
//                                         name="phone"
//                                         id="phone"
//                                         value={userDetails.phone}
//                                         onChange={handleChange}
//                                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8F7C6D] focus:border-[#8F7C6D] sm:text-sm"
//                                     />
//                                 </div>

//                                 <div className="sm:col-span-6">
//                                     <label htmlFor="message" className="block text-sm font-medium text-gray-700">
//                                         Additional Message
//                                     </label>
//                                     <textarea
//                                         name="message"
//                                         id="message"
//                                         rows={4}
//                                         value={userDetails.message}
//                                         onChange={handleChange}
//                                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8F7C6D] focus:border-[#8F7C6D] sm:text-sm"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="mt-8 flex justify-end space-x-3">
//                                 <button
//                                     type="button"
//                                     onClick={() => router.push('/')}
//                                     className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8F7C6D]"
//                                 >
//                                     Back To Home
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     disabled={isSubmitting}
//                                     className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8F7C6D] hover:bg-[#6E5D4F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8F7C6D] disabled:opacity-70 disabled:cursor-not-allowed"
//                                 >
//                                     {isSubmitting ? 'Sending...' : 'Send Query'}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }