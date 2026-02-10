"use client";

import React, { useState, useEffect } from "react";
import featuredStyles from "./FeaturedSection.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

const FeaturedSection = () => {
  const [featuredData, setFeaturedData] = useState(null);

  useEffect(() => {
    const fetchLogosBlockData = async () => {
      const urlParamsObject = {
        populate: {
          Logos: {
            populate: {
              logoImages: {
                populate: "*",
              },
            },
          },
        },
      };

      const queryString = qs.stringify(urlParamsObject);
      const requestUrl = `/api/home-page?${queryString}`;

      try {
        const response = await fetch(requestUrl);
        const data = await response.json();
        console.log(data.data.Logos);
        setFeaturedData(data.data.Logos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLogosBlockData();
  }, []);

  if (!featuredData) return <div>Loading...</div>;

  return (
    <section className={featuredStyles["featured-section"]}>
      <Container>
        <Row>
          <Col>
            <div className={featuredStyles["featured-in"]}>
              <h2>{featuredData[0].title}</h2>
              <div className={featuredStyles["logos"]}>
                {featuredData[0].logoImages.map((logo, index) => (
                  <Image
                    key={index}
                    src={getStrapiMedia(logo.image.url)}
                    alt={logo.image.alternativeText || `Logo ${index}`}
                    width={logo.image.width}
                    height={logo.image.height}
                  />
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FeaturedSection;
