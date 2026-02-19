"use client";
import React, { useState } from "react";
import Picture from "@src/components/picture/Picture";
import { subscribeBg } from "@public/images";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // TODO: integrate with newsletter API
      alert("Thanks for subscribing!");
      setEmail("");
    }
  };

  return (
    <div className="relative w-full overflow-hidden min-h-[300px] sm:min-h-[340px]">
      {/* Background Image */}
      <Picture
        src={subscribeBg}
        alt="Subscribe background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6 py-14 sm:py-20">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold italic text-white mb-3 tracking-tight">
          Subscribe to our Newsletter
        </h2>
        <p className="text-sm sm:text-base text-gray-300 italic max-w-lg mb-8 leading-relaxed">
          Get updated with tips on how to treat your pets right and latest
          products suitable for your pets
        </p>

        {/* Email Form */}
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col items-center gap-4 w-full max-w-lg">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 bg-transparent border border-[#7C3AED] rounded-md px-5 text-white placeholder-gray-400 text-sm italic outline-none focus:ring-2 focus:ring-[#7C3AED]/50 transition"
            required
          />
          <button
            type="submit"
            className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-semibold px-10 py-3 rounded-md transition-colors cursor-pointer">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
