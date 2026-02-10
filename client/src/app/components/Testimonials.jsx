"use client";

import React, { useState, useEffect, useRef } from "react";
import testimonialStyles from "./Testimonials.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  const query = qs.stringify({
    populate: {
      Testimonials: {
        populate: {
          Testimonials: {
            populate: ["image"],
          },
        },
      },
    },
  });

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`/api/home-page?${query}`);
        const data = await response.json();
        console.log(data.data.Testimonials);
        setTestimonials(data.data.Testimonials);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTestimonials();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  return (
    <section className={testimonialStyles.testimonialSection}>
      <Container className={testimonialStyles.testimonialContainer}>
        <Row className="gx-5">
          <Col lg={5} className={testimonialStyles.textCol}>
            <div>
              <p className={testimonialStyles.blockTitle}>
                {testimonials.blockTitle}
              </p>
              <h2 className={testimonialStyles.title}>{testimonials.title}</h2>
              <p className={testimonialStyles.description}>
                {testimonials.description}
              </p>
            </div>
          </Col>
          <Col lg={7} className="ps-lg-5">
            <Slider
              ref={(slider) => {
                sliderRef = slider;
              }}
              {...settings}
            >
              {testimonials.Testimonials &&
                testimonials.Testimonials.map((testimonial) => (
                  <div key={testimonial.id}>
                    <p className={testimonialStyles.quoteText}>
                      {testimonial.quote}
                    </p>
                    <div className={testimonialStyles.authorContainer}>
                      <div className="d-flex align-items-center gap-3">
                        <Image
                          src={getStrapiMedia(testimonial.image?.url)}
                          alt={testimonial.authorName}
                          width={testimonial.image?.width}
                          height={testimonial.image?.height}
                        />
                        <div>
                          <h4 className={testimonialStyles.authorTitle}>
                            {testimonial.authorName}
                          </h4>
                          <p className={testimonialStyles.authorLocation}>
                            {testimonial.authorLocation}
                          </p>
                        </div>
                      </div>
                      <div>
                        <button
                          className={testimonialStyles.sliderleftbtn}
                          onClick={previous}
                        >
                          <svg
                            width="23"
                            height="15"
                            viewBox="0 0 23 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21.1289 8.36377C21.6812 8.36377 22.1289 7.91605 22.1289 7.36377C22.1289 6.81148 21.6812 6.36377 21.1289 6.36377L21.1289 8.36377ZM0.292767 6.65666C-0.0977573 7.04719 -0.0977574 7.68035 0.292767 8.07087L6.65673 14.4348C7.04725 14.8254 7.68042 14.8254 8.07094 14.4348C8.46147 14.0443 8.46147 13.4111 8.07094 13.0206L2.41409 7.36377L8.07094 1.70691C8.46147 1.31639 8.46147 0.683225 8.07094 0.292701C7.68042 -0.0978238 7.04725 -0.0978239 6.65673 0.2927L0.292767 6.65666ZM21.1289 6.36377L0.999874 6.36377L0.999874 8.36377L21.1289 8.36377L21.1289 6.36377Z"
                              fill="#232536"
                            />
                          </svg>
                        </button>
                        <button
                          className={testimonialStyles.sliderrightbtn}
                          onClick={next}
                        >
                          <svg
                            width="23"
                            height="15"
                            viewBox="0 0 28 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 6.36377C0.447715 6.36377 0 6.81148 0 7.36377C0 7.91605 0.447715 8.36377 1 8.36377V6.36377ZM27.7071 8.07088C28.0976 7.68035 28.0976 7.04719 27.7071 6.65666L21.3431 0.292702C20.9526 -0.0978227 20.3195 -0.0978227 19.9289 0.292702C19.5384 0.683226 19.5384 1.31639 19.9289 1.70692L25.5858 7.36377L19.9289 13.0206C19.5384 13.4111 19.5384 14.0443 19.9289 14.4348C20.3195 14.8254 20.9526 14.8254 21.3431 14.4348L27.7071 8.07088ZM1 8.36377H27V6.36377H1V8.36377Z"
                              fill="#232536"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </Slider>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;
