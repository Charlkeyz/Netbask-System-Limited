import React from "react";
import Link from "next/link";
import Picture from "../picture/Picture";
import { offerSaleBg } from "@public/images";

const OfferSaleBanner = () => {
  return (
    <div className="max-w-[1256px] mx-auto px-4 py-10 sm:py-16">
      <div className="relative w-full rounded-2xl bg-offer-sale overflow-hidden min-h-[220px] sm:min-h-[260px]">
        {/* Background Image */}
        <Picture
          src={offerSaleBg}
          alt="Special Offer Sale"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6 py-12 sm:py-16">
          <p className="text-sm sm:text-base text-gray-300 italic tracking-[0.35em] uppercase mb-2">
            Special
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-3 leading-tight">
            OFFER SALE
          </h2>
          <p className="text-sm sm:text-base text-gray-200 mb-6 max-w-md">
            Get upto 25% Discount when you buy more than 2 products
          </p>
          <Link
            href="/category"
            className="inline-block bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-semibold px-10 py-3 rounded-md transition-colors">
            Get access
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OfferSaleBanner;
