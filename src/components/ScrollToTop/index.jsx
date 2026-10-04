import SvgIcon from "../../assets/arrow-up.svg";

import styled from "styled-components";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const Up = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5715;
  list-style: none;
  position: fixed;
  right: 100px;
  bottom: 80px;
  z-index: 10;
  width: 40px;
  height: 40px;
  cursor: pointer;
  @media screen and (max-width: 48em) {
    display: none;
  }
  img {
    width: 3rem;
    height: 3rem;
    border: 2px solid var(--white);
    border-radius: 50%;
    background-color: var(--white);
    transition: transform 0.3s;
    display: none;
    &:hover {
      transform: scale(1.2);
    }
    &:active {
      transform: scale(0.9);
    }
  }
`;

const ScrollToTop = () => {
  const ref = useRef(/** @type {HTMLImageElement | null} */ (null));
  gsap.registerPlugin(ScrollTrigger);

  const scrollUp = () => {
    const element = /** @type {HTMLElement} */ (document.getElementById("home"));
    element.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  useEffect(() => {
    const context = gsap.context(() => {
      const element = ref.current;
      gsap.to(element, {
        display: "block",
        scrollTrigger: {
          trigger: element,
          start: "top top",
          scrub: true,
        },
      });
    });

    return () => context.revert();
  }, []);

  return (
    <Up onClick={scrollUp}>
      <img ref={ref} src={SvgIcon} alt="to top" />
    </Up>
  );
};

export default ScrollToTop;
