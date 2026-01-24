"use client";

import React, { useState, useEffect } from "react";
import allpostsStyles from "./AllPosts.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";

const AllPosts = () => {
    const [allPostsData, setAllPostsData] = useState([]);

    const queryObj = {
        populate: {
            posts: {
                populate: {
                    image: true,
                },
            },
        },
    };
    const queryString = qs.stringify(queryObj, { encodeValuesOnly: true });

    useEffect(() => {
        const fetchAllPosts = async () => {
            const apiUrl = `http://localhost:1337/api/categories?${queryString}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log(data?.data);
            setAllPostsData(data?.data);
        };
        fetchAllPosts();
    }, []);

    return (
        <section>
            <Container>
                {allPostsData?.map((category) => (
                    <Row key={category.id}>
                        <Col lg={5}>
                            {category.posts?.map((post) => {
                                if (post.image && post.image.url) {
                                    return (
                                        <div key={post.id}>
                                            <Image
                                                src={`http://localhost:1337${post.image.url}`}
                                                width={post.image.width || 490}
                                                height={post.image.height || 318}
                                                alt={post.image.name || post.title || 'Post Image'}
                                                className="img-fluid"
                                            />
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </Col>
                        <Col lg={7}>
                            <div>
                                <p>{category.name}</p>
                                {category.posts?.map((post) =>
                                    <div key={post.id}>
                                        <h2>{post.title}</h2>
                                        <p>{post.content}</p>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                ))}
            </Container>
        </section>
    );
};

export default AllPosts;
