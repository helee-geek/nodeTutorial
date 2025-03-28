import Link from 'next/link';
import React from 'react'

const data = await fetch('http://localhost:1337/api/articles?populate=*')

const response = await data.json()

console.log(response); 
const Blog = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
  {response.data &&
    response.data.map((article) => {
      return (
        <div
          key={article.id}
          className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200"
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">
            {article.title}
          </h2>
          <p className="text-gray-700">{article.description}</p>
          <p className="text-sm text-gray-500 mt-2">Slug: <Link href={`/blogpost/${article.slug}`}>{article.slug}</Link></p>
          <p className="text-sm text-gray-400">
            Published on: {new Date(article.createdAt).toLocaleDateString()}
          </p>
        </div>
      );
    })}
</div>

  )
}

export default Blog
