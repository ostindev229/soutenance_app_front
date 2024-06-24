import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const ScrollingTextWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ScrollingText = styled(motion.div)`
  font-size: 2em;
  color: red;
  font-weight: bold;
  white-space: nowrap;
`;

const scrollingTextVariants = {
  animate: {
    x: ["100%", "-100%", "100%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 20,
        ease: "linear",
      },
    },
  },
};

const ScrollingMessage = ({ text }) => {
  return (
    <ScrollingTextWrapper>
      <ScrollingText variants={scrollingTextVariants} animate="animate">
        {text}
      </ScrollingText>
    </ScrollingTextWrapper>
  );
};

export default ScrollingMessage;
