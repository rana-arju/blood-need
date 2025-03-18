"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Heart } from "lucide-react";
import { OptimizedHeroImage } from "./OptimizedHeroImage";

const slides = [
  {
    id: 4,
    subtitle: "Donate to blood contribute",
    title: "Your Blood Can Bring Smile In Any One Person Face",
    image:
      "https://res.cloudinary.com/db8l1ulfq/image/upload/v1741454406/hm3_1_p7owbi.jpg",
    buttonText: "Get Started",
    buttonLink: "/be-donor",
  },
  {
    id: 1,
    subtitle: "Donate to blood contribute",
    title: "Your Blood Can Bring Smile In Any One Person Face",
    image:
      "https://res.cloudinary.com/db8l1ulfq/image/upload/v1741453211/blood-need-hero-3_ykwpzu.jpg",
    buttonText: "Get Started",
    buttonLink: "/be-donor",
  },
  {
    id: 2,
    subtitle: "Every Drop Counts",
    title: "Be a Hero, Save Lives Through Blood Donation",
    image:
      "https://res.cloudinary.com/db8l1ulfq/image/upload/v1741453211/blood-need-hero2_qjbuqi.jpg",
    buttonText: "Donate Now",
    buttonLink: "/be-donor",
  },
  {
    id: 3,
    subtitle: "Join Our Community",
    title: "Together We Can Make a Difference",
    image:
      "https://res.cloudinary.com/db8l1ulfq/image/upload/v1741453224/blood-need-hero1_cadgpe.jpg",
    buttonText: "Learn More",
    buttonLink: "/be-donor",
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
                <OptimizedHeroImage
                  src={slide.image}
                  alt={title}
                 // width={700}
//height={500}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
              <div className="relative h-full flex items-center justify-center">
                <div className="container mx-auto px-4 text-center text-white">
                  <p
                    className="text-md sm:text-lg md:text-xl mb-4 animate-fade-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    {subtitle}
                  </p>
                  <h1
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 max-w-4xl mx-auto leading-tight animate-fade-up"
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
                    <Link href={slide.buttonLink}>
                      <Heart className="h-5 w-5 mr-2" />
                      {ctaText}
                    </Link>
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
