"use client";

import React, { useState, useEffect } from "react";
import headerStyles from "./Header.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Image from "next/image";

const Header = () => {
  const [headerData, setheaderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const globalSettingQuery = qs.stringify({
    populate: {
      header: {
        populate: {
          logo: {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
            },
          },
          navigation: true,
          cta: true,
        },
      },
    },
  });

  async function fetchData() {
    try {
      const response = await fetch(
        `${process.env.STRAPI_CLOUD_URL || process.env.STRAPI_LOCAL_URL}/api/global?${globalSettingQuery}`
      );
      const data = await response.json();
      console.log(data);
      setheaderData(data.data);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!headerData) return <div>No data found</div>;

  return (
    <section className={`${headerStyles.headerBg} fixed-top`}>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/">
            {headerData?.header?.logo?.image && (
              <Image
                src={`${process.env.STRAPI_CLOUD_URL || process.env.STRAPI_LOCAL_URL}${headerData.header.logo.image.url}`}
                alt={headerData.header.logo.image.alternativeText || "Logo"}
                width={140}
                height={28}
              />
            )}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {headerData?.header?.navigation?.map((navItem) => (
                <Nav.Link
                  className={headerStyles.navlinks}
                  key={navItem.id}
                  href={navItem.href}
                >
                  {navItem.text}
                </Nav.Link>
              ))}
            </Nav>
            <Button variant="outline-light" className={headerStyles.headerBtn}>
              {headerData?.header?.cta[0]?.text}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </section>
  );
};

export default Header;
