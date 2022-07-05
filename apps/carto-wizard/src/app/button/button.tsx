import { PropsWithChildren } from 'react';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ButtonProps extends PropsWithChildren {
  onClick: () => void;
}

export function Button(props: ButtonProps) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
}

export default Button;

const StyledButton = styled.button`
  border: none;
  border-radius: 2px;
  padding: 12px 18px;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
  color: white;
  background-color: #2196f3;
  box-shadow: 0 0 4px #999;
  outline: none;

  background-position: center;
  transition: background 0.8s;

  &:hover {
    background: #47a7f5 radial-gradient(circle, transparent 1%, #47a7f5 1%)
      center/15000%;
  }

  &:active {
    background-color: #6eb9f7;
    background-size: 100%;
    transition: background 0s;
  }
`;
