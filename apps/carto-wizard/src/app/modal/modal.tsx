import { PropsWithChildren } from 'react';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ModalProps extends PropsWithChildren {}

export function Modal(props: ModalProps) {
  return (
    <Backdrop>
      <Container>{props.children}</Container>
    </Backdrop>
  );
}

export default Modal;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  padding: 2rem;
  background-color: #444444;
  border-radius: 4rem 0;
  box-shadow: 1rem 1rem 3rem #000, -1rem 1rem 3rem #000;
`;
