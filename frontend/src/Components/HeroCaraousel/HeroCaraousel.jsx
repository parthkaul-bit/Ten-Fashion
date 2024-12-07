import { Carousel } from "flowbite-react";
import { useState } from "react";

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      src: "./herosliderImages/img1.png",
      alt: "Stylish woman in a black dress",
      text: "Stylish Woman in Black",
    },
    {
      src: "./herosliderImages/img2.png",
      alt: "Fashionable outfit with sunglasses",
      text: "Fashionable Outfit",
    },
    {
      src: "./herosliderImages/img3.png",
      alt: "Fashionable outfit with sunglasses",
      text: "Fashionable Outfit",
    },
    // {
    //   src: "./herosliderImages/pic4.jpg",
    //   alt: "Men's casual wear with a hat",
    //   text: "Casual Men's Wear",
    // },
    // {
    //   src: "./herosliderImages/pic5.jpg",
    //   alt: "Elegant clothing showcase",
    //   text: "Elegant Showcase",
    // },
    // {
    //   src: "./herosliderImages/pic6.jpg",
    //   alt: "Modern fashion accessories",
    //   text: "Modern Accessories",
    // },
    // {
    //   src: "./herosliderImages/pic7.jpg",
    //   alt: "Modern fashion accessories",
    //   text: "Chic Accessories",
    // },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative">
      <Carousel
        style={{ height: "100%", width: "100%" }}
        slide={true}
        className="transition-all duration-700 ease-in-out mx-auto"
        activeIndex={currentIndex}
        onSlideChange={setCurrentIndex}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="relative brightness-105"
            style={{ height: "100%", width: "100%" }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-[100%] h-[100%] object-cover transition-opacity duration-1000"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
