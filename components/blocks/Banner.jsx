import styled from "styled-components";
import gsap from "gsap";
import { useEffect, useRef } from "react";
const Banner = () => {
  const textRef = useRef();
  const imgRef = useRef();
  const q = gsap.utils.selector(textRef);
  useEffect(() => {
    gsap.to(q(".banner-text"), {
      y: 0,
      opacity: 1,
      stagger: 0.33,
    });
    gsap.to(imgRef.current, {
      scale: 1.5,
      duration: 1,
    });
  });
  return (
    <Ban ref={textRef}>
      <img
        src="https://i.ibb.co/2SmhJ6R/pexels-negative-space-169573.jpg"
        alt="Banner Img"
        ref={imgRef}
      />
      <h2 className="banner-text">Blog Site Project</h2>
      <p className="banner-text">
        Node, Express, MongoDB, Next, Bootstrap, GSAP
      </p>
    </Ban>
  );
};

export default Banner;

const Ban = styled.section`
  height: 400px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: right;
    z-index: -1;
    transform: scale(1);
  }
  h2 {
    color: white;
    font-size: 40px;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 4px;
  }
  p {
    color: white;
    font-size: 24px;
  }
  .banner-text {
    opacity: 0;
    transform: translateY(40px);
  }
`;
