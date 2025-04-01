import React, { useEffect, useState, useRef } from "react";
import "../styles/Home.css";
import ValuePartnership from "../components/ValuePartnership";
import AdditionalBenefits from "../components/AdditionalBenefits";

const Counter = ({ startValue, endValue, trigger }) => {
  const [count, setCount] = useState(startValue);

  useEffect(() => {
    if (!trigger) return;

    let current = startValue;
    const duration = 500; 
    const increment = (endValue - startValue) / (duration / 20);

    const timer = setInterval(() => {
      current += increment;
      if (current >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [trigger, startValue, endValue]);

  return <h3>{`${startValue}-${count}%`}</h3>;
};

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  const [counterKey1, setCounterKey1] = useState(Date.now());
  const [counterKey2, setCounterKey2] = useState(Date.now());
  const [counterKey3, setCounterKey3] = useState(Date.now());

  useEffect(() => {
    const container = containerRef.current; // Store the ref value
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(false); // Reset first
          setTimeout(() => setIsVisible(true), 100); // Restart animation smoothly
        }
      },
      { threshold: 0.5 }
    );
  
    if (container) observer.observe(container);
  
    return () => {
      if (container) observer.unobserve(container); // Cleanup uses the stored ref
    };
  }, []);
  

  return (
    <>
    <div className="home-container" ref={containerRef}>
      <h1 className="main-heading">
        Stop{" "}
        <span className={`falling-word ${isVisible ? "animate-fall" : ""}`}>
          leaks
        </span>
        , boost profits
      </h1>

      <p className="sub-heading">
        Uncover lost revenue with Genpact's value-driven deduction management solution
      </p>

      <h2 className="benchmarks">Industry Recovery Benchmarks</h2>

      <div className="boxes">
        <div className="box" onMouseEnter={() => setCounterKey1(Date.now())}>
          <Counter key={counterKey1} startValue={8} endValue={10} trigger={isVisible} />
          <p>Deduction against overall revenue.</p>
        </div>

        <div className="box blue" onMouseEnter={() => setCounterKey2(Date.now())}>
          <Counter key={counterKey2} startValue={10} endValue={15} trigger={isVisible} />
          <p>of over total deduction invalid.</p>
        </div>

        <div className="box" onMouseEnter={() => setCounterKey3(Date.now())}>
          <Counter key={counterKey3} startValue={50} endValue={70} trigger={isVisible} />
          <p>of invalid deductions recovery by operations</p>
        </div>
      </div>

      {/* Hexagon Button Animation */}
      <div className="button-container">
        <div
          className="hex-border"
          style={{
            width: isVisible ? "350px" : "700px",
            transition: "width 1.5s ease-in-out",
          }}
        >
          Bridging the revenue gap together
        </div>
      </div>
  
    </div>
    <ValuePartnership/>
    <AdditionalBenefits/>
    </>
  );
};

export default Home;
