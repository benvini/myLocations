import styled from "styled-components";

import Typography from "./Typography";
import COLOR from "../../styles/Color";

const StyledButton = styled.button`
  font-weight: bold;
  background-color: ${COLOR.PRIMARY};
  padding: 10px;
  border-radius: 4px;
  height: 48px;
  cursor: pointer;
  color: white;
`;

type Props = {
  onClick: () => void;
  disabled?: boolean;
  title: string;
  className?: any;
};

export const MainButton = ({
  onClick,
  disabled = false,
  title,
  className,
}: Props) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      className={className ? className : undefined}
    >
      <Typography>{title}</Typography>
    </StyledButton>
  );
};
