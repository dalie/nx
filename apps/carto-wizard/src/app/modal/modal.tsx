import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { ANIMATION_DELAY } from '../contants';
import { modalIn, modalOut } from './modal.animations';

/* eslint-disable-next-line */
export interface ModalProps extends PropsWithChildren {
  className?: string;
}

export function Modal(props: ModalProps) {
  console.log(props.className);
  return (
    <Backdrop
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container>{props.children}</Container>
    </Backdrop>
  );
}

export default Modal;

const Backdrop = styled(motion.div)`
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
  padding: 2rem 4rem;
  background-color: #444444;
  border-radius: 4rem 0;
  box-shadow: 1rem 1rem 3rem #000, -1rem 1rem 3rem #000;
  transform: translateX(-110vw);
  animation: ${modalIn} ${ANIMATION_DELAY}ms forwards;

  &.exiting {
    animation: ${modalOut} ${ANIMATION_DELAY}ms forwards;
  }
`;
