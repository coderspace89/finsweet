"use client";

import React, { useEffect, useState } from "react";
import footerStyles from "./Footer.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    const [footerData, setFooterData] = useState({});

    const queryObj = {
        populate: {
            Footer: {
                populate: {
                    image: true,
                    navigation: true,
                    SocialLinks: {
                        populate: ["icon"],
                    },
                    Signup: true,
                },
            },
        },
    };

    const queryString = qs.stringify(queryObj, { encodeValuesOnly: true });

    async function FooterSection() {
        const apiUrl = `http://localhost:1337/api/global?${queryString}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data?.data?.Footer);
        setFooterData(data?.data?.Footer);
    }

    useEffect(() => {
        FooterSection();
    }, []);

    return (
        <section className={footerStyles.footerSection}>
            <Container className={footerStyles.footerContainer}>
                <Row>
                    <Col>
                        <div className="d-flex justify-content-between">
                            {footerData?.image && (
                                <Image
                                    src={`http://localhost:1337${footerData.image.url}`}
                                    width={footerData.image.width}
                                    height={footerData.image.height}
                                    alt={footerData.logoText}
                                />
                            )}
                            <div className="d-flex">
                                {footerData?.navigation?.map((item, index) => (
                                    <div key={index}>
                                        <Link
                                            className="text-decoration-none text-white me-4"
                                            href={item.href}
                                        >
                                            {item.text}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Footer;
