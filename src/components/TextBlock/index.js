import React from "react";
import styled from "styled-components";

const Lb = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 50%;
  line-height: 1.5;
  color: var(--white);

  position: relative;

  @media only Screen and (max-width: 48em) {
    width: 100%;
    align-items: center;
    text-align: center;
  }
  /* z-index: 1; */
`;
const Topic = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--nav);
  color: var(--white);
  font-weight: 700;
  font-size: calc(0.4rem + 0.4vw);
  padding: 0.5rem 1rem;
  border-radius: 20px;

  @media only Screen and (max-width: 48em) {
    font-size: calc(0.4rem + 0.8vw);
  }
`;
const Circle = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: var(--purple);
  margin-right: 0.5rem;
`;

const Title = styled.div`
  font-size: calc(1rem + 1vw);
  line-height: 1.2;
  padding: 0.5rem 0;
  @media only Screen and (max-width: 48em) {
    font-size: calc(1rem + 1.5vw);
  }
`;

const SubText = styled.div`
  font-size: calc(0.5rem + 0.5vw);
  color: var(--nav2);
  @media only Screen and (max-width: 48em) {
    font-size: calc(0.5rem + 1vw);
  }
`;

const TextBlock = ({ topic, title, subText, children }) => {
  return (
    <Lb id="leftBlock">
      <Topic>
        <Circle />
        <span>{topic}</span>
      </Topic>
      <Title>{title}</Title>
      <SubText>{subText}</SubText>
      {children}
    </Lb>
  );
};

export default TextBlock;
