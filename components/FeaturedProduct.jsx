import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";


const FeaturedProduct = () => {

  const { products, router } = useAppContext()
  const couples = products.filter((product) =>product.name.toLowerCase().includes("couple")
  ); 
  
  return (
    <div className="mt-14">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-medium">Featured Products</p>
        <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {couples.slice(0, 3).map((product) => (
          <div key={product._id} className="relative group">
            <div className="aspect-[3/4] relative w-full overflow-hidden rounded-sm">
              <Image
                src={product.image[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:brightness-75 transition duration-300"
              />
            </div>

            <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
              <p className="  xl:block lg:hidden  font-medium text-base md:text-xl lg:text-xl">{product.name}</p>

              <button onClick={() => { router.push('/product/' + product._id) }} className="flex items-center gap-1.5 bg-orange-600 px-4 py-2 rounded">
                Buy now <Image className="h-3 w-3" src={assets.redirect_icon} alt="Redirect Icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
