'use client'
import { useState } from "react";
import Image from "next/image";

const images = [
    'https://images.unsplash.com/photo-1520351226444-704a7c100d8f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1539298781177-895e382e795c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1522071500372-f0fd8c452178?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

export default function Slider() {
  const [current, setCurrent] = useState(0);

  // Add manual navigation functions
  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div style={{ width: "100%", height: "65vh", position: "relative", overflow: "hidden" }}>
      <Image
        src={images[current]}
        alt={`Slide ${current + 1}`}
        layout="fill"
        objectFit="cover"
      />
      {/* Left & Right navigation buttons */}
      <button onClick={handlePrev} style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.5)',
          color: '#fff',
          border: 'none',
          padding: '10px',
          cursor: 'pointer'
      }}>❮</button>
      <button onClick={handleNext} style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.5)',
          color: '#fff',
          border: 'none',
          padding: '10px',
          cursor: 'pointer'
      }}>❯</button>
    </div>
  );
}
