"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Import required modules
import { Autoplay, Pagination } from "swiper/modules";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, Tech Startup",
      content:
        "Exceptional work! The design and implementation exceeded our expectations. Highly recommended.",
      avatar: "SJ",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Product Manager, Digital Agency",
      content:
        "Professional, responsive, and delivers on time. A true pleasure to work with.",
      avatar: "MC",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director, E-commerce",
      content:
        "Transformed our vision into reality. The attention to detail and creativity is outstanding.",
      avatar: "ER",
      rating: 5,
    },
    {
      name: "David Park",
      role: "Founder, SaaS Platform",
      content:
        "Best decision we made for our project. Reliable, talented, and a great communicator.",
      avatar: "DP",
      rating: 5,
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-20 px-4 bg-background transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Client Testimonials
          </h2>
          <p className="text-lg text-muted-foreground">
            What my clients say about my work
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          grabCursor={true}
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="!pb-14 testimonial-swiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="h-full">
                <div className="p-6 border border-border rounded-xl bg-card shadow-sm hover:shadow-lg transition-all duration-300 h-full min-h-[280px] flex flex-col justify-between">
                  <div className="flex-grow">
                    <div className="flex gap-1 mb-4 text-yellow-500">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-lg">
                          ★
                        </span>
                      ))}
                    </div>

                    <p className="text-foreground mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-border mt-auto">
                    <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
