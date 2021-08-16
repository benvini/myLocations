import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  className?: any;
};

const StyledText = styled.label`
  font-size: 20px;
`;

const Typography = ({ children, className }: Props) => {
  return (
    <StyledText className={className ? className : undefined}>
      {children}
    </StyledText>
  );
};

export default Typography;
