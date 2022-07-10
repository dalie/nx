import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ModalProps extends PropsWithChildren {
  className?: string;
}

export function Modal(props: ModalProps) {
  return (
    <Backdrop
      initial={{ backdropFilter: 'blur(0px)' }}
      animate={{ backdropFilter: 'blur(10px)' }}
      exit={{ backdropFilter: 'blur(0px)' }}
    >
      <Container
        initial={{ transform: 'translateX(-50vw) skewX(30deg) scaleX(1.3)' }}
        animate={{ transform: 'translateX(0px) skewX(0deg) scaleX(1)' }}
        exit={{ transform: 'translateX(100vw) skewX(30deg) scaleX(1.3)' }}
      >
        {props.children}
      </Container>
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
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled(motion.div)`
  transform: translateX(-80vw);
  padding: 2rem 4rem;
  background-color: #444444;
  border-radius: 4rem 0;
  box-shadow: 1rem 1rem 3rem #000, -1rem 1rem 3rem #000;
`;
