"use client";

import React, { useState, useEffect } from "react";
import aboutPageBlocksStyles from "./AboutPageBlocks.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";

const AboutPageBlocks = () => {
  const [blocksData, setBlocksData] = useState({});

  const queryParams = {
    populate: {
      teamCreativeBlock: {
        populate: {
          image: true,
        },
      },
      whyStartedBlogBlock: {
        populate: {
          image: true,
        },
      },
    },
  };

  const queryString = qs.stringify(queryParams, { encodeValuesOnly: true });

  useEffect(() => {
    const fetchBlocksData = async () => {
      const apiUrl = `http://localhost:1337/api/about-page?${queryString}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data?.data);
      setBlocksData(data?.data);
    };
    fetchBlocksData();
  }, []);

  return (
    <section className={aboutPageBlocksStyles.container}>
      <Container>
        <Row className={`${aboutPageBlocksStyles.teamRow} align-items-center`}>
          <Col lg={6} className="order-lg-1 order-2">
            <div>
              <h2 className={aboutPageBlocksStyles.blockHeading}>
                {blocksData?.teamCreativeBlock?.heading}
              </h2>
              <h4 className={aboutPageBlocksStyles.blockSubheading}>
                {blocksData?.teamCreativeBlock?.subheading}
              </h4>
              <p className={aboutPageBlocksStyles.blockText}>
                {blocksData?.teamCreativeBlock?.description}
              </p>
            </div>
          </Col>
          <Col lg={6} className="order-lg-2 order-1 mb-lg-0 mb-3">
            <div>
              {blocksData?.teamCreativeBlock?.image && (
                <Image
                  src={`http://localhost:1337${blocksData?.teamCreativeBlock?.image?.url}`}
                  width={blocksData?.teamCreativeBlock?.image?.width}
                  height={blocksData?.teamCreativeBlock?.image?.height}
                  alt={blocksData?.teamCreativeBlock?.image?.name}
                  className={aboutPageBlocksStyles.blockImage}
                />
              )}
            </div>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col lg={6} className="mb-lg-0 mb-3">
            <div>
              {blocksData?.whyStartedBlogBlock?.image && (
                <Image
                  src={`http://localhost:1337${
                    blocksData?.whyStartedBlogBlock?.image?.url
                  }`}
                  width={blocksData?.whyStartedBlogBlock?.image?.width}
                  height={blocksData?.whyStartedBlogBlock?.image?.height}
                  alt={blocksData?.whyStartedBlogBlock?.image?.name}
                  className={aboutPageBlocksStyles.blockImage}
                />
              )}
            </div>
          </Col>
          <Col lg={6}>
            <div>
              <h2 className={aboutPageBlocksStyles.blockHeading}>
                {blocksData?.whyStartedBlogBlock?.heading}
              </h2>
              <h4 className={aboutPageBlocksStyles.blockSubheading}>
                {blocksData?.whyStartedBlogBlock?.subheading}
              </h4>
              <p className={aboutPageBlocksStyles.blockText}>
                {blocksData?.whyStartedBlogBlock?.description}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutPageBlocks;
