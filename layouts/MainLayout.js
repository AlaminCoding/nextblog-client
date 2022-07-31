import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle, lightTheme, darkTheme } from "styles/GlobalStyles";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import scrollSmooth from "utils/scrollSmooth";
import { Container } from "react-bootstrap";
import Navbar from "components/Navbar";
import Router from "next/router";
const MainLayout = ({ children }) => {
  const light = useSelector((state) => state.theme.light);
  const user = useSelector((state) => state.user.currentUser);
  const scrollRef = useRef();
  useEffect(() => {
    scrollSmooth(scrollRef, { speed: 0.07 });
  });
  const protectedRoutes = ["/profile", "/admin"];
  useEffect(() => {
    if (protectedRoutes.includes(Router.pathname)) {
      if (!user) {
        Router.push(`/signin?redirect=${Router.pathname}`);
      }
    }
  }, []);
  return (
    <ThemeProvider theme={light ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Wrapper>
        <Main className="scrollable" ref={scrollRef}>
          <Container>
            <Navbar />
            {children}
          </Container>
        </Main>
      </Wrapper>
    </ThemeProvider>
  );
};

export default MainLayout;

const Wrapper = styled.section`
  position: fixed;
  height: 100%;
  width: 100%;
`;

const Main = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  will-change: transform;
`;
