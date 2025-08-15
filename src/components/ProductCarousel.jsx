import React from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ products }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,      // Number of cards per view
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="my-8">
      <Slider {...settings}>
        {products.map((p, i) => (
          <div key={i} className="px-2">
            <ProductCard product={p} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
