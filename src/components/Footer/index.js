import styled from "styled-components";
import Twitter from "../../assets/twitter-square-brands.svg";
import Instagram from "../../assets/instagram-square-brands.svg";
import Gmail from "../../assets/envelope-open-solid.svg";

const FOOTER = styled.footer`
  padding: 1.2rem calc(2.5rem + 2.5vw);
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only Screen and (max-width: 48em) {
    flex-direction: column;
    align-items: center;
    div {
      &:first-child {
        margin-bottom: 1rem;
      }
    }
  }
`;

const RightText = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 1rem;
    filter: invert(100%);
    transition: all 0.2s ease-in-out;
  }
  a {
    &:hover {
      img {
        transform: scale(1.5);
        filter: invert(50%) sepia(100%) saturate(500%) hue-rotate(216deg)
          brightness(100%) contrast(97%);
      }
    }
  }
`;
const LeftText = styled.div`
  text-align: left;
`;
const Footer = () => {
  return (
    <FOOTER>
      <LeftText>
        © 2021 Built and Design by{" "}
        <a href="https://www.youtube.com/channel/UCeYt6blRBKuNrEg_-282fSA">
          @CodeBucks
        </a>
      </LeftText>
      <RightText>
        Reach out to me via 😉
        <a href="https://twitter.com/code_bucks">
          <img src={Twitter} alt="Twitter" />
        </a>
        &nbsp;
        <a href="https://www.instagram.com/code.bucks/">
          <img src={Instagram} alt="Instagram" />
        </a>
        &nbsp;
        <a href="mailto:codebucks27@gmail.com?subject=Email From Your Website">
          <img src={Gmail} alt="Gmail" />
        </a>
      </RightText>
    </FOOTER>
  );
};

export default Footer;

//© 2021 by CodeBucks. Design by @CodeBucks.
