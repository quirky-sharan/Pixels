import React, { useEffect, useRef } from "react";

const Eyes = () => {
  const leftEye = useRef(null);
  const rightEye = useRef(null);
  const requestRef = useRef(null);

  const leftLid = useRef(null);
  const rightLid = useRef(null);

  const chakraRef = useRef(null);
  const bgLayer1 = useRef(null);
  const bgLayer2 = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  // ---------------- MOUSE + GYRO ----------------
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = {
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
      };
    };

    const handleGyro = (e) => {
      mouse.current = {
        x: e.gamma * 12,
        y: e.beta * 12,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("deviceorientation", handleGyro);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleGyro);
    };
  }, []);

  // ---------------- EYE TRACK ----------------
  useEffect(() => {
    const animate = () => {
      current.current.x += (mouse.current.x - current.current.x) * 0.08;
      current.current.y += (mouse.current.y - current.current.y) * 0.08;

      const angle =
        Math.atan2(current.current.y, current.current.x) * (180 / Math.PI);

      const moveX = current.current.x * 0.03;
      const moveY = current.current.y * 0.03;

      const transform = `translate(${moveX}px, ${moveY}px)`;
      const rotate = `translate(-50%, -50%) rotate(${angle - 180}deg)`;

      if (leftEye.current && rightEye.current) {
        leftEye.current.style.transform = transform;
        rightEye.current.style.transform = transform;

        leftEye.current.firstChild.style.transform = rotate;
        rightEye.current.firstChild.style.transform = rotate;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // ---------------- BLINK ----------------
  useEffect(() => {
    const blink = (lid) => {
      lid.current.style.transform = "scaleY(1)";
      setTimeout(() => (lid.current.style.transform = "scaleY(0)"), 180);
    };

    const loop = () => {
      blink(leftLid);
      blink(rightLid);
      setTimeout(loop, 3000 + Math.random() * 4000);
    };

    loop();
  }, []);

  // ---------------- CHAKRA ROTATION ----------------
  useEffect(() => {
    let angle = 0;
    const rotate = () => {
      angle += 0.05;
      if (chakraRef.current) {
        chakraRef.current.style.transform = `translate(-50%,-50%) rotate(${angle}deg)`;
      }
      requestAnimationFrame(rotate);
    };
    rotate();
  }, []);

  // ---------------- SCROLL PARALLAX ----------------
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;

      if (bgLayer1.current)
        bgLayer1.current.style.transform = `translateY(${offset * 0.15}px)`;

      if (bgLayer2.current)
        bgLayer2.current.style.transform = `translateY(${offset * 0.3}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden relative bg-[#1a120b]">

      {/* PARALLAX CULTURAL BG */}
      <div
        ref={bgLayer1}
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-20"
      />

      <div
        ref={bgLayer2}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ff9933,transparent_60%)] opacity-30"
      />

      {/* ASHOKA CHAKRA */}
      <img
        ref={chakraRef}
        src="https://upload.wikimedia.org/wikipedia/commons/1/17/Ashoka_Chakra.svg"
        className="absolute top-1/2 left-1/2 w-[38vw] opacity-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        alt=""
      />

      {/* EYES */}
      <div className="absolute flex gap-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

        {[leftEye, rightEye].map((eye, i) => (
          <div
            key={i}
            className="group relative w-[14vw] h-[14vw] bg-zinc-100 rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-[0_0_60px_rgba(255,153,51,0.6)]"
          >
            <div
              ref={i === 0 ? leftLid : rightLid}
              className="absolute inset-0 bg-zinc-100 origin-center scale-y-0 z-20 transition-transform duration-200"
            />

            <div
              ref={eye}
              className="relative w-[9vw] h-[9vw] rounded-full bg-zinc-900"
            >
              <div className="absolute top-1/2 left-1/2 w-full px-[2px]">
                <div className="w-[1.7vw] h-[1.7vw] rounded-full bg-zinc-100" />
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Eyes;