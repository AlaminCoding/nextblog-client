import styled from "styled-components";
import { useRef } from "react";
import gsap from "gsap";
const GsapTest = () => {
  const boxRef = useRef();
  const q = gsap.utils.selector(boxRef);
  const animate = () => {
    gsap.to(q(".box"), {
      x: "300",
      stagger: 0.33,
      repeat: -1,
      repeatDelay: -1,
      yoyo: true,
    });
  };
  return (
    <>
      <div ref={boxRef}>
        <Box className="box"></Box>
        <Box className="box"></Box>
      </div>

      <button onClick={() => setTest()}>Click</button>
    </>
  );
};

export default GsapTest;

const Box = styled.div`
  height: 100px;
  width: 100px;
  background-color: crimson;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
