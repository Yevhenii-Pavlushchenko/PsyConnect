"use client";
import css from "./CamperGallery.module.css";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface GalleryProps {
  gallery: { original: string; thumb: string }[];
  name: string;
}

export default function CamperGallery({ gallery, name }: GalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className={css.swiperWrapper}>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={css.mainSwiper}
      >
        {gallery.map((img, index) => (
          <SwiperSlide key={index}>
            <Image
              src={img.original}
              alt={name}
              fill
              style={{ objectFit: "cover" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={32}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={css.thumbsSwiper}
      >
        {gallery.map((img, index) => (
          <SwiperSlide key={index}>
            <Image
              src={img.thumb}
              alt="thumb"
              width={135}
              height={145}
              className={css.thumbImg}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
