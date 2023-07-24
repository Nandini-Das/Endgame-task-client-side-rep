import React from 'react';

const Banner = () => {
  return (
    <div
      className="bg-cover bg-center h-96"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1462536943532-57a629f6cc60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=873&q=80')",
      }}
    >
      <div className="h-full flex flex-col justify-center items-center">
        <h1 className="text-4xl text-white font-bold mb-2">EduMinati</h1>
        <p className="text-white text-sm max-w-md text-center">
           Your Graduation Partner
        </p>
      </div>
    </div>
  );
};

export default Banner;
