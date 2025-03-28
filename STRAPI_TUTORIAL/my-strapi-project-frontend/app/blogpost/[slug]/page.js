"use client";
import React from "react";

export default async function Page({ params }) {
    const { slug } = params;
    const url = `http://localhost:1337/api/articles?sort[0]=title:asc&filters[slug][$eq]=${slug}&status=published&locale=en&populate=*`;
    
    const data = await fetch(url);
    const response = await data.json();

    return (
        <div>
            <h1>My Post, {params.slug}</h1>
            <p>{response.data[0]?.title}</p>
            <div>
                {response.data[0]?.blocks
                    .filter((item) => item.__component === "shared.rich-text")
                    .map((item, index) => (
                        <div key={index}>{item.body}</div> // Using <div> instead of MarkdownHTML
                    ))}
            </div>
        </div>
    );
}
