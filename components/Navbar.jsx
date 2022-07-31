import Link from "next/link";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { lightThemeOn, lightThemeOff } from "store/slicers/themeSlice";
import { removeUser } from "store/slicers/userSlice";
import Image from "next/image";
import logoBlack from "public/logo-black.png";
import logoWhite from "public/logo-white.png";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { useState, useRef } from "react";
import { css } from "styled-components";
import gsap from "gsap";
import { useRouter } from "next/router";
import { signout } from "fetch/auth";
import nProgress from "nprogress";
import { useEffect } from "react";

const Navbar = () => {
  const light = useSelector((state) => state.theme.light);
  const user = useSelector((state) => state.user.currentUser);
  const menus = [
    { link: "Blogs", href: "/blogs" },
    { link: user ? "Profile" : "Signup", href: user ? "/profile" : "/signup" },
    {
      link: user?.role === 1 ? "Dashboard" : null,
      href: user?.role === 1 ? "/admin" : null,
    },
    { link: user ? "Logout" : "Signin", href: user ? null : "/signin" },
  ];
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const menuUl = gsap.utils.selector(menuRef);

  const router = useRouter();
  useEffect(() => {
    const proStart = (url) => nProgress.start();
    const proDone = (url) => nProgress.done();
    router.events.on("routeChangeStart", proStart);
    router.events.on("routeChangeComplete", proDone);
    return () => {
      router.events.off("routeChangeStart", proStart);
      router.events.off("routerChangeComplete", proDone);
    };
  }, []);

  const MenuOpenAnimate = () => {
    gsap.to(menuUl(".menu-link"), {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      delay: 1,
    });
  };
  const MenuCloseAnimate = () => {
    gsap.to(menuUl(".menu-link"), {
      y: "40",
      opacity: 0,
      clearProps: "all",
    });
  };

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      MenuOpenAnimate();
    } else {
      MenuCloseAnimate();
    }
  };

  const logOut = () => {
    signout(() => {
      dispatch(removeUser());
      router.push("/");
    });
  };

  return (
    <Menu menuOpen={menuOpen}>
      <Link href="/">
        <a>
          <Image
            src={light ? logoBlack : logoWhite}
            alt="Site Logo Image"
            priority="false"
          />
        </a>
      </Link>
      <ul ref={menuRef}>
        {menus.map((element, index) => {
          return element.link ? (
            <li
              className="menu-link"
              key={index}
              style={{
                "--delay":
                  index < 1 ? 800 + "ms" : 600 + (index + 1) * 200 + "ms",
              }}
            >
              {element.link === "Logout" ? (
                <a onClick={() => logOut()}>
                  <span className="top">
                    {element.link.split("").map((x, idx) => {
                      return (
                        <span
                          key={idx}
                          style={{
                            "--top-delay": idx * 20 + "ms",
                          }}
                        >
                          {x}
                        </span>
                      );
                    })}
                  </span>
                  <span className="bottom">
                    {element.link.split("").map((x, idx) => {
                      return (
                        <span
                          key={idx}
                          style={{ "--top-delay": idx * 20 + "ms" }}
                        >
                          {x}
                        </span>
                      );
                    })}
                  </span>
                </a>
              ) : (
                <Link href={element.href}>
                  <a>
                    <span className="top">
                      {element.link.split("").map((x, idx) => {
                        return (
                          <span
                            key={idx}
                            style={{
                              "--top-delay": idx * 20 + "ms",
                            }}
                          >
                            {x}
                          </span>
                        );
                      })}
                    </span>
                    <span className="bottom">
                      {element.link.split("").map((x, idx) => {
                        return (
                          <span
                            key={idx}
                            style={{ "--top-delay": idx * 20 + "ms" }}
                          >
                            {x}
                          </span>
                        );
                      })}
                    </span>
                  </a>
                </Link>
              )}
            </li>
          ) : null;
        })}
      </ul>
      <ThemeButton
        className="blog-btn"
        onClick={() => dispatch(light ? lightThemeOff() : lightThemeOn())}
        title={light ? "Dark Mode" : "Light Mode"}
      >
        {light ? <BsMoonFill /> : <BsSunFill />}
      </ThemeButton>
      <Toggle onClick={() => handleMenu()} menuOpen={menuOpen}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </Toggle>
    </Menu>
  );
};

export default Navbar;

const Menu = styled.header`
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media screen and (max-width: 540px) {
    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: var(--bg-color);
      z-index: 8;
      top: 0;
      left: 0;
      transition: 0.5s;
    }
  }
  img {
    max-height: 45px;
    z-index: 9;
  }
  ul {
    display: flex;
    li {
      margin: 0px 15px;
      color: var(--color);
      a {
        display: block;
        text-transform: uppercase;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        .top {
          span {
            position: relative;
            display: inline-block;
            transform: translateY(0);
            transition: transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
            transition-delay: var(--top-delay);
          }
        }
        .bottom {
          position: absolute;
          left: 0;
          span {
            display: inline-block;
            transform: translateY(20px);
            transition: transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
            transition-delay: var(--top-delay);
          }
        }
        &:hover .top span {
          transform: translateY(-20px);
        }
        &:hover .bottom span {
          transform: translateY(0);
        }
      }
    }
    @media screen and (max-width: 540px) {
      position: fixed;
      top: ${(props) => (props.menuOpen ? "0" : "-100vh")};
      right: 0px;
      flex-direction: column;
      align-items: center;
      height: 100vh;
      width: 100%;
      justify-content: center;
      background-color: var(--bg-color);
      z-index: 7;
      transition: background-color 0.5s, top 1s cubic-bezier(1, 0.39, 0, 0.79);
      li {
        margin: 20px;
        opacity: 0;
        transform: translateY(40px);
      }
    }
  }
`;

const ThemeButton = styled.button`
  padding: 5px 10px;
  border-radius: 0px;
  z-index: 9;
  border-radius: 5px;
`;
const Toggle = styled.div`
  display: none;
  margin-left: 30px;
  cursor: pointer;
  z-index: 9;
  @media screen and (max-width: 540px) {
    display: block;
  }
  div {
    height: 2px;
    width: 29px;
    background-color: var(--box-bg-color);
    transform-origin: right;
    transition: 0.5s;
  }

  .bar1 {
    transform: ${(props) =>
      props.menuOpen ? "rotate(-45deg)" : "rotate(0deg)"};
  }
  .bar3 {
    transform: ${(props) =>
      props.menuOpen ? "rotate(45deg)" : "rotate(0deg)"};
  }
  .bar2 {
    ${(props) =>
      props.menuOpen
        ? css`
            transform: translateX(-29px);
            opacity: 0;
          `
        : css`
            transform: translateX(0px);
            opacity: 1;
          `}
  }

  .bar2 {
    margin: 8px 0px;
  }
`;
