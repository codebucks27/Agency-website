import styled from "styled-components";
import design from "../../assets/Design.svg";
import develope from "../../assets/Develope.svg";
import support from "../../assets/Support.svg";

const serviceImages = {
  "Design.svg": design,
  "Develope.svg": develope,
  "Support.svg": support,
};

const Rb = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  position: relative;
  /* z-index: 10; */
  svg {
    width: 100%;
    height: auto;
  }
  @media only Screen and (max-width: 48em) {
    display: none;
  }
`;

/** @param {{ svg: keyof typeof serviceImages }} props */
const SvgBlock = ({ svg }) => {
  const SvgIcon = serviceImages[svg];
  //console.log(SvgIcon);
  return (
    <Rb id="svgBlock">
      <img src={SvgIcon} alt="Services" />
    </Rb>
  );
};

export default SvgBlock;
