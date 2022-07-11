import { motion } from 'framer-motion';
import styled from 'styled-components';
import Brand from '../brand/brand';

/* eslint-disable-next-line */
export interface ToolbarProps {}

export function Toolbar(props: ToolbarProps) {
  return (
    <Container
      initial={{ transform: 'trnaslateY(-4rem)' }}
      animate={{ transform: 'translateY(0rem)' }}
      exit={{ transform: 'translateY(-4rem)' }}
    >
      <Brand />
    </Container>
  );
}

export default Toolbar;

const Container = styled(motion.div)`
  display: flex;
  padding: 0 1rem;
  gap: 1rem;
  height: 3rem;
  background-color: var(--dark);
  box-shadow: 1rem 1rem 3rem #000, -1rem 1rem 3rem #000;
`;
