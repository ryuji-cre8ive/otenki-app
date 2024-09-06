"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white-100 text-black shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-blue-500">お天気</span> OPPAI
            </Link>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="hover:text-gray-300">
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-300">
                  概要
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gray-300">
                  サービス
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-300">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </nav>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white flex items-center justify-center"
          >
            <nav>
              <ul className="flex flex-col space-y-4 text-2xl">
                <li>
                  <Link
                    href="/"
                    className="hover:text-gray-300"
                    onClick={toggleMenu}
                  >
                    ホーム
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-gray-300"
                    onClick={toggleMenu}
                  >
                    概要
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="hover:text-gray-300"
                    onClick={toggleMenu}
                  >
                    サービス
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-gray-300"
                    onClick={toggleMenu}
                  >
                    お問い合わせ
                  </Link>
                </li>
              </ul>
            </nav>
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 text-3xl"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
