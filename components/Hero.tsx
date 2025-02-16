"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import {  Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
const slides = [
  {
    id: 1,
    subtitle: "Donate to blood contribute",
    title: "Your Blood Can Bring Smile In Any One Person Face",
    image:
      "https://innovativeartisan.com/demo/html/blad-ai/assets/images/hm2.jpg",
    buttonText: "Get Started",
    buttonLink: "/donate",
  },
  {
    id: 2,
    subtitle: "Every Drop Counts",
    title: "Be a Hero, Save Lives Through Blood Donation",
    image:
      "https://innovativeartisan.com/demo/html/blad-ai/assets/images/hm3.jpg",
    buttonText: "Donate Now",
    buttonLink: "/donate",
  },
  {
    id: 3,
    subtitle: "Join Our Community",
    title: "Together We Can Make a Difference",
    image:
      "https://innovativeartisan.com/demo/html/blad-ai/assets/images/hm1.png",
    buttonText: "Learn More",
    buttonLink: "/about",
  },
];
interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
}
export default function Hero({ title, subtitle, ctaText }: HeroProps) {
  return (
    <section className="relative">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        pagination={{ clickable: true }}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-[450px] md:h-[550px]"
        style={
          {
            "--swiper-pagination-color": "#FF0000",
          } as React.CSSProperties
        }
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <div className="absolute inset-0">
                <img
                  src={slide.image || "/placeholder.svg"}
                  alt={title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
              <div className="relative h-full flex items-center justify-center">
                <div className="container mx-auto px-4 text-center text-white">
                  <p
                    className="text-lg md:text-xl mb-4 animate-fade-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    {subtitle}
                  </p>
                  <h1
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 max-w-4xl mx-auto leading-tight animate-fade-up"
                    style={{ animationDelay: "0.4s" }}
                  >
                    {title}
                  </h1>
                  <Button
                    asChild
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white animate-fade-up"
                    style={{ animationDelay: "0.6s" }}
                  >
                    <Link href={slide.buttonLink}>{ctaText}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
