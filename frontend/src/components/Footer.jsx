import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} JobPortal Inc. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="/privacy" className="text-sm hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="text-sm hover:underline">
            Terms of Service
          </a>
          <a href="/contact" className="text-sm hover:underline">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
