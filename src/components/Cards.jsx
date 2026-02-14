import React from "react";

const Cards = () => {
  return (
    <div data-scroll data-scroll-section data-scroll-speed="-.7" className=" h-screen w-full flex flex-col md:flex-row gap-5 items-center px-[3.922vw] relative ">
      
      <div className="cardcontainer w-full md:w-1/2 h-[55vh]">
        <div className="card relative h-full w-full bg-[#004d43] rounded-xl flex items-center justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt=""
            className="w-36"
          />
          <button className="absolute left-8 bottom-6 border border-[#cdea68] px-2 py-1 rounded-full text-xs text-[#cdea68]">
            PRESERVING HERITAGE SINCE 2026
          </button>
        </div>
      </div>

      <div className="cardcontainer w-full md:w-1/2 h-[55vh] flex gap-5 ">
        
        <div className="card relative w-1/2 h-full bg-[#212121] rounded-xl flex items-center justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2991/2991108.png"
            alt=""
            className="w-36"
          />
          <button className="absolute left-8 bottom-6 border px-2 py-1 rounded-full text-xs ">
            1000+ STORIES ARCHIVED
          </button>
        </div>

        <div className="card relative w-1/2 h-full bg-[#212121] rounded-xl flex items-center justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
            alt=""
            className="w-36"
          />
          <button className="absolute left-8 bottom-6 border px-2 py-1 rounded-full text-xs ">
            GLOBAL COMMUNITY CONTRIBUTORS
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cards;