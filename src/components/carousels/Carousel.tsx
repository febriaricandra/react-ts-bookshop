import React, { useState, useEffect, ReactNode } from "react";

type CarouselProps = {
  slideInterval?: number; // Interval waktu antar slide
  children: ReactNode; // Gambar atau konten dalam carousel
};

const Carousel: React.FC<CarouselProps> = ({ slideInterval = 5000, children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Konversi children menjadi array (jika children adalah elemen tunggal)
  const slides = React.Children.toArray(children);

  // Otomatis berpindah slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, slideInterval);

    return () => clearInterval(interval); // Cleanup saat komponen unmount
  }, [slideInterval, slides.length]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Container untuk slide */}
      <div
        className="flex transition-transform duration-700"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`, // Pindahkan slide berdasarkan index
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0 w-full">
            {slide}
          </div>
        ))}
      </div>

      {/* Tombol navigasi opsional */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 rounded-full p-2 shadow-md text-white"
        onClick={() =>
          setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
        }
      >
        &lt;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 rounded-full p-2 shadow-md text-white"
        onClick={() =>
          setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
        }
      >
        &gt;
      </button>

      {/* Indikator slide */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
