import { Carousel } from "flowbite-react";

export default function HeroCarousel() {
  console.log("gello");
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        <img
          src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg"
          alt="Stylish woman in a black dress"
        />
        <img
          src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg"
          alt="Fashionable outfit with sunglasses"
        />
        <img
          src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg"
          alt="Men's casual wear with a hat"
        />
        <img
          src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg"
          alt="Elegant clothing showcase"
        />
        <img
          src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg"
          alt="Modern fashion accessories"
        />
      </Carousel>
    </div>
  );
}
