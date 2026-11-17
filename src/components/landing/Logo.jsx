"use client";
import React from "react";

const LogoMark = ({ size = 34, className = "" }) => (
  <div
    style={{ width: size, height: size }}
    className={`relative flex justify-center items-center shrink-0 ${className}`}
  >
    <img
      src="/suryanexa-logo.png"
      alt="SuryaNexa Logo"
      className="drop-shadow-sm w-full h-full object-contain"
    />
  </div>
);

export default LogoMark;
