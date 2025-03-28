import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-gray-800 text-white py-4">
  <ul className="flex justify-center space-x-8">
    <li>
      <Link href="/" className="hover:text-blue-400 transition duration-300">
        Home
      </Link>
    </li>
    <li>
      <Link href="/about" className="hover:text-blue-400 transition duration-300">
        About
      </Link>
    </li>
    <li>
      <Link href="/blog" className="hover:text-blue-400 transition duration-300">
        Blog
      </Link>
    </li>
  </ul>
</div>

  );
};

export default Navbar;
