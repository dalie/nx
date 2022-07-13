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
        initial={{ transform: 'translateX(-110vw)' }}
        animate={{ transform: 'translateX(0px)' }}
        exit={{ transform: 'translateX(110vw)' }}
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
  z-index: 1000;
`;

const Container = styled(motion.div)`
  transform: translateX(-80vw);
  padding: 2rem 4rem;
  background-color: var(--dark);
  border-radius: 4rem 0;
  box-shadow: 1rem 1rem 3rem #000, -1rem 1rem 3rem #000;
`;
