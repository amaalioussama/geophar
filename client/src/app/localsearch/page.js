import React from "react";
import Home from "../components/main";
import Navbar from "../components/navbar";

const Page = () => {
  return (
    <div className="flex bg-white h-full">
      
      <Navbar />
      
      
      <div className="flex-grow">
        <Home />
      </div>
    </div>
  );
};

export default Page;
