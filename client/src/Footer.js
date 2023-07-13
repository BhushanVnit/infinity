import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-center md:justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-3xl font-bold text-white mb-2">
            <span className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              I
            </span>
            <span className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
              n
            </span>
            <span className="inline-block bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
              f
            </span>
            <span className="inline-block bg-gradient-to-r from-green-500 to-yellow-500 text-transparent bg-clip-text">
              i
            </span>
            <span className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text">
              n
            </span>
            <span className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
              i
            </span>
            <span className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-transparent bg-clip-text">
              t
            </span>
            <span className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              y
            </span>
          </h2>
          <p className="text-gray-400 text-sm">
            A chat app for seamless communication with end-to-end encryption
          </p>
        </div>
        <div className="flex items-center">
          <a
            href="https://github.com/BhushanVnit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white mx-2"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/bhushan-bahale/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white mx-2"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/bhushan_bahale/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white mx-2"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
