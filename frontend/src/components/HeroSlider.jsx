import { useEffect, useState }
from "react";

import banner1
from "../images/banner1.jpg";

import banner2
from "../images/banner2.jpg";

import banner3
from "../images/banner3.jpg";

const images = [
  banner1,
  banner2,
  banner3
];

const HeroSlider = () => {

  const [current,
    setCurrent] = useState(0);

  useEffect(() => {

    const interval =
      setInterval(() => {

      setCurrent((prev) =>

        prev === images.length - 1
        ? 0
        : prev + 1

      );

    }, 3000);

    return () =>
      clearInterval(interval);

  }, []);

  return (

    <div className="hero-slider">

      <img
        src={images[current]}
        alt=""
        className="hero-image"
      />

    </div>

  );

};

export default HeroSlider;