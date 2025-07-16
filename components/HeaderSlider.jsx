import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: " Elegant Habesha Kemis with Black & Gold Cross Embroidery ",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.page1,
    },
    {
      id: 2,
      title: "Ethiopian Traditional Dress defined by its exquisite Black & Gold Cross Embroidery. ",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: assets.page2,
    },
    {
      id: 3,
      title: "Perfect for Ethiopian weddings, church ceremonies, and cultural celebrations.",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.page3,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="py-8  min-w-full"
          >
            <div className="flex flex-col-reverse md:flex-row items-center justify-between mx-auto py-8 w-full max-w-6xl rounded-xl md:px-14 px-5 bg-[#E6E9F2]">
              <div className="md:pl-8 mt-10 md:mt-0">
                <p className="md:text-base text-orange-600 pb-1">{slide.offer}</p>
                <h1 className="max-w-md md:text-[30px] md:leading-[48px] text-2xl font-semibold">
                  {slide.title}
                </h1>
                <div className="flex items-center mt-4 md:mt-6 ">
                  <button className="md:px-10 px-7 md:py-2.5 py-2 bg-orange-600 rounded-full text-white font-medium">
                    {slide.buttonText1}
                  </button>
                  <button className="group flex items-center gap-2 px-6 py-2.5 font-medium">
                    {slide.buttonText2}
                    <Image className="group-hover:translate-x-1 transition" src={assets.arrow_icon} alt="arrow_icon" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  className="w-[250px] md:w-[300px] rounded-lg"
                  src={slide.imgSrc}
                  alt={`Slide ${index + 1}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${currentSlide === index ? "bg-orange-600" : "bg-gray-500/30"
              }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
