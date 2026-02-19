"use client";
import { convertToSlug } from "@constants";
import Picture from "@src/components/picture/Picture";
import { FormatMoney2 } from "@src/components/Reusables/FormatMoney";
import { WooCommerce } from "@src/components/lib/woocommerce";
import GlobalLoader from "@src/components/modal/GlobalLoader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { useCart } from "react-use-cart";

const SortedProducts = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [latestProducts, setLatestProducts] = useState<ProductType[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { addItem, getItem, removeItem } = useCart();

  // Fetch latest products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await WooCommerce.get(
          "products?orderby=date&per_page=6&order=desc",
        );
        if (res?.data) setLatestProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {/* ─── Latest Products Section — Dark Theme ─── */}
      <div className="w-full bg-[#0D0D1A] py-10 sm:py-16">
        <div className="max-w-[1256px] mx-auto px-4">
          {/* Section Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-8 tracking-tight">
            Latest Products
          </h2>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {isLoading ?
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-[#1C1C2E] rounded-xl overflow-hidden">
                  <div className="aspect-square bg-gray-700" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-600 rounded w-3/4" />
                    <div className="h-4 bg-gray-600 rounded w-1/2" />
                    <div className="h-3 bg-gray-600 rounded w-1/3" />
                    <div className="h-9 bg-gray-600 rounded w-full mt-2" />
                  </div>
                </div>
              ))
            : latestProducts.slice(0, 6).map((product: ProductType) => {
                const price = parseInt(product?.price || "0");
                const slugDesc = convertToSlug(product?.name);
                const ID = product?.id?.toString();
                const cartItem = getItem(ID);
                const rating =
                  product?.average_rating ?
                    parseFloat(product.average_rating)
                  : 4;
                const fullStars = Math.floor(rating);
                const halfStar = rating % 1 >= 0.5;
                const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

                return (
                  <div
                    key={product.id}
                    className="group flex flex-col bg-[#1C1C2E] rounded-xl overflow-hidden hover:ring-2 hover:ring-[#7C3AED]/50 transition-all">
                    {/* Image Container */}
                    <Link
                      href={`/home-item/product/${slugDesc}-${product.id}`}
                      className="relative aspect-square bg-white flex items-center justify-center p-4">
                      <Picture
                        src={product?.images?.[0]?.src}
                        alt={product?.name}
                        className="object-contain w-[85%] h-[85%] group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="p-4 flex flex-col gap-1.5">
                      <Link
                        href={`/home-item/product/${slugDesc}-${product.id}`}
                        className="text-sm font-medium text-gray-200 line-clamp-1 leading-snug hover:text-white transition-colors"
                        dangerouslySetInnerHTML={{ __html: product?.name }}
                      />
                      <span className="text-[#E2A400] font-bold text-sm">
                        {price ?
                          <FormatMoney2 value={price} />
                        : "N/A"}
                      </span>
                      {/* Star Rating */}
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {Array.from({ length: fullStars }).map((_, i) => (
                          <span
                            key={`full-${i}`}
                            className="text-yellow-400 text-sm">
                            ★
                          </span>
                        ))}
                        {halfStar && (
                          <span className="text-yellow-400 text-sm">★</span>
                        )}
                        {Array.from({ length: emptyStars }).map((_, i) => (
                          <span
                            key={`empty-${i}`}
                            className="text-gray-500 text-sm">
                            ☆
                          </span>
                        ))}
                      </div>

                      {/* Add / Remove Cart Button */}
                      {price > 0 && (
                        <button
                          onClick={() =>
                            cartItem ?
                              removeItem(ID)
                            : addItem({
                                id: ID,
                                name: product?.name,
                                price,
                                quantity: 1,
                                image: product?.images?.[0]?.src,
                              })
                          }
                          className={`w-full text-xs sm:text-sm font-bold py-2.5 rounded transition-colors cursor-pointer mt-1 ${
                            cartItem ?
                              "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                            : "bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
                          }`}>
                          {cartItem ? "Remove from cart" : "Add to cart"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            }
          </div>

          {/* See More Button */}
          <div className="flex justify-center mt-8">
            <Link
              href="/category"
              className="border border-[#7C3AED] text-white text-sm font-medium px-8 py-2.5 rounded-md hover:bg-[#7C3AED] transition-colors">
              See more
            </Link>
          </div>
        </div>
      </div>

      <GlobalLoader isPending={isPending} />
    </>
  );
};

export default SortedProducts;
