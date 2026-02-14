import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed z-[999] w-full px-[5.922vw] py-5 font-[NeueMontreal] flex items-center justify-between backdrop-blur-2xl">
      
      {/* LOGO */}
      <div className="logo">
        <h1 className="text-[2.2vw] md:text-[1.4vw] font-semibold tracking-tight uppercase">
          PIXELS
        </h1>
      </div>

      {/* NAV LINKS */}
      <div className="links flex gap-[3vw]">
        {["Explore", "Collections", "Contribute", "About", "Contact"].map(
          (item, index) => (
            <a
              key={index}
              className={`text-[2.1vw] md:text-[1.3vw] font-light capitalize ${
                index === 4 && "ml-[10vw]"
              }`}
            >
              {item}
            </a>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;